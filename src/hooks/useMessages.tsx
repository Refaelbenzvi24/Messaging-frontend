import { useRecoilState } from "recoil"
import messagesAtom from "../recoil/atoms/messagesAtom"
import { useEffect } from "react"
import { LocalStorage } from "../modules/LocalStorage"
import { Message } from "../modules/Entities/Message"
import produce from "immer"

const useMessages = () => {
	const [messages, setMessages] = useRecoilState(messagesAtom)

	useEffect(() => {
		LocalStorage.setMessages(messages)
	}, [JSON.stringify(messages)])


	const addMessage = (newMessage: Message, username: string, publicId: string, socketId: string): void => {
		const index = messages.findIndex(messagesItem => messagesItem.publicId === publicId)

		if (index === -1) {
			setMessages(messages => produce(messages, draft => {
				draft.push({
					username: username,
					socketId: socketId,
					publicId: publicId,
					messages: [newMessage]
				})
			}))
			return
		}

		setMessages(messages => produce(messages, (draft) => {
			draft[index].messages.push(newMessage)
		}))
	}

	const clearMessages = () => {
		setMessages([])
		LocalStorage.setMessages([])
	}


	return { addMessage, clearMessages }
}

export default useMessages
