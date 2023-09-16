import { createStore } from "solid-js/store"
import { MatrixWrapper } from "../utils/matrix"

export const [matrixData, setMatrixData] = createStore<{
  matrixWrapper: MatrixWrapper
}>({
  matrixWrapper: new MatrixWrapper()
})
