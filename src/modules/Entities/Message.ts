export interface MessageProps {
	time?: number
	fromMe: boolean
	message: string
}

export class Message {
	time: number
	fromMe: boolean
	message: string
	
	constructor(props: MessageProps) {
		this.time = Date.now()
		this.fromMe = props.fromMe
		this.message = props.message
	}
}

