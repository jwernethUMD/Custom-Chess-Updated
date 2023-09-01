import { io } from "socket.io-client"

function MultiplayerPlay() {
    const socket = io("http://localhost:5000")
    
    return (
        <>
            hi
        </>
    )
}

export default MultiplayerPlay