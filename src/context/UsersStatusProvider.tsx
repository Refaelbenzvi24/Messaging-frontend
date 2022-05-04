import React, {ReactElement, useEffect, useState} from 'react'
import {useSocket} from "./index";

export interface UserStatus {
	socketId: string
	publicId: string
	username: string
	online: boolean
	lastSeen: Date
}

interface UsersStatusContext {
	usersStatus: UserStatus[]
	setUsersStatus: (usersStatus: UserStatus[]) => void
}

export interface UsersStatusProviderOptions {
	children: ReactElement;
}

export const UsersStatusContext = React.createContext<UsersStatusContext>({} as UsersStatusContext)

export function UsersStatusProvider({children}: UsersStatusProviderOptions) {
	const [usersStatus, setUsersStatus] = useState<UserStatus[]>([])
	
	return (<UsersStatusContext.Provider value={{usersStatus, setUsersStatus}}>{children}</UsersStatusContext.Provider>)
}
