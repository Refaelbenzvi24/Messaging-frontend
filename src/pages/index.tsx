import { Outlet } from 'react-router'
import SideBar from '../components/SideBar'
import Main from '../components/UI/Main/Main'
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { TokenStorage } from "../modules/TokenStorage"
import useSocket from "../hooks/useSocket"
import { useSelector } from "react-redux"
import { IRootState } from "../store"


export default () => {
	const { authenticated }         = useSelector((state: IRootState) => state.user)
	const navigate                  = useNavigate()
	const { startSocketConnection } = useSocket()

	useEffect(() => {
		if (!TokenStorage.isAuthenticated()) {
			navigate("/login")
		} else if (authenticated) {
			startSocketConnection()
		}
	}, [authenticated])

	return (
		<div className="h-full w-full mx-auto">
			<SideBar/>

			<Main>
				<Outlet/>
			</Main>
		</div>
	)
}
