import { Col, Row } from "../UI/Grid"
import { BaseSyntheticEvent, useState } from "react"
import { Message } from "../../modules/Entities/Message"
import { TokenStorage } from "../../modules/TokenStorage"
import { UserStatus } from "../../context/UsersStatusProvider"
import socket from "../../services/socket"
import useMessages from "../../hooks/useMessages"
import { useSelector } from "react-redux"
import { IRootState } from "../../store"


interface MessageInputProps {
	publicId: string
}

/**
 * Return user socket id for a given public id and users array.
 * @param users { UserStatus[]} users array.
 * @param publicId {string} user public id.
 */
const getUserSocketId = (users: UserStatus[], publicId: string) => {
	return users[users.findIndex(user => user.publicId === publicId)]?.socketId
}

export default (props: MessageInputProps) => {
	const { t }                 = useTranslation()
	const [message, setMessage] = useState('')
	const { addMessage }        = useMessages()
	const { usersStatus }       = useSelector((state: IRootState) => state.usersStatus)

	const sendMessage = (event: BaseSyntheticEvent) => {
		event.preventDefault()
		if (message.length > 0) {
			const socketId = getUserSocketId(usersStatus, props.publicId)
			socket.emit("message", { message: message, socketId, publicId: props.publicId })

			const newMessage = {
				time:    Date.now(),
				message: message,
				fromMe:  true
			}

			addMessage(newMessage, TokenStorage.getUserName(), props.publicId, socketId)

			setMessage('')
		}
	}

	return (
		<form onSubmit={sendMessage}>
			<Row className="absolute bottom-2 w-[100%] py-1 px-2 justify-between">
				<Col className="w-full">
					<div className="w-full flex">
						<input value={message} onChange={(event) => setMessage(event.target.value)} placeholder={t("Type here")}
						       className="w-full h-13 py-2 px-3 border border-2 border-gray-200 bg-gray-50 dark:bg-dark-800 dark:border-dark-400
		          rounded-md shadow-sm focus:outline-none focus:ring-transparent focus:border-gray-300 dark:focus:border-dark-200 resize-none"/>
					</div>
				</Col>

				<Col className="place-self-center">
					<button className="w-17 h-12 py-2 px-3 mx-3 bg-gray-200 dark:bg-dark-400 opacity-95
		          rounded-md shadow-sm focus:outline-none active:bg-gray-100 dark:active:bg-dark-600"
					        type="submit">
						{t("Send")}
					</button>
				</Col>
			</Row>
		</form>
	)
}
