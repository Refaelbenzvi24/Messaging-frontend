import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { LocalStorage } from "../modules/LocalStorage"
import { MessagesProps } from "../modules/Entities/Messages"
import { MessageProps } from "../modules/Entities/Message"
import { current } from "immer"


export interface addMessagePayload {
	newMessage: MessageProps
	username: string
	publicId: string
	socketId?: string
}

const messagesSlice = createSlice({
	name:         "messages",
	initialState: {
		messages: LocalStorage.getMessages() as MessagesProps[]
	},
	reducers:     {
		addMessage: (state, action: PayloadAction<addMessagePayload>) => {
			const { username, socketId, publicId, newMessage } = action.payload
			const index                                        = state.messages.findIndex(messagesItem => messagesItem.publicId === publicId)

			if (index === -1 && socketId) {
				state.messages.push({
					username: username,
					socketId: socketId,
					publicId: publicId,
					messages: [newMessage]
				})
			} else {
				state.messages[index].messages.push(newMessage)
			}
		},

		clearMessages: (state) => {
			state.messages = []
		}
	}
})


const messagesReducer = messagesSlice.reducer

export const messagesActions = messagesSlice.actions

export default messagesReducer
