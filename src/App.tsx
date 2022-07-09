import { useRoutes } from 'react-router-dom'
import routes from '~react-pages'

import ReloadPrompt from './components/ReloadPrompt'
import Plugins from './plugins'
import * as React from 'react'
import { TokenStorage } from "./modules/TokenStorage"
import { useEffect } from "react"
import Providers from "./context"


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
		<Providers>
			<ReloadPrompt/>
			<Pages/>
		</Providers>
	)
}
