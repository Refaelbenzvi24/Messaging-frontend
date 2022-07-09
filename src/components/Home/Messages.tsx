import { Col, Row } from "../UI/Grid"
import Card from "../UI/Cards/Card"
import Message from "./Message"
import MessageInput from "./MessageInput"
import { useRecoilValue } from "recoil"
import messagesAtom from "../../recoil/atoms/messagesAtom"


export default (props: { publicId: string }) => {
	const { publicId } = props
	const messages     = useRecoilValue(messagesAtom)

	return (
		<Row className="h-full w-full">
			<Col className="h-full w-full py-4 px-0">
				<Card className="h-full w-full relative px-0">

					<Row>
						<Col className="px-4 py-2 w-full">
							{
								messages.find(user => user.publicId === publicId)?.messages.map((message, index) => (
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
