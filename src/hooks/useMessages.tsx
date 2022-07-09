import { useDispatch } from "react-redux"
import { messagesActions } from "../store/messages"
import { MessageProps } from "../modules/Entities/Message"


const useMessages = () => {
	const dispatch     = useDispatch()

	const addMessage = (newMessage: MessageProps, username: string, publicId: string, socketId?: string) => {
		dispatch(messagesActions.addMessage({ newMessage, username, publicId, socketId }))
	}

	return { addMessage }
}

export default useMessages
