import { Row, Col } from '../../../components/UI/Grid'
import Messages from '../../../components/Home/Messages'
import { useParams } from "react-router"


export default () => {
	const { t }            = useTranslation()
	const { userPublicId } = useParams<{ userPublicId: string }>()


	return (
		<Row className="w-full h-full px-4 pt-3">
			<Col className="w-full h-full">
				<h1 className="text-5xl pl-5">{t('My Messages')}</h1>
				<Messages publicId={userPublicId || ""}/>
			</Col>
		</Row>
	)
}
