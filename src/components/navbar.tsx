import { A } from '@solidjs/router'

export interface Props {
  now: 'home' | 'chat'
}
export const Navbar = (props: Props) => {
  return <div>
    <div class="grid grid-cols-2">
      <A href='/'>
        <div>
          🏠
        </div>
      </A>
      <A href='/chat'>
        <div>
          💬
        </div>
      </A>
    </div>
  </div>
}
