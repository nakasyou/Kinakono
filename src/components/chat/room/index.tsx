import { useParams } from "@solidjs/router";
import { matrixData } from "../../../store/matrix";
import { createSignal, For, Index, Accessor } from "solid-js";
import type { Room, MatrixEvent, IContent, RoomMember } from "matrix-js-sdk";

interface MatrixEventWrapper {
  content: IContent
  sender: RoomMember
  profileInfo: Accessor<{
    avatar_url?: string | undefined;
    displayname?: string | undefined;
  }>
}
export function ChatRoom() {
  (async () => {
    if (matrixData.matrixWrapper.solidStore.isLogined) {
      await matrixData.matrixWrapper.init();
      matrixData.matrixWrapper.matrixClient?.store.getRooms();
      window.matrixWrapper = matrixData.matrixWrapper;
    }
  })();

  const params = useParams();

  const [roomData, setRoomData] = createSignal<Room | undefined>();
  const [events, setEvents] = createSignal<MatrixEventWrapper[]>([])

  const [profiles, setProfiles] = createSignal<
    Record<string, {
      avatar_url?: string | undefined;
      displayname?: string | undefined;
    } | undefined>
  >({})
  matrixData.matrixWrapper.on("matrixSync", () => {
    const room = matrixData.matrixWrapper.matrixClient!.getRoom(params.room);

    if (!room) {
      return;
    }
    setRoomData(room);
    setEvents(room.getLiveTimeline().getEvents().map((event) => {
      const [profileInfo, setProfileInfo] = createSignal<{
        avatar_url?: string | undefined
        displayname?: string | undefined
      }>(profiles()[event.sender?.userId!] || {})
      
      if (!profiles()[event.sender?.userId!]) {
        matrixData.matrixWrapper.matrixClient?.getProfileInfo(event.sender?.userId!).then((data) => {
          const newProfiles = profiles()
          newProfiles[event.sender?.userId!] = data
          setProfiles(newProfiles)
          setProfileInfo(data)
        })
      }

      return {
        content: event.getContent(),
        sender: event.sender!,
        profileInfo: profileInfo
      }
    }))
    
    console.log('sync-evt')
  }, "chatroom")

  setInterval(() => {
    window.scrollTo({
      top: 1000000,
    });
  });
  const [inputText, setInputText] = createSignal('')

  const sendText = async (text: string) => {
    matrixData.matrixWrapper.matrixClient?.sendEvent(params.room, "m.room.message", {
      body: text,
      msgtype: "m.text",
    }, "", (err, res) => {
      console.log(err);
    });
  }
  return (
    <div>
      {params.room}
      <For each={events()}>
        {(evt) => {
          console.log('sync-cmp')
          const [senderAvater, setSenderAvater] = createSignal('')
          matrixData.matrixWrapper.matrixClient?.getProfileInfo(evt.sender?.userId!).then((data) => {
            setSenderAvater(matrixData.matrixWrapper.matrixClient?.mxcUrlToHttp(data.avatar_url!)!)
          })
          return (
            <div class="border p-2 my-2">
              <div class="flex">
                <img src={matrixData.matrixWrapper.matrixClient?.mxcUrlToHttp(evt.profileInfo().avatar_url || '') || ''} class="w-8 h-8 border rounded-full shrink-0" />
                <div class="font-bold text-xl">{evt.sender.name
                }</div>
              </div>
              <div>
                {evt.content.body}
              </div>
            </div>
          )
        }}
      </For>
      <div>
        <input placeholder="送信したいことは??" value={inputText()} onInput={e => setInputText(e.target.value)}/>
        <button onClick={() => sendText(inputText())} >a</button>
      </div>
    </div>
  );
}
