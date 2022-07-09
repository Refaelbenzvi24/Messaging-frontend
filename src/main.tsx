import { Suspense, StrictMode } from 'react'
import {
	BrowserRouter as Router,
} from 'react-router-dom'
import ReactDOM from 'react-dom'
import RecoilizeDebugger from 'recoilize'

import './setup'
import './styles/cssLibraries'

import App from './App'
import ReactQuery from './components/ReactQuery/reactQuery'
import ProgressSpinner from './components/UI/Progress/ProgressSpinner'
import { RecoilRoot } from "recoil"


ReactDOM.render(
	<StrictMode>
		<RecoilRoot>
			<RecoilizeDebugger/>
			<ReactQuery>
				<Router>
					<Suspense fallback={<ProgressSpinner/>}>
						<App/>
					</Suspense>
				</Router>
			</ReactQuery>
		</RecoilRoot>
	</StrictMode>,
	document.querySelector('#root'),
)
