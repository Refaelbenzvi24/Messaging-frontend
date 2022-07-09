import { createSlice } from "@reduxjs/toolkit"
import { TokenStorage } from "../modules/TokenStorage"


const userSlice = createSlice({
	name:         "user",
	initialState: {
		authenticated: TokenStorage.isAuthenticated(),
	},
	reducers:     {
		login:    (state) => {
			state.authenticated = true
		},
		logout: (state) => {
			state.authenticated = false
		},
	},
})

const userReducer = userSlice.reducer

export const userActions = userSlice.actions

export default userReducer
