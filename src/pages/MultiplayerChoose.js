import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { io } from "socket.io-client"

function MultiplayerChoose() {
    const [gameCode, setGameCode] = useState("")
    const [errMessage, setErrMessage] = useState("")
    const navigate = useNavigate()
    const socket = io("http://localhost:5000")

    function joinGame() {
        socket.emit("join-multiplayer", gameCode, (isValid, errorMessage, rules, color) => {
            if (isValid) {
                navigate("/multiplayer/play", {state: {
                    formData: rules.formData,
                    pieceMovements: rules.pieceMovements,
                    isGameCreator: false,
                    color: color,
                    gameCode: gameCode,
                    //socket: socket
                }})
            } else {
                setErrMessage(errorMessage)
            }
        })
    }

    return (
        <>
            <div className="text-center" style={{
                height: "90%"
            }}>
                <button className="btn btn-primary align-middle" onClick={joinGame} style={{
                    marginTop: "35vh"
                }}>Join game with code</button><br />
                <input type="text" value={gameCode} onChange={(event) => setGameCode(event.target.value)} style={{
                    width: "10.5rem"
                }}></input><br />
                <div>{errMessage}</div>
                <Link to="settings" className="btn btn-primary align-middle" style={{
                    marginTop: "1.5rem"
                }}>Create game</Link>
            </div>
        </>
    )
}

export default MultiplayerChoose