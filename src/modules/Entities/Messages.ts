import { MessageProps } from "./Message"


export interface MessagesProps {
	publicId: string
	socketId: string
	username: string
	messages: MessageProps[]
}

export class Messages {
	publicId: string
	socketId: string
	username: string
	messages: MessageProps[]

	constructor(props: MessagesProps) {
		this.publicId = props.publicId
		this.socketId = props.socketId
		this.username = props.username
		this.messages = props.messages
	}
}
