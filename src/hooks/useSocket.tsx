import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IRootState } from "../store"
import { useUsersStatus } from "../context"
import { TokenStorage } from "../modules/TokenStorage"
import { Message } from "../modules/Entities/Message"
import { socketActions } from "../store/socket"
import socket from "../services/socket"
import useMessages from "./useMessages"
import { usersStatusActions } from "../store/usersStatus"


const useSocket = () => {
	const { connection }    = useSelector((state: IRootState) => state.socket)
	const { authenticated } = useSelector((state: IRootState) => state.user)
	const { addMessage }    = useMessages()
	const dispatch          = useDispatch()

	const stopSocketConnection = () => {
		dispatch(socketActions.disconnect())
	}

	const startSocketConnection = () => {
		if (!connection) {
			dispatch(socketActions.connect())
			if (authenticated && socket) {
				socket.emit("", TokenStorage.getUserId())

				socket.on("usersList", (usersList: []) => {
					dispatch(usersStatusActions.updateData(usersList))
				})

				socket.on("message", (data: { username: string, publicId: string, socketId: string, message: string }) => {
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
				dispatch(socketActions.disconnect())
				socket.close()
			}
		}
	}, [])

	return { startSocketConnection, stopSocketConnection }
}

export default useSocket
