import {Col, Row} from "../UI/Grid";
import Card from "../UI/Cards/Card";
import Message from "./Message";
import {BaseSyntheticEvent, useState} from "react";
import MessageInput from "./MessageInput";
import {useMessages} from "../../context";

interface MessagesProps {
	publicId: string
}

interface MessageType {
	time: number
	fromMe: boolean
	message: string
}

export default (props: MessagesProps) => {
	const {messages} = useMessages()
	
	console.log(messages)
	
	const userMessages = messages.filter(messages => messages.publicId === props.publicId)[0]
	
	
	return (
		<Row className="h-full w-full">
			<Col className="h-full w-full py-4 px-0">
				<Card className="h-full w-full relative px-0">
					<Row>
						<Col className="px-4 py-2 w-full">
							{(userMessages?.messages || []).map((message, index) => <Message {...message} key={index}/>)}
						</Col>
					</Row>
					
					<MessageInput publicId={props.publicId}/>
				</Card>
			</Col>
		</Row>
	)
}
