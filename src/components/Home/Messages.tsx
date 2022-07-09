import { Col, Row } from "../UI/Grid"
import Card from "../UI/Cards/Card"
import Message from "./Message"
import MessageInput from "./MessageInput"
import { useSelector } from "react-redux"
import { IRootState } from "../../store"


export default (props: { publicId: string }) => {
	const { messages } = useSelector((state: IRootState) => state.messages)

	return (
		<Row className="h-full w-full">
			<Col className="h-full w-full py-4 px-0">
				<Card className="h-full w-full relative px-0">

					<Row>
						<Col className="px-4 py-2 w-full">
							{
								messages && messages.find(messages => messages.publicId === props.publicId)
									?.messages.map((message, index) => (
									<Message {...message} key={index}/>
								))
							}
						</Col>
					</Row>

					<MessageInput publicId={props.publicId}/>
				</Card>
			</Col>
		</Row>
	)
}
