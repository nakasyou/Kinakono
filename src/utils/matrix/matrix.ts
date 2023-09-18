import * as sdk from 'matrix-js-sdk'
import constData from './const'
import { createSignal, type Accessor, type Setter } from 'solid-js'
import { createStore } from 'solid-js/store'

export class LoginFailedError extends Error {}

interface Events {
  matrixStart: Record<string, (({}) => any)>
  matrixSync: Record<string, (({}) => any)>
}
export class MatrixWrapper {
  solidStore
  setSolidStore
  solidData: {
    rooms: Accessor<sdk.Room[]>
  }
  setSolidData: {
    setRooms: Setter<sdk.Room[]>
  }
  events: Events
  matrixClient?: sdk.MatrixClient
  constructor () {
    const [solidStore, setSolidStore] = createStore<{
      isLogined: boolean
    }>({
      isLogined: false,
    })
    this.solidStore = solidStore
    this.setSolidStore = setSolidStore

    this.setSolidStore('isLogined', this.getSecret() ? true : false)

    const [rooms, setRooms] = createSignal<sdk.Room[]>([])

    this.solidData = {
      rooms,
    }
    this.setSolidData = {
      setRooms,
    }

    this.events = {
      matrixStart: {},
      matrixSync: {}
    }
  }
  async syncSolidStore () {
    if (!this.matrixClient) {
      return
    }
    this.setSolidData.setRooms(this.matrixClient.store.getRooms())
  }
  /**
   * 初回ログイン時に使う。
   */
  async login (init: {
    homeserver: string
    username: string
    password: string
  }) {
    const logined = await fetch(`https://${init.homeserver}/_matrix/client/r0/login`, {
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        type: "m.login.password",
        user: init.username,
        password: init.password
      }),
      method: 'POST'
    })
    if (logined.status !== 200) {
      throw new LoginFailedError('Login Failed')
    }
    const loginedData: {
      user_id: string
      access_token: string
      home_server: string
      device_id: string
    } = await logined.json()

    localStorage.setItem(constData.storageKey.matrix.userId, loginedData.user_id)
    localStorage.setItem(constData.storageKey.matrix.accessToken, loginedData.access_token)
    localStorage.setItem(constData.storageKey.matrix.homeServer, loginedData.home_server)
    localStorage.setItem(constData.storageKey.matrix.deviceId, loginedData.device_id)

    this.setSolidStore('isLogined', true)
  }
  /**
   * ログインに必要な情報を返す
   * @returns ログインに必要な情報
   */
  getSecret () {
    const userId = localStorage.getItem(constData.storageKey.matrix.userId)
    const accessToken = localStorage.getItem(constData.storageKey.matrix.accessToken)
    const homeServer = localStorage.getItem(constData.storageKey.matrix.homeServer)
    const deviceId = localStorage.getItem(constData.storageKey.matrix.deviceId)
    if (!(userId && accessToken && homeServer && deviceId)) {
      return false
    }
    return {
      userId,
      accessToken,
      homeServer,
      deviceId,
    }
  }
  /**
   * クライアントを開始する
   * @returns 
   */
  async init () {
    const secret = this.getSecret()
    if (!secret) {
      return
    }
    const indexedDBStore = new sdk.IndexedDBStore({
      indexedDB: window.indexedDB,
      localStorage: window.localStorage,
      dbName: 'web-sync-store',
    })
    await indexedDBStore.startup()

    this.matrixClient = sdk.createClient({
      baseUrl: `https://${secret.homeServer}`,
      accessToken: secret.accessToken,
      userId: secret.userId,
      deviceId: secret.deviceId,
      store: indexedDBStore,
      cryptoStore: new sdk.IndexedDBCryptoStore(window.indexedDB, 'crypto-store'),
      timelineSupport: true,
    })
    await this.matrixClient.initCrypto()

    await this.matrixClient.startClient({ initialSyncLimit: 10 })

    this.setSolidStore('isLogined', this.getSecret() ? true : false)
    
    this.matrixClient!.on('sync', async (state, prevState, data) => {
      await this.syncSolidStore()
      this.dispatchEvent('matrixSync', {})
      //console.log('Sync Data...', state, prevState, data)
    })

    await this.dispatchEvent('matrixStart', {})
  }
  /**
   * イベントを登録する
   */
  on <T extends keyof Events> (name: T, func: Events[T][string], id: string) {
    // @ts-ignore
    this.events[name][id] = func
  }
  /**
   * イベントを発火する
   */
  async dispatchEvent <T extends keyof Events> (name: T, data: Parameters<Events[T][string]>[0]) {
    await Promise.all(Object.values(this.events[name]).map(listener => (async () => await listener(data))()))
  }
  /**
   * イベントを削除する
   */
  removeEventListener (name: keyof Events, id: string) {
    delete this.events[name][id]
  }
}
