import { Outlet } from 'react-router'
import SideBar from '../components/SideBar'
import Main from '../components/UI/Main/Main'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { TokenStorage } from '../modules/TokenStorage'
import { useRecoilState, useRecoilValue } from "recoil"
import isAuthenticatedAtom from "../recoil/atoms/isAuthenticatedAtom"
import useSocket from "../hooks/useSocket"
import socketConnectionAtom from "../recoil/atoms/socketConnectionAtom"


export default () => {
	const { startSocketConnection } = useSocket()
	const socketConnection          = useRecoilValue(socketConnectionAtom)
	const [isAuthenticated]         = useRecoilState(isAuthenticatedAtom)
	const navigate                  = useNavigate()

	useEffect(() => {
		if (!TokenStorage.isAuthenticated()) {
			navigate("/login")
		} else if (isAuthenticated && !socketConnection) {
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
