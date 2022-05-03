import React, {ReactElement, useContext, useEffect, useState} from 'react'
import io, {Socket} from 'socket.io-client'
import {Vars} from "../modules/vars";
import {TokenStorage} from "../modules/TokenStorage";
import {useMessages, useUsersStatus} from "./index";
import {UserStatus} from "./UsersStatusProvider";
import message from "../components/Home/Message";
import {MessageProps} from "../modules/Entities/Message";

interface SocketContext {
	socket: Socket
	setSocket: (socket: Socket) => void
}

export interface SocketProviderOptions {
	children: ReactElement;
}

export const SocketContext = React.createContext<SocketContext>({} as SocketContext)

export function useSocket() {
	return useContext(SocketContext)
}

export function SocketProvider({children}: SocketProviderOptions) {
	const [socket, setSocket] = useState<Socket>(io(Vars.api.url))
	const {setUsersStatus} = useUsersStatus()
	const {updateMessages} = useMessages()
	
	const authenticated = async () => await TokenStorage.isAuthenticated()
	useEffect(() => {
		if (TokenStorage.getRefreshToken() && TokenStorage.getRefreshToken().length > 0) {
			socket.on('connect', () => {
				socket.emit("", TokenStorage.getUserId())
				
				socket.on("usersList", (usersList: []) => {
					setUsersStatus(usersList)
				})
				
				socket.on("message", (data) => {
					updateMessages(data.message, data.username, data.senderPublicId, data.socketId)
				})
				
				socket.on("usersListBroadcast", (usersList: UserStatus[]) => {
					usersList.map(user => user.username !== TokenStorage.getUserName())
					
					setUsersStatus(usersList)
				})
			})
		}
		
		
		return () => {
			socket.close()
		}
	}, [])
	
	return (<SocketContext.Provider value={{socket, setSocket}}>{children}</SocketContext.Provider>)
}
