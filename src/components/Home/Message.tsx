import {Col, Row} from "../UI/Grid";
import Card from "../UI/Cards/Card";
import i18n from "i18next";
import clsx from "clsx";
import {CircleAvatar} from "../UI/Avatar";
import {MessageProps} from "../../modules/Entities/Message";


export default (params: MessageProps) => {
	const dir = i18n.dir()
	
	const {fromMe, message} = params
	
	return (
		<Row dir={fromMe ? (dir === "ltr" ? "rtl" : "ltr") : (dir === "rtl" ? "rtl" : "ltr")}>
			<Col className="place-self-center" dir={dir}>
				<CircleAvatar>
					<IconPhUserDuotone/>
				</CircleAvatar>
			</Col>
			
			<Col className="py-2 px-3">
				<Card className={`max-w-80 ${clsx(fromMe ? "!dark:bg-green-600 !bg-green-400" : "!bg-gray-50 !dark:bg-dark-50")}`}>
					<div dir={dir}>
						{message}
					</div>
				</Card>
			</Col>
		</Row>
	)
}
