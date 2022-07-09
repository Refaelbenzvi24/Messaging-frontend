import { atom } from "recoil"

export interface UserStatus {
	socketId: string
	publicId: string
	username: string
	online: boolean
	lastSeen: Date
}

const usersStatusAtom = atom<UserStatus[]>({
	key:     "usersStatus",
	default: []
})

export default usersStatusAtom
