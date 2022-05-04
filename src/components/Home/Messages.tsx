import {Col, Row} from "../UI/Grid";
import Card from "../UI/Cards/Card";
import Message from "./Message";
import {BaseSyntheticEvent, useEffect, useState} from "react";
import MessageInput from "./MessageInput";
import {useMessages} from "../../context";
import {MessagesProps} from "../../modules/Entities/Messages";

export default (props: { publicId: string }) => {
	const {messages} = useMessages()
	const [userMessages, setUserMessages] = useState<MessagesProps>()
	
	useEffect(() => {
		if (messages && messages.length > 0) {
			setUserMessages(messages.filter(messages => messages.publicId === props.publicId)[0])
		}
	}, [props.publicId, JSON.stringify(messages)])
	
	
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
