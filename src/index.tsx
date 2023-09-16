/* @refresh reload */
import { render } from 'solid-js/web'

import * as olm from 'olm'

window.Olm = olm

import './index.css'
import App from './App'

const root = document.getElementById('root')

render(() => <App />, root!)
