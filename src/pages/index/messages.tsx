import {Col, Row} from "../../components/UI/Grid";
import {Outlet} from "react-router";

export default () => {
	return (
		<Row className="h-full w-full">
			<Col className="h-full w-full">
				<Outlet/>
			</Col>
		</Row>
)
}
