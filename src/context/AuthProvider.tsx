import React, {ReactElement, useEffect, useState} from 'react'
import {TokenStorage} from "../modules/TokenStorage";

interface AuthContext {
	isAuthenticated: boolean
	setIsAuthenticated: (isAuthenticated: boolean) => void
}

export interface AuthProviderOptions {
	children: ReactElement;
}

export const AuthContext = React.createContext<AuthContext>({} as AuthContext)

export function AuthProvider({children}: AuthProviderOptions) {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
	
	useEffect(() => {
		setIsAuthenticated(TokenStorage.isAuthenticated())
	}, [])
	
	return (<AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>{children}</AuthContext.Provider>)
}
