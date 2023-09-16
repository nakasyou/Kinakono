import { LoginMatrix } from "./login"
import { matrixData } from "../../../../store/matrix"

export const AccountsMatrix = () => {
  return <div>
    {
      !matrixData.matrixWrapper.solidStore.isLogined ? (
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
