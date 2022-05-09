import {FC, ReactElement, useContext} from "react"
import ThemeProvider from "../components/UI/Theme/ThemeProvider"
import MainProvider from "../components/UI/Main/MainProvider"
import {SocketProvider, SocketContext} from "./SocketProvider"
import {UsersStatusContext, UsersStatusProvider} from "./UsersStatusProvider";
import {MessagesContext, MessagesProvider} from "./MessagesProvider";
import CombineComponents from "./CombineComponents";
import {AuthContext, AuthProvider} from "./AuthProvider";

export interface ProvidersProps {
	children: ReactElement;
}

const providers = [
	ThemeProvider,
	MainProvider,
	AuthProvider,
	UsersStatusProvider,
	MessagesProvider,
	SocketProvider
]

export const AppContextProvider = CombineComponents(...providers as FC[])

export default (props: ProvidersProps) => {
	return (
		<AppContextProvider>
			{props.children}
		</AppContextProvider>
	)
}

export const contextManager = () => {
	const {stopSocketConnection} = useSocket()
	const {setUsersStatus} = useUsersStatus()
	const {setMessages} = useMessages()
	const {setIsAuthenticated} = useAuth()
	
	const clearUserContextRefs = () => {
		stopSocketConnection()
		setUsersStatus([])
		setMessages([])
		setIsAuthenticated(false)
	}
	
	return {clearUserContextRefs}
}


export const useSocket = () => useContext(SocketContext)

export const useUsersStatus = () => useContext(UsersStatusContext)

export const useMessages = () => useContext(MessagesContext)

export const useAuth = () => useContext(AuthContext)
