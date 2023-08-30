import DrawBtn from "./DrawBtn"
import React from "react"

const ControlBar = (props) => {
    return (
        <>
            <div className="control-bar">
                <DrawBtn drawGame={props.drawGame}/>
            </div>
        </>
    )
}

export default ControlBar