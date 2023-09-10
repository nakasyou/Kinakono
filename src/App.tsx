import { createSignal } from 'solid-js'
import * as sdk from 'matrix-js-sdk'

function App() {
  return <main>
    <div class="text-2xl">Kinakono</div>
    <p>Kinakonoは、分散型のスーパーアプリです。</p>
    <button onClick={() => {
      alert(sdk)
    }}>aaa</button>
  </main>
}

export default App
