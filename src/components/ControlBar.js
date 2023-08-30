import DrawBtn from "./DrawBtn"
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
        </>
    )
}

export default ControlBar