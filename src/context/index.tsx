import {FC, ReactElement, useContext} from "react"
import ThemeProvider from "../components/UI/Theme/ThemeProvider"
import MainProvider from "../components/UI/Main/MainProvider"
import {SocketProvider, SocketContext} from "./SocketProvider"
import {UsersStatusContext, UsersStatusProvider} from "./UsersStatusProvider";
import {MessagesContext, MessagesProvider} from "./MessagesProvider";
import CombineComponents from "./CombineComponents";
import io from "socket.io-client";
import {Vars} from "../modules/vars";

export interface ProvidersProps {
	children: ReactElement;
}

const providers = [
	ThemeProvider,
	MainProvider,
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
	const {newSocketRef} = useSocket()
	const {setUsersStatus} = useUsersStatus()
	const {setMessages} = useMessages()
	
	const clearUserContextRefs = () => {
		newSocketRef()
		setUsersStatus([])
		setMessages([])
	}
	
	return {clearUserContextRefs}
}


export const useSocket = () => useContext(SocketContext)

export const useUsersStatus = () => useContext(UsersStatusContext)

export const useMessages = () => useContext(MessagesContext)
