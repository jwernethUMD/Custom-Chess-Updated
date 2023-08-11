import React from "react"
import "../assets/controlbar.css"


const MoveSettingsBtn = (props) => {
    return (
        <button className="cb-btn" onClick={() => {
            props.setShowSettings(!props.showing, props.type)
        }}> 
            Change move settings for the {props.type}
        </button>
    )
}

export default MoveSettingsBtn