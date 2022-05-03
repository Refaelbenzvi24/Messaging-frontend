import {Vars} from '../modules/vars'
import Auth from './Auth'

const apiData = {
	apiRootUrl: Vars.api.url,
	apiCurrentVersion: Vars.api.version,
}

export const auth = new Auth(apiData)
