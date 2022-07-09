import { LocalStorage } from "../../modules/LocalStorage"
import { Middleware } from "@reduxjs/toolkit"


const localStorageMiddleware: Middleware = state => next => action => {
	next(action)

	if (action.type.startsWith('messages')) {
		LocalStorage.setMessages(state.getState().messages.messages)
	}
}

export default localStorageMiddleware
