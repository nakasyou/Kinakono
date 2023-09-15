import { createStore } from "solid-js/store"
import type { MatrixClient } from 'matrix-js-sdk'

export const [matrixData, setMatrixData] = createStore<{
  client?: MatrixClient
}>({})
