import { A } from '@solidjs/router'

export const About = () => (<>
  
  <div class="mx-10">
    <div class='text-2xl'>About Kinakono</div>
    <div>
      <div>Kinakonoってなんでしょうか?</div>
      <div>
        <p>
          Kinakonoは、分散型のスーパーアプリを目指すものです。
          スーパーアプリ、聞き覚えありませんか?
          そう、イーロン・マスクが言っていたあれです。
          Xをスーパーアプリにしようとしていますが、Xは中央集権型です。
          スーパーアプリを分散型で実現しようというのが、Kinakonoです。
        </p>
      </div>
    </div>
  </div>
  <A href='/'>To Home</A>
</>)
