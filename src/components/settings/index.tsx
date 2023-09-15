import { Router, hashIntegration, Routes, Route } from '@solidjs/router'
import { AccountsMatrix } from './accounts/matrix'

export const Settings = () => {
  return <>
    <Route path='/' element={<div>
      <div class="px-5">
        <div class="text-2xl">Settings</div>
        <div>
          設定画面です。
        </div>
      </div>
    </div>} />
    <Route path='/accounts'>
      <Route path='/matrix' component={AccountsMatrix} />
    </Route>
  </>
}