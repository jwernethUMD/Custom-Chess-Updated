import "../assets/WinAnnouncement.css"
import React from "react"

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

const WinAnnouncement = (props) => {
    let txt = ""
    if (props.color === "draw") {
        txt = "Game drawn!"
    } else {
        txt = capitalizeFirst(props.color) + " wins!"
    }

    let secondClass = props.showWin ? "show" : "hide"
    return (
        <div className={"win-announcement " + secondClass}>
            <p>{txt}</p>
            <button className="btn btn-primary" onClick={props.reset}>Restart</button>
        </div>
    )
}



export default WinAnnouncement