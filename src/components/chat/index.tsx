import { A } from '@solidjs/router'
import { Navbar } from '../navbar'

export function Chat () {
  return <>
    <div class="mx-4">
      <div class="text-center text-2xl">Kinakono Chat</div>
      <div>
        <div>ようこそ！Matrixを利用したチャットです！</div>
        <div>
          使用するには、
          <A href='/settings/accounts/matrix'>Matrixアカウント</A>でログインしてください
        </div>
      </div>
    </div>
    <Navbar now={'chat'} />
  </>
}
