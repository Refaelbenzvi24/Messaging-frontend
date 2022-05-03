import {ReactElement, useContext} from "react"
import ThemeProvider from "../components/UI/Theme/ThemeProvider"
import MainProvider from "../components/UI/Main/MainProvider"
import {SocketProvider, SocketContext} from "./SocketProvider"
import {UsersStatusContext, UsersStatusProvider} from "./UsersStatusProvider";
import {MessagesContext, MessagesProvider} from "./MessagesProvider";

export interface ProvidersProps {
	children: ReactElement;
}

export default (props: ProvidersProps) => {
	return (
		<ThemeProvider>
			<MainProvider>
				<MessagesProvider>
					<UsersStatusProvider>
						<SocketProvider>
							{props.children}
						</SocketProvider>
					</UsersStatusProvider>
				</MessagesProvider>
			</MainProvider>
		</ThemeProvider>
	)
}


export const useSocket = () => useContext(SocketContext)

export const useUsersStatus = () => useContext(UsersStatusContext)

export const useMessages = () => useContext(MessagesContext)
