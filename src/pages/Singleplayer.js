import { useState } from "react";
import React from "react";
import Board from "../components/Board";
import WinAnnouncement from "../components/WinAnnouncement"
import ControlBar from "../components/ControlBar"

let oRestart

// Default piece movements
let pieceMovements = {
  rook: [[1, 0, 8], [-1, 0, 8], [0, 1, 8], [0, -1, 8]],
  bishop: [[1, 1, 8], [-1, -1, 8], [1, -1, 8], [-1, 1, 8]],
  knight: [[1, 2, 1], [-1, 2, 1], [1, -2, 1], [-1, -2, 1], 
  [2, 1, 1], [2, -1, 1], [-2, 1, 1], [-2, -1, 1]],
  king: [[1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1], 
  [1, 1, 1], [-1, -1, 1], [1, -1, 1], [-1, 1, 1]],
  queen: [[1, 0, 8], [-1, 0, 8], [0, 1, 8], [0, -1, 8], 
  [1, 1, 8], [-1, -1, 8], [1, -1, 8], [-1, 1, 8]]
}

function Singleplayer() {
  const [showWin, setShowWin] = useState(false)
  const [color, setColor] = useState("None")
  const [gameDrawn, setGameDrawn] = useState(false)
  const [checkEnabled, setCheckEnabled] = useState(true)
  const [castlingEnabled, setCastlingEnabled] = useState(true)
  const [flippingEnabled, setFlippingEnabled] = useState(false)
  const [moveTypes, setMoveTypes] = useState(pieceMovements)
  
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

  function changeCastling(castlingEnabled) {
    setCastlingEnabled(castlingEnabled)
  }

  function changeChecks(checksEnabled) {
    setCheckEnabled(checksEnabled)
  }

  function changeFlipping(flipsEnabled) {
    setFlippingEnabled(flipsEnabled)
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

  function tripletsReceived(triplets, type) {
    setMoveTypes(changeMoveTypes(triplets, type))
  }

  return (
    <div style={appStyle} className="App">
      <Board matchEnded={matchEnded} gameDrawn={gameDrawn} checkEnabled={checkEnabled}
      castlingEnabled={castlingEnabled} flippingEnabled={flippingEnabled} moveTypes={moveTypes}/>
      <WinAnnouncement showWin={showWin} color={color} reset={reset}/>
      <ControlBar drawGame={drawGame} changeCastling={changeCastling} changeChecks={changeChecks}
      changeFlipping={changeFlipping} checkEnabled={checkEnabled} castlingEnabled={castlingEnabled}
      flippingEnabled={flippingEnabled} sendTriplets={tripletsReceived}/>
    </div>
  );
}

const appStyle = {
  minHeight: "100%",
  backgroundColor: "rgb(60, 60, 60)"
}

export default Singleplayer;
