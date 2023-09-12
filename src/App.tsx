import { createSignal } from 'solid-js'
import * as sdk from 'matrix-js-sdk'
import { Router, hashIntegration, A, Routes, Route } from '@solidjs/router'

import { Home } from './components/home/index.tsx'

const About = () => (<>
  <div>About!</div>
  <div>
    kinakonoの説明ページ
  </div>
  <A href='/'>To Home</A>
</>)
function App() {
  return <main>
    <Router source={hashIntegration()}>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
      </Routes>
    </Router>
  </main>
}

export default App
