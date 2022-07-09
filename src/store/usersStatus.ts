import { createSlice } from "@reduxjs/toolkit"
import { UserStatus } from "../context/UsersStatusProvider"


const usersStatusSlice = createSlice({
	name:         "usersStatus",
	initialState: {
		usersStatus: [] as UserStatus[]
	},
	reducers:     {
		updateData: (state, action) => {
			state.usersStatus = action.payload
		}
	},
})

const usersStatusReducer = usersStatusSlice.reducer

export const usersStatusActions = usersStatusSlice.actions

export default usersStatusReducer
