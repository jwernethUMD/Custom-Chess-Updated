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
  const [moveTypes, setMoveTypes] = useState({})

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

  // TODO: Make these arrow functions for conciseness
  function drawGame() {
    setGameDrawn(true)
  }

  function changeMoveTypes(newTriplets, type) {
    let newMoves = global.structuredClone(moveTypes)
    newMoves[type] = []
    for (let i = 0; i < newTriplets.length; i++) {
      let newTriplet = newTriplets[i]
      newMoves[type].push([newTriplet.x, newTriplet.y, newTriplet.maxu])
    }
    console.log("Changing moves types for the", type)
    return newMoves
  }

  return (
    <div style={appStyle} className="App">
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

const appStyle = {
  minHeight: "100%",
  backgroundColor: "rgb(60, 60, 60)"
}

export default SingleplayerPlay;