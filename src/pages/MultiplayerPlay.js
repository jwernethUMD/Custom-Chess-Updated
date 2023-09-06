import { io } from "socket.io-client"
import { useEffect, useState } from "react";
import React from "react";
import Board from "../components/Board";
import WinAnnouncement from "../components/WinAnnouncement"
import { useLocation, useNavigate } from "react-router-dom";

let oRestart
let movePiece, capturePiece, moveKing
function sendPieceMover(movePieceFunc) {
    movePiece = movePieceFunc
}

function sendPieceCapturer(capturePieceFunc) {
    capturePiece = capturePieceFunc
}

function sendKingMover(moveKingFunc) {
    moveKing = moveKingFunc
}

function MultiplayerPlay() {
    const [showWin, setShowWin] = useState(false)
    const [color, setColor] = useState("None")
    const [gameDrawn, setGameDrawn] = useState(false)
    const [showLoading, setShowLoading] = useState(false)
    const [drawText, setDrawText] = useState("Offer draw")
    const [drawOfferVisible, setDrawOfferVisible] = useState(false)

    // All of the following are only set once:
    const [gameCode, setGameCode] = useState("")
    const [checkEnabled, setCheckEnabled] = useState()
    const [castlingEnabled, setCastlingEnabled] = useState()
    const [pieceMovements, setPieceMovements] = useState()
    const [playerColor, setPlayerColor] = useState("none")
    const [socket, setSocket] = useState()
    
    const location = useLocation()
    const navigate = useNavigate()
    
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
            movePiece(piece, x, y)
        })

        tempSocket.on("opponent-captured", (piece, x, y, capturedPieceId, capturedPieceType, capturedPieceColor) => {
            capturePiece(piece, x, y, capturedPieceId, capturedPieceType, capturedPieceColor)
        })

        tempSocket.on("opponent-king-moved", (piece, x, y) => {
            moveKing(piece, x, y)
        })

        tempSocket.on("opponent-draw-offer", () => {
            setDrawOfferVisible(true)
        })

        tempSocket.on("draw-game", () => {
            drawGame(true)
        })

        setShowWin(false)
        return (() => {
            tempSocket.off("opponent-moved")
            tempSocket.off("opponent-captured")
            tempSocket.off("opponent-king-moved")
            tempSocket.off("opponent-draw-offer")
            tempSocket.off("draw-game")
        })
    }, [])
    
    function sendMove(piece, x, y) {
        socket.emit("player-moved", gameCode, piece, x, y)
    }

    function sendCapture(piece, x, y, capturedPieceId, capturedPieceType, capturedPieceColor) {
        socket.emit("player-captured", gameCode, piece, x, y, capturedPieceId, capturedPieceType, capturedPieceColor)
    }

    function sendKingMove(piece, x, y) {
        socket.emit("player-king-moved", gameCode, piece, x, y)
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
        navigate("/multiplayer")
    }

    function offerDraw() {
        socket.emit("player-draw-offer", gameCode)
        setDrawText("Draw offer sent")
        setTimeout(() => setDrawText("Offer draw"), 2000)
    }

    function drawGame(fromServer) {
        setGameDrawn(true)
        setDrawOfferVisible(false)
        if (!fromServer) {
            socket.emit("draw-game", gameCode)
        }
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
                playerColor={playerColor} sendMove={sendMove} isMultiplayer={true} sendPieceMover={sendPieceMover}
                sendPieceCapturer={sendPieceCapturer} sendCapture={sendCapture} sendKingMover={sendKingMover}
                sendKingMove={sendKingMove}/>
                <button className="btn btn-primary" style={{
                    width: "8rem",
                    height: "5rem",
                    marginTop: "10vmin",
                    marginLeft: "1rem"
                }} onClick={offerDraw}>{drawText}</button>
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
            {drawOfferVisible ? (
                <div className="bg-light p-2 rounded mx-auto" style={{
                    width: "13rem",
                    position: "relative",
                    zIndex: "2",
                    textAlign: "center",
                    top: "14rem"
                }}>
                    <div>Opponent offered a draw</div>
                    <button className="btn btn-success m-2" onClick={() => drawGame(false)}>Accept</button>
                    <button className="btn btn-danger m-2" onClick={() => setDrawOfferVisible(false)}>Decline</button>
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