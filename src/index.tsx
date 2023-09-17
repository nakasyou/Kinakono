/* @refresh reload */
import { render } from 'solid-js/web'

import olm from 'olm'

window.OLM_OPTIONS = null

olm.init({
  locateFile: () => `${import.meta.env.BASE_URL}olm.wasm`
})
window.Olm = olm

import './index.css'
import App from './App'

const root = document.getElementById('root')

render(() => <App />, root!)
