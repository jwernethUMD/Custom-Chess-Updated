import { useEffect, useState } from "react";
import React from "react";
import Board from "../components/Board";
import WinAnnouncement from "../components/WinAnnouncement"
import { useLocation } from "react-router-dom";
import DrawBtn from "../components/DrawBtn";

let oRestart

function SingleplayerPlay() {
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
  
  console.log(formData, pieceMovements)
  
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
            width: "80vw",
            display: "flex",
            justifyContent: "center",
        }}>
        <Board matchEnded={matchEnded} gameDrawn={gameDrawn} checkEnabled={checkEnabled}
        castlingEnabled={castlingEnabled} flippingEnabled={flippingEnabled} moveTypes={pieceMovements}/>
        <DrawBtn drawGame={() => setGameDrawn(true)} />
      </div>
      <WinAnnouncement showWin={showWin} color={color} reset={reset}/>
    </div>
  );
}

const playStyle = {
  minHeight: "100%",
  backgroundColor: "rgb(60, 60, 60)"
}

export default SingleplayerPlay;