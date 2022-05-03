import React, {ReactElement, useEffect, useState} from 'react'
import {MessageProps} from "../modules/Entities/Message";
import {Messages, MessagesProps} from "../modules/Entities/Messages";

interface MessagesContext {
	messages: MessagesProps[]
	setMessages: (usersStatus: MessagesProps[]) => void
	updateMessages: (newMessage: MessageProps, username: string, senderPublicId: string, socketId: string) => void
}

export interface MessagesProviderOptions {
	children: ReactElement;
}

export const MessagesContext = React.createContext<MessagesContext>({} as MessagesContext)

export function MessagesProvider({children}: MessagesProviderOptions) {
	const [messages, setMessages] = useState<MessagesProps[]>([])
	
	const updateMessages = (newMessage: MessageProps, username: string, publicId: string, socketId: string): void => {
		const index = messages.findIndex(messagesItem => messagesItem.publicId === publicId)
		if (index === -1) {
			setMessages([...messages, new Messages({
				username: username,
				socketId: socketId,
				publicId: publicId,
				messages: [newMessage]
			})])
		} else {
			const newMessages: MessagesProps[] = [...messages]
			newMessages[index].messages.push(newMessage)
			setMessages(newMessages)
		}
	}
	
	return (<MessagesContext.Provider value={{messages, setMessages, updateMessages}}>{children}</MessagesContext.Provider>)
}
