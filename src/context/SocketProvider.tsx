import React, {ReactElement, useEffect, useRef, useState} from 'react'
import io, {Socket} from 'socket.io-client'
import {Vars} from "../modules/vars"
import {TokenStorage} from "../modules/TokenStorage"
import {useAuth, useMessages, useUsersStatus} from "./index"
import message from "../components/Home/Message"
import {Message} from "../modules/Entities/Message"

interface SocketContext {
	socket: Socket | undefined
	stopSocketConnection: () => void
	startSocketConnection: () => void
	isConnected: boolean
}

export interface SocketProviderOptions {
	children: ReactElement
}

export const SocketContext = React.createContext<SocketContext>({} as SocketContext)

export function SocketProvider({children}: SocketProviderOptions) {
	const [isConnected, setIsConnected] = React.useState(false)
	const socketRef = useRef<Socket>()
	const {setUsersStatus} = useUsersStatus()
	const {updateMessages} = useMessages()
	const {isAuthenticated} = useAuth()
	const [connecting, setConnecting] = useState(false)
	
	const stopSocketConnection = () => {
		socketRef.current?.close()
		socketRef.current = undefined
		setIsConnected(false)
	}
	
	const startSocketConnection = () => {
		if (!connecting) {
			setConnecting(true)
			socketRef.current = io(Vars.api.url)
				.on("connect", () => {
					setConnecting(false)
					setIsConnected(true)
					
					if (isAuthenticated && socketRef.current) {
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
				})
		}
	}
	
	useEffect(() => {
		return () => {
			if (socketRef.current?.connected) {
				socketRef.current?.close()
			}
		}
	}, [])
	
	
	return (
		<SocketContext.Provider
			value={{
				socket: socketRef.current, startSocketConnection: startSocketConnection, stopSocketConnection: stopSocketConnection, isConnected
			}}>{children}</SocketContext.Provider>)
}
