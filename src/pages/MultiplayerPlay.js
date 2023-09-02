import { io } from "socket.io-client"
import { useEffect, useState } from "react";
import React from "react";
import Board from "../components/Board";
import WinAnnouncement from "../components/WinAnnouncement"
import { useLocation } from "react-router-dom";
import DrawBtn from "../components/DrawBtn";

let oRestart

function MultiplayerPlay() {
    // const socket = io("http://localhost:5000")
    // socket.emit("multiplayer-started")

    const [showWin, setShowWin] = useState(false)
    const [color, setColor] = useState("None")
    const [gameDrawn, setGameDrawn] = useState(false)

    const { state } = useLocation()
    let {formData, pieceMovements} = state
    const {checkEnabled, castlingEnabled, flippingEnabled} = formData

    useEffect(() => {
        for (const piece in pieceMovements) {
        pieceMovements[piece] = Object.values(pieceMovements[piece])
        }
    }, [pieceMovements])
    
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
                castlingEnabled={castlingEnabled} flippingEnabled={flippingEnabled} moveTypes={pieceMovements}/>
                <DrawBtn drawGame={() => setGameDrawn(true)} />
            </div>
            <div className="mx-auto bg-light p-2 rounded" style={{
                height: "12rem",
                width: "10rem",
                zIndex: "2",
                position: "relative",
                top: "10rem",
                textAlign: "center"
            }}>
                <div className="align-middle">
                    Game code: T3STC0D3
                </div>
                <hr />
                <div className="align-middle">
                    Waiting for opponent...
                </div>
                <div className="spinner-border align-middle mt-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            <WinAnnouncement showWin={showWin} color={color} reset={reset}/>
        </div>
    );
}

const playStyle = {
    minHeight: "100%",
    backgroundColor: "rgb(60, 60, 60)"
}

export default MultiplayerPlay