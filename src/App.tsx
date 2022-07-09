import { useRoutes } from 'react-router-dom'
import routes from '~react-pages'

import ReloadPrompt from './components/ReloadPrompt'
import { RecoilRoot } from 'recoil'
import Plugins from './plugins'
import * as React from 'react'
import { TokenStorage } from "./modules/TokenStorage"
import { useEffect } from "react"
import { Provider } from "react-redux"
import store from "./store"
import { AppContextProvider } from "./context"


function Pages(): React.ReactElement | null {
	return useRoutes(routes)
}

export default () => {
	Plugins()

	useEffect(() => {
		(async () => {
			await TokenStorage.checkForToken()
		})()
	}, [])

	return (
		<AppContextProvider>
			<Provider store={store}>
				<RecoilRoot>
					<ReloadPrompt/>
					<Pages/>
				</RecoilRoot>
			</Provider>
		</AppContextProvider>
	)
}
