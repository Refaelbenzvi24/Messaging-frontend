import useSocket from "./useSocket"
import useMessages from "./useMessages"
import { useSetRecoilState } from "recoil"
import usersStatusAtom from "../recoil/atoms/usersStatusAtom"
import isAuthenticatedAtom from "../recoil/atoms/isAuthenticatedAtom"
import { useNavigate } from "react-router-dom"
import { auth } from "../services"


const useAuth = () => {
	const navigate                 = useNavigate()
	const { stopSocketConnection } = useSocket()
	const { clearMessages }        = useMessages()
	const setUsersStatus           = useSetRecoilState(usersStatusAtom)
	const setIsAuthenticated       = useSetRecoilState(isAuthenticatedAtom)

	const logout = async () => {
		await auth.logout()
		stopSocketConnection()
		clearMessages()
		setUsersStatus([])
		setIsAuthenticated(false)
		navigate("/login")
	}

	return { logout }
}

export default useAuth
