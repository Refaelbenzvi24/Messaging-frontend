import { io } from "socket.io-client"
import { Vars } from "../modules/vars"


const socket = io(Vars.api.url)

export default socket
