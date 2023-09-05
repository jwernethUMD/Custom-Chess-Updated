import { io } from "socket.io-client"
import { useEffect, useState } from "react";
import React from "react";
import Board from "../components/Board";
import WinAnnouncement from "../components/WinAnnouncement"
import { useLocation } from "react-router-dom";
import DrawBtn from "../components/DrawBtn";

let oRestart
let movePiece
function sendPieceMover(movePieceFunc) {
    movePiece = movePieceFunc
}
function MultiplayerPlay() {
    const [showWin, setShowWin] = useState(false)
    const [color, setColor] = useState("None")
    const [gameDrawn, setGameDrawn] = useState(false)
    const [showLoading, setShowLoading] = useState(false)

    // All of the following are only set once:
    const [gameCode, setGameCode] = useState("")
    const [checkEnabled, setCheckEnabled] = useState()
    const [castlingEnabled, setCastlingEnabled] = useState()
    const [pieceMovements, setPieceMovements] = useState()
    const [playerColor, setPlayerColor] = useState("none")
    const [socket, setSocket] = useState()
    
    const location = useLocation()
    
    
    useEffect(() => {
        const state = location.state
        const tempSocket = io("http://localhost:5000")

        let tempPieceMovements, formData
        if (state.isGameCreator) {
            tempPieceMovements = state.pieceMovements
            formData = state.formData
            setShowLoading(true)
            // Only need to reformat once in the game host
            for (const piece in tempPieceMovements) {
                tempPieceMovements[piece] = Object.values(tempPieceMovements[piece])
            }

            tempSocket.emit("multiplayer-started", {
                formData: formData,
                pieceMovements: tempPieceMovements
            }, 
            (gCode) => {
                setGameCode(gCode)
            })

            tempSocket.on("opponent-joined", (pColor) => {
                setShowLoading(false)
                setPlayerColor(pColor)
            })

            setCheckEnabled(formData.checkEnabled)
            setCastlingEnabled(formData.castlingEnabled)
            setPieceMovements(tempPieceMovements)
        } else {
            tempSocket.emit("join-multiplayer", state.gameCode, (rules, pColor) => {
                setPlayerColor(pColor)
                formData = rules.formData
                tempPieceMovements = rules.pieceMovements
                setCheckEnabled(formData.checkEnabled)
                setCastlingEnabled(formData.castlingEnabled)
                setPieceMovements(tempPieceMovements)
            })

            setGameCode(state.gameCode)
        }
        
        tempSocket.on("connect", () => {
            setSocket(tempSocket)
        })

        tempSocket.on("opponent-moved", (piece, x, y) => {
            console.log("OPPONENT MOVED")
            movePiece(piece, x, y)
        })
    }, [])
    
    function sendMove(piece, x, y) {
        socket.emit("player-moved", gameCode, piece, x, y)
    }

    function matchEnded(color, restart) {
        setColor(color)
        setShowWin(true)
        oRestart = restart
    }

    function reset() {
        oRestart()
        setShowWin(false)
        setGameDrawn(false)
    }

    return (
        <div style={playStyle}>
            
            <div style={{
                position: "absolute",
                height: "100vh",
                width: "98vw",
                display: "flex",
                justifyContent: "center"
            }}>
                <Board matchEnded={matchEnded} gameDrawn={gameDrawn} checkEnabled={checkEnabled}
                castlingEnabled={castlingEnabled} flippingEnabled={false} moveTypes={pieceMovements} 
                playerColor={playerColor} sendMove={sendMove} isMultiplayer={true} socket={socket} sendPieceMover={sendPieceMover}/>
                <DrawBtn drawGame={() => setGameDrawn(true)} />
            </div>
            {showLoading ? (
                <div className="mx-auto bg-light p-2 rounded" style={{
                    height: "12rem",
                    width: "10rem",
                    zIndex: "2",
                    position: "relative",
                    top: "10rem",
                    textAlign: "center"
                }}>
                    <div className="align-middle">
                        Game code: {gameCode}
                    </div>
                    <hr />
                    <div className="align-middle">
                        Waiting for opponent...
                    </div>
                    <div className="spinner-border align-middle mt-2" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : ""}
            <WinAnnouncement showWin={showWin} color={color} reset={reset}/>
        </div>
    );
}

const playStyle = {
    minHeight: "100%",
    backgroundColor: "rgb(60, 60, 60)"
}

export default MultiplayerPlay