import Col from "../UI/Grid/Col"
import Row from "../UI/Grid/Row"
import {useUsersStatus} from "../../context"
import MessageButton from "./MessageButton"
import Title from "../UI/Typograpy/Title";


export default () => {
	const {usersStatus} = useUsersStatus()
	const transformedUsersStatus = usersStatus.map(userStatus => {
		return {
			socketId: userStatus.socketId,
			username: userStatus.username,
			publicId: userStatus.publicId,
			lastMessage: '',
			timeSent: '',
			online: userStatus.online
		}
	})
	
	
	return (
		<Row className="w-full py-4">
			<Col className="w-full">
				{
					transformedUsersStatus.length > 0 && transformedUsersStatus.map((props, index) => (
						<MessageButton index={index} {...props} key={props.socketId ?? index}/>
					))
				}
				{
					transformedUsersStatus.length === 0 && (
						<div className="text-center">
							<Title className="text-gray-500 dark:text-gray-200">There are no active <br/> users currently!</Title>
						</div>)
				}
			</Col>
		</Row>
	)
}
