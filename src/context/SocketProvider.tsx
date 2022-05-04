import React, {MutableRefObject, ReactElement, useContext, useEffect, useRef} from 'react'
import io, {Socket} from 'socket.io-client'
import {Vars} from "../modules/vars"
import {TokenStorage} from "../modules/TokenStorage"
import {useMessages, useUsersStatus} from "./index"
import message from "../components/Home/Message"
import {Message} from "../modules/Entities/Message"

interface SocketContext {
	socket: Socket
	newSocketRef: () => void
}

export interface SocketProviderOptions {
	children: ReactElement;
}

export const SocketContext = React.createContext<SocketContext>({} as SocketContext)

export function SocketProvider({children}: SocketProviderOptions) {
	const socketRef = useRef<Socket>(io(Vars.api.url))
	const {setUsersStatus} = useUsersStatus()
	const {updateMessages} = useMessages()
	
	const newSocketRef = () => {
		socketRef.current = io(Vars.api.url)
	}
	
	useEffect(() => {
		if (TokenStorage.isAuthenticated()) {
			socketRef.current.emit("", TokenStorage.getUserId())
			
			socketRef.current.on("usersList", (usersList: []) => {
				setUsersStatus(usersList)
			})
			
			socketRef.current.on("message", (data) => {
				const message = new Message({
					message: data.message,
					fromMe: false
				})
				
				updateMessages(message, data.username, data.publicId, data.socketId)
			})
		}
		
		return () => {
			socketRef.current?.close()
		}
	}, [])
	
	return (<SocketContext.Provider value={{socket: socketRef.current, newSocketRef}}>{children}</SocketContext.Provider>)
}
