import {Outlet} from 'react-router'
import SideBar from '../components/SideBar'
import Main from '../components/UI/Main/Main'
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {TokenStorage} from "../modules/TokenStorage";
import {useAuth, useSocket} from "../context";

export default () => {
	const {isConnected, startSocketConnection} = useSocket()
	const {isAuthenticated} = useAuth()
	const navigate = useNavigate()
	
	useEffect(() => {
		if (!TokenStorage.isAuthenticated()) {
			navigate("/login")
		} else if (isAuthenticated && !isConnected && startSocketConnection) {
			startSocketConnection()
		}
	}, [isAuthenticated])
	
	return (
		<div className="h-full w-full mx-auto">
			<SideBar/>
			
			<Main>
				<Outlet/>
			</Main>
		</div>
	)
}
