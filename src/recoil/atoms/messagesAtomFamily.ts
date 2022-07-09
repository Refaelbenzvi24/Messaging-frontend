import { atomFamily } from "recoil"
import { Message } from "../../modules/Entities/Message"


const messagesAtom = atomFamily<Message, number>({
	key:     "messages",
	default: new Message({
		message: "",
		fromMe:  false,
	})
})

export default messagesAtom
