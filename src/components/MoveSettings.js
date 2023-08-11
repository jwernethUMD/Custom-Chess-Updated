import React, { useState } from "react"
import "../assets/controlbar.css"

let key = 0
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

function createInitialState(type) {
    let initialState = []
    let movements = pieceMovements[type]
    for (let i = 0; i < movements.length; i++) {
        initialState.push({
            id: key++,
            x: movements[i][0],
            y: movements[i][1],
            maxu: movements[i][2]
        })
    }

    return initialState
}

const MoveSettings = (props) => {
    const [triplets, setTriplets] = useState(createInitialState(props.type))
    let secondClass = props.showSettings ? "show" : "hide"
    return (
        <>
            <div className={"piece-settings " + secondClass}>
                {triplets.map((triplet) => (
                    <div className="setting-triplet" key={triplet.id}>
                        <div>Unit x:<input type="number" className="setting-input" 
                            min="-8" max="8" value={triplet.x} 
                            onChange={(e) => setTriplets(triplets.map((t) => {
                                if (t.id === triplet.id) {
                                    let newX = e.target.value === undefined ? undefined : parseInt(e.target.value)
                                    return {id: t.id, x: newX, y: t.y, maxu: t.maxu}
                                } else{
                                    return t
                                }
                            }))}></input></div>
                        <div>Unit y:<input type="number" className="setting-input"
                            min="-8" max="8" value={triplet.y} 
                            onChange={(e) => setTriplets(triplets.map((t) => {
                                if (t.id === triplet.id) {
                                    let newY = e.target.value === undefined ? undefined : parseInt(e.target.value)
                                    return {id: t.id, x: t.x, y: newY, maxu: t.maxu}
                                } else{
                                    return t
                                }
                            }))}></input></div>
                        <div>Max units:<input type="number" className="setting-input"
                            min="0" max="8" value={triplet.maxu} 
                            onChange={(e) => setTriplets(triplets.map((t) => {
                                if (t.id === triplet.id) {
                                    let newMaxu = e.target.value === undefined ? undefined : parseInt(e.target.value)
                                    return {id: t.id, x: t.x, y: t.y, maxu: newMaxu}
                                } else{
                                    return t
                                }
                            }))}></input></div>
                        <div onClick={() => setTriplets(triplets.filter((t) => triplet.id !== t.id))}
                            className="delete-btn">&#10006;</div>
                    </div>
                ))}
                <div className="add-btn" onClick={() => setTriplets([...triplets, {id: key++, x: 0, 
                y: 0, maxu: 0}])}>&#10010;</div>
                <button className="cb-btn" onClick={() => {
                    props.setShowSettings(false, props.type)
                    props.sendTriplets(triplets, props.type)
                }}>Save</button>
            </div>
        </>
    )
}

export default MoveSettings