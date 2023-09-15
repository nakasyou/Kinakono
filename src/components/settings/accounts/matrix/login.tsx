import { createSignal } from "solid-js"
import * as sdk from 'matrix-js-sdk'
import { setMatrixData } from "../../../../store/matrix"

export const LoginMatrix = () => {
  const [homeserver, setHomeServer] = createSignal('matrix.org')
  const [homeserverEditMode, setHomeserverEditMode] = createSignal(false)

  const [isLogining, setIsLogining] = createSignal(false)

  const [username, setUsername] = createSignal('')
  const [password, setPassword] = createSignal('')

  const [loginError, setLoginError] = createSignal(false)
  let newHomeServer: any
  return <div>
    <div class="text-2xl text-center">Matrixアカウントでログイン</div>
    <div class="text-center">Matrixアカウントでログインすると、Matrix Chatが使えるようになります!</div>
    <div>
      <div class="border flex justify-center mx-10 p-2 rounded-md my-2">
        {
          homeserverEditMode() ? (
            <div>
              <input ref={newHomeServer} value={homeserver()} 
                class="border border-green-500"/>
              <button class="bg-green-500 hover:bg-green-300 text-white p-2 rounded-full" onClick={() => {
                setHomeServer(newHomeServer.value)
                setHomeserverEditMode(false)
              }}>完了!</button>
            </div>
            ) : (
            <div>
              <div>
                ホームサーバー: { homeserver() }
              </div>
              <button
                onClick={() => setHomeserverEditMode(true)}
                disabled={isLogining()}
                class="disabled:bg-gray-300 bg-green-500 hover:bg-green-300 text-white p-2 rounded-full">ホームサーバーを変更</button>
            </div>
          )
        }
      </div>
      <div class="border flex justify-center p-2 mx-10 my-2">
        <div>
          <div class="my-2">
            <label>ユーザー名</label>
            <input class="disabled:bg-gray-300 rounded-md p-1 border focus:border-green-500 border-green-300 mx-2" type="name" disabled={isLogining()} value={username()} onInput={evt => setUsername(evt.target.value)} />
          </div>
          <div class="my-2">
            <label>パスワード</label>
            <input class="disabled:bg-gray-300 rounded-md p-1 border focus:border-green-500 border-green-300 mx-2" type="name" disabled={isLogining()} value={password()} onInput={evt => setPassword(evt.target.value)} />
          </div>
        </div>
      </div>
      <div class="text-center">
        <button onClick={async () => {
          setLoginError(false)
          setIsLogining(true)
          const logined = await fetch(`https://${homeserver()}/_matrix/client/r0/login`, {
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              type: "m.login.password",
              user: username(),
              password: password()
            }),
            method: 'POST'
          })
          if (logined.status !== 200) {
            setIsLogining(false)
            setLoginError(true)
          }
          const loginedData = await logined.json()
          const client = sdk.createClient({
            baseUrl: `https://${homeserver()}`,
            accessToken: loginedData.access_token,
            userId: loginedData.user_id
          })
          await client.startClient({ initialSyncLimit: 10 })

          setMatrixData('client', client)
          
        }}
        disabled={isLogining()}
        class="disabled:bg-gray-300 bg-green-500 hover:bg-green-300 text-white p-2 rounded-full">
          {isLogining() ? 'ログイン中...' : 'Login!'}
          </button>
      </div>
      <div>
        { loginError() && <div class="text-center">
            ユーザー名、ホームサーバー名又はパスワードが違っています。
          </div>}
      </div>
    </div>
  </div>
}