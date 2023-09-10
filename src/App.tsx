import { createSignal } from 'solid-js'
import * as sdk from 'matrix-js-sdk'
import { Router, hashIntegration, A, Routes, Route } from 'solid-app-router'

const Home = () => (<>
  <div>Home!</div>
  <A href='/home'>To About</A>
</>)
const About = () => (<>
  <div>About!</div>
  <A href='/'>To Home</A>
</>)
function App() {
  return <main>
    <Router source={hashIntegration()}>
      <Routes>
        <Route path="/" component={Home} />
      </Routes>
    </Router>
  </main>
}

export default App
