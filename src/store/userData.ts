import { createStore } from "solid-js/store"

export const [matrixData, setMatrixData] = createStore<{
  userData?: {
    /*
     * User Name
     * @remarks
     * e.g, `@nakasyou:matrix.org`
     */
    userName: string
    /*
     * Password
     * @remarks
     * e.g, `watashinonamaehapasuwa-do`
     */
    password: string
  }
}>({})
