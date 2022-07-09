import { atom } from "recoil"
import { LocalStorage } from "../../modules/LocalStorage"
import { Messages } from "../../modules/Entities/Messages"


const messagesAtom = atom<Messages[]>({
	key:              "messages",
	default:          LocalStorage.getMessages(),
})

export default messagesAtom
