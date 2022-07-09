import React, { useEffect } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import isAuthenticatedAtom from "../recoil/atoms/isAuthenticatedAtom"
import socket from "../services/socket"
import { TokenStorage } from "../modules/TokenStorage"
import socketConnectionAtom from "../recoil/atoms/socketConnectionAtom"
import useMessages from "./useMessages"
import usersStatusAtom from "../recoil/atoms/usersStatusAtom"


const useSocket = () => {
	const [socketConnection, setSocketConnection] = useRecoilState(socketConnectionAtom)
	const setUsersStatus       = useSetRecoilState(usersStatusAtom)

	const { addMessage }                          = useMessages()
	const [isAuthenticated]                       = useRecoilState(isAuthenticatedAtom)

	const stopSocketConnection = () => {
		socket.close()
		setSocketConnection(false)
	}

	const startSocketConnection = () => {
		if (!socketConnection) {
			setSocketConnection(true)

			if (isAuthenticated) {
				socket.emit("", TokenStorage.getUserId())

				socket.on("usersList", (usersList: []) => {
					setUsersStatus(usersList)
				})

				socket.on("message", (data) => {
					const message = {
						time:    Date.now(),
						message: data.message,
						fromMe:  false
					}

					addMessage(message, data.username, data.publicId, data.socketId)
				})
			}
		}
	}

	useEffect(() => {
		return () => {
			if (socket.connected) {
				socket.close()
			}
		}
	}, [])

	return { startSocketConnection, stopSocketConnection }
}

export default useSocket
