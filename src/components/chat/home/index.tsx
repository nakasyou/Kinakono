import { A } from '@solidjs/router'
import { Navbar } from '../../navbar'
import { matrixData } from '../../../store/matrix'
import { For, Match, Switch, createEffect, createSignal } from 'solid-js'

export function ChatHome () {
  ;(async () => {
    if (matrixData.matrixWrapper.solidStore.isLogined) {
      await matrixData.matrixWrapper.init()
      matrixData.matrixWrapper.matrixClient?.store.getRooms()
    }
  })()
  const [key, setKey] = createSignal<[any]>([{}])
  createEffect(() => {
    console.log('r',matrixData.matrixWrapper.solidData.rooms())
    setKey([Math.random()])
  })
  return <>
    {
      !matrixData.matrixWrapper.solidStore.isLogined ? <div>
        <div class="mx-4">
          <div class="text-center text-2xl">Kinakono Chat</div>
          
          <div class="text-center">
            <div>ようこそ！Matrixを利用したチャットです！</div>
            <div>
              使用するには、
              <A href='/settings/accounts/matrix' class="underline hover:no-underline">Matrixアカウント</A>でログインしてください
            </div>
          </div>
        </div>
      </div> : <div>
        <div>Kinakono Chat</div>
        <div>
          <For each={key()}>{() =>
            <For each={matrixData.matrixWrapper.solidData.rooms()}>{(room, index) => {
              const roomImageUrl = room.getAvatarUrl('https://matrix.org', 256, 256 , 'scale')
              
              const lastEvent = room.getLiveTimeline().getEvents().at(-1)!
              const lastMessage = lastEvent.getContent()
              
              return <A href={`/chat/room/${room.roomId}`}>
                <div>
                  <div class="rounded-lg my-5 border">
                    <div class="flex items-center">
                      <div class="w-8 h-8 shrink-0">
                        {
                          roomImageUrl ? 
                            <img src={room.getAvatarUrl('https://matrix.org', 256, 256 , 'scale')!}
                              alt="Room Image"
                              class="w-full h-full bg-cover rounded-full border" /> : <span>🏠</span> 
                        }
                      </div>
                      <div class="">
                        <div class="text-xl">
                          { room.name } { index() }
                        </div>
                        <div>
                          <Switch>
                            <Match when={lastMessage.membership === 'join'}>
                              { lastEvent.sender?.name }
                              が
                              ルームに参加しました
                            </Match>
                            <Match when={lastMessage.msgtype === 'm.text'}>
                              {
                                lastEvent.sender?.name
                              }: 
                              {
                                lastMessage.body?.replace(/^> <.+> [\s\S]+\n\n/, 'リプライ: ')
                              }
                            </Match>
                          </Switch>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </A>
            }}</For>
          }</For>
        </div>
      </div>
    }
    <Navbar now={'chat'} />
  </>
}
