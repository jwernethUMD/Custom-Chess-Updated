import DrawBtn from "./DrawBtn"
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
            </div>
        </>
    )
}

export default ControlBar