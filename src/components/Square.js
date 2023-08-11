import "../assets/Square.css"
import React from "react"

const Square = (props) => {
    let posX = (Math.abs(props.boardFlip - parseInt(props.posX))).toString()
    let posY = (Math.abs(props.boardFlip - parseInt(props.posY))).toString()
    return (
        <div className={props.color + " square"} onClick={() => props.selectSquare(posX, posY)} style={{
            width: props.width.toString(),
            height: props.height.toString(),
            transform: "translate(" + props.posX + "%," + props.posY + "%)",
            position: "absolute",
        }}></div>
    )
}

export default Square