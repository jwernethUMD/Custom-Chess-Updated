import React, { useState } from "react"

const Piece = (props) => {
    console.log(process.env.PUBLIC_URL)
    const [positionX, setPositionX] = useState(props.posX)
    const [positionY, setPositionY] = useState(props.posY)
    const [background, setBackground] = useState("rgba(27, 143, 166, 0)")

    // console.log("Hi this is", props.id, "located at", positionX, positionY, "or", props.posX, props.posY)
    function highlightPiece(isSelected) {
        if (isSelected) {
            setBackground("rgba(27, 143, 166, 1)")
        } else {
            setBackground("rgba(27, 143, 166, 0)")
        }
    }
    props.addSetter(props.id, setPositionX, setPositionY)
    let posY = (Math.abs(props.boardFlip - parseInt(positionY))).toString()
    let posX = (Math.abs(props.boardFlip - parseInt(positionX))).toString()

    return (
        <img src={`${process.env.PUBLIC_URL}/${props.img}`} alt={props.id} 
            onClick={() => props.selectPiece(props.id, positionX, positionY, props.color, props.type, 
                highlightPiece)} 
            style={{
                transform: "translate(" + posX + "%," + posY + "%)",
                //filter: "brightness(" + props.color === "white" ? "100%)" : "20%)",
                position: "absolute",
                width: props.sizeX,
                height: props.sizeY,
                backgroundColor: background
        }} />
    )
}





export default Piece