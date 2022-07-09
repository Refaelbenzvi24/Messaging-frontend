import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userReducer from "./user"
import socketReducer from "./socket"
import messagesReducer from "./messages"
import localStorageMiddleware from "./middlewares/localStorage"
import usersStatusReducer from "./usersStatus"


const rootReducer = combineReducers({
	user:        userReducer,
	socket:      socketReducer,
	messages:    messagesReducer,
	usersStatus: usersStatusReducer
})


const store = configureStore({
	reducer:    rootReducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat([localStorageMiddleware])
})


export type IRootState = ReturnType<typeof rootReducer>

export default store
