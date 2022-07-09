import { atom } from "recoil"
import { TokenStorage } from "../../modules/TokenStorage"


const isAuthenticatedAtom = atom({
	key:     "auth",
	default: TokenStorage.isAuthenticated()
})

export default isAuthenticatedAtom
