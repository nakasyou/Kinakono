import { createSignal } from 'solid-js'
import { Router, hashIntegration, Routes, Route } from '@solidjs/router'

import { Home } from './components/home'
import { Chat } from './components/chat'
import { About } from './components/about'
import { Settings } from './components/settings'

function App() {
  return <main>
    <Router source={hashIntegration()}>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/chat" component={Chat} />
        <Route path='/settings'><Settings /></Route>
      </Routes>
    </Router>
  </main>
}

export default App
