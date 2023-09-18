import { Route } from '@solidjs/router'
import { ChatHome } from './home'
import { ChatRoom } from './room'

export function Chat () {
  return <>
    <Route path='/' component={ChatHome} />
    <Route path='/room/:room' component={ChatRoom} />
  </>
}