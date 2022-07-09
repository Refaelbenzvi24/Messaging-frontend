import { atom } from "recoil"


const socketConnectionAtom = atom({
	key:     "socketConnection",
	default: false
})

export default socketConnectionAtom
