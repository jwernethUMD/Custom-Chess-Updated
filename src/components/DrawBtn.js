import "../assets/controlbar.css"
import React from "react"

const DrawBtn = (props) => {
    return (
        <div className="draw">
            Click here only if both players agree to draw!
            <br/>
            <button className="btn btn-primary m-2" onClick={props.drawGame}> Draw </button>
        </div>
    )
}

export default DrawBtn