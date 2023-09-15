import { LoginMatrix } from "./login"
import { matrixData, setMatrixData } from "../../../../store/matrix"

export const AccountsMatrix = () => {
  return <div>
    {
      !matrixData.client ? (
        <div>
          <LoginMatrix />
        </div>
      ) : (
        <div>
          <div>Matrixアカウントに既にログインしています。</div>
        </div>
      )
    }
  </div>
}
