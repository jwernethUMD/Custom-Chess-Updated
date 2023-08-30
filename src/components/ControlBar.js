import DrawBtn from "./DrawBtn"
import MoveSettings from "./MoveSettings"
import MoveSettingsBtn from "./MoveSettingsBtn"
import React from "react"
import { useState } from "react"

const ControlBar = (props) => {
    const [showSettings, setShowSettings] = useState({
        rook: false,
        knight: false,
        bishop: false,
        queen: false,
        king: false
    })

    const [showTutorial, setShowTutorial] = useState(false)
    
    let showTutorialClass = showTutorial ? "show" : "hide"
    let pieces = ["rook", "knight", "bishop", "queen", "king"]

    function showMoveSettings(show, type) {
        let newSettings = global.structuredClone(showSettings)
        newSettings[type] = show
        setShowSettings(newSettings)
    }
    
    return (
        <>
        <div className="control-bar">
            <DrawBtn drawGame={props.drawGame}/>
            {pieces.map((piece) => (
                <MoveSettingsBtn key={piece + "-btn"} type={piece} showing={showSettings[piece]} setShowSettings={showMoveSettings}/>
            ))}
            
            <button className="cb-btn" onClick={() => setShowTutorial(!showTutorial)}>
                Guide for customizing piece moves
            </button>
        </div>
        
        {pieces.map((piece) => (
            <MoveSettings key={piece + "-settings"} type={piece} showSettings={showSettings[piece]} 
            setShowSettings={showMoveSettings} sendTriplets={props.sendTriplets}/>
        ))}
        <div className={"piece-settings " + showTutorialClass}>
            Important note: Piece movement customizations will not work unless castling and
            check/checkmate detection are both turned off!
            <p>
                Piece movement patterns are made up of one or more triplets that contain three main 
                values in each triplet: x; this determines the unit x value, y; this determines
                the unit y value, max units; this determines how many unit xs and unit ys the piece 
                can go at most. For example, for the triplet in the rook x: 0, y: 1, max units: 8, 
                this triplet says that the rook can go in the positive y direction one at a time, 
                cannot go into the x direction in that same move, and can do that up to 8 times in 
                one move. So, it says the rook can move in the positive y direction. If it was instead
                x: 0, y: 2, max units: 4, the rook could only move upwards in multiples of 2, and
                could jump over every other piece. Essentially, each triplet is an option that the 
                piece has when moving.
            </p>
            <button onClick={() => setShowTutorial(false)}>Close</button>
        </div>
        </>
    )
}

export default ControlBar