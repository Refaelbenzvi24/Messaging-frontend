import { createSlice } from "@reduxjs/toolkit"


const socketSlice = createSlice({
	name:         "socket",
	initialState: {
		connection: false
	},
	reducers:     {
		connect:    (state) => {
			state.connection = true
		},
		disconnect: (state) => {
			state.connection = false
		}
	}
})


const socketReducer = socketSlice.reducer

export const socketActions = socketSlice.actions

export default socketReducer
