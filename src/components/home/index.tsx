import { A } from '@solidjs/router'
import { Navbar } from '../navbar'

export function Home () {
  return <>
    <div class="mx-4">
      <div class="text-center text-2xl">Kinakono</div>
      <div>
        <div>ようこそ！kinakonoへ！これはホームです。</div>
        <div>
          kinakonoについて知りたい？
          <A href='/about' class="mx-1 underline hover:no-underline">About</A>
          で詳細を手に入れよう！
        </div>
      </div>
    </div>
    <Navbar />
  </>
}
