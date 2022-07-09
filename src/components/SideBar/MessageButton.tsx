import Row from "../UI/Grid/Row"
import Col from "../UI/Grid/Col"
import LongDivider from "../UI/Dividers/LongDivider"
import Title from "../UI/Typograpy/Title"
import Subtitle from "../UI/Typograpy/Subtitle"
import { CircleAvatar } from "../UI/Avatar"
import { Link } from "react-router-dom"
import FlatButton from "../UI/Buttons/FlatButton"


interface MessageButtonProps {
	index: number
	socketId: string
	publicId: string
	username: string
	lastMessage: string
	timeSent: string
	online: boolean
}

export default (props: MessageButtonProps) => {
	const { index, publicId, socketId, username, lastMessage, timeSent } = props

	return (
		<Row className="w-full">
			<FlatButton className="w-full">
				<Link className="w-full" to={`/messages/${publicId}`}>
					<Col className="w-full">
						{index === 0 && <LongDivider/>}
						<Row className="w-full h-full px-2 py-2">
							<Col className="h-full justify-center">
								<CircleAvatar>
									<IconPhUserDuotone/>
								</CircleAvatar>
							</Col>

							<Col className="w-full px-2">
								<Row className="py-[1px]">
									<Title className="text-[16px] px-1 !dark:text-gray-50">{username}</Title>
								</Row>
								<Row className="py-[1px] justify-between">
									<Col>
										<Subtitle className="text-gray-500 dark:text-gray-100 text-xs px-1 mt-[-1px]">{lastMessage}</Subtitle>
									</Col>
									<Col>
										<Subtitle className="text-xs px-1">{timeSent}</Subtitle>
									</Col>
								</Row>
							</Col>
						</Row>
						<LongDivider/>
					</Col>
				</Link>
			</FlatButton>
		</Row>
	)
}
