import {Outlet} from 'react-router'
import SideBar from '../components/SideBar'
import Main from '../components/UI/Main/Main'
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {TokenStorage} from "../modules/TokenStorage";


export default () => {
	const navigate = useNavigate()
	
	useEffect(() => {
		if (!TokenStorage.getRefreshToken() || TokenStorage.getRefreshToken()?.length !< 0) {
			navigate("/login")
		}
	}, [])
	
	return (
		<div className="h-full w-full mx-auto">
			<SideBar/>
			
			<Main>
				<Outlet/>
			</Main>
		</div>
	)
}
