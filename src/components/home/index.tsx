import { A } from '@solidjs/router'

export function Home () {
  return <>
    <div class="mx-4">
      <div class="text-center text-2xl">Kinakono</div>
      <div>
        <div>ようこそ！kinakonoへ！これはホームです。</div>
        <div>
          kinakonoについて知りたい？
          <A href='/about'>で詳細を手に入れよう！</A>
        </div>
      </div>
    </div>
  </>
}
