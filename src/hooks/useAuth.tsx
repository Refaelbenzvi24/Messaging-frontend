import { socketActions } from "../store/socket"
import { usersStatusActions } from "../store/usersStatus"
import { messagesActions } from "../store/messages"
import { userActions } from "../store/user"
import { useDispatch } from "react-redux"
import { auth } from "../services"
import { useNavigate } from "react-router-dom"


const useAuth = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const logout = async () => {
		await auth.logout()
		dispatch(socketActions.disconnect())
		dispatch(usersStatusActions.updateData([]))
		dispatch(messagesActions.clearMessages())
		dispatch(userActions.logout())
		navigate("/login")
	}

	return { logout }
}


export default useAuth
