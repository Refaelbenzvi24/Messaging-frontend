import React, {ReactElement, useEffect, useRef, useState} from 'react'
import {MessageProps} from "../modules/Entities/Message";
import {Messages, MessagesProps} from "../modules/Entities/Messages";
import {LocalStorage} from "../modules/LocalStorage";

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
	const messagesRef = useRef<MessagesProps[]>([])
	
	
	useEffect(() => {
		const localStoredMessages = LocalStorage.getMessages() as MessagesProps[]
		setMessages(localStoredMessages)
		messagesRef.current = localStoredMessages
	}, [])
	
	useEffect(() => {
		messagesRef.current = messages
		LocalStorage.setMessages(messages)
	}, [JSON.stringify(messages)])
	
	
	const updateMessages = (newMessage: MessageProps, username: string, publicId: string, socketId: string): void => {
		const index = messagesRef.current.findIndex(messagesItem => messagesItem.publicId === publicId)
		
		if (index === -1) {
			setMessages([...messagesRef.current, new Messages({
				username: username,
				socketId: socketId,
				publicId: publicId,
				messages: [newMessage]
			})])
		} else {
			const newMessages: MessagesProps[] = [...messagesRef.current]
			newMessages[index].messages.push(newMessage)
			setMessages(newMessages)
		}
	}
	
	return (<MessagesContext.Provider value={{messages, setMessages, updateMessages}}>{children}</MessagesContext.Provider>)
}
