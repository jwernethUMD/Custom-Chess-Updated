import { Link } from "react-router-dom"
import "../assets/settings.css"
import { useState } from "react"

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

function firstToUppercase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function SingleplayerSettings() {
    const [formData, setFormData] = useState({
        checkEnabled: true,
        castlingEnabled: true,
        flippingEnabled: false
    })

    function handleCheckBoxChange(evnt) {
        const {name, checked} = evnt.target
        setFormData((prevFormData) => ({...prevFormData, [name]: checked}))
    }

    console.log(formData)
    return (
        <>
            <div className="container mt-5">
                <h2 className="mb-4">Game Settings</h2>
                <form>
                    <div className="form-group form-check">
                        <label className="form-check-label">
                            <input className="form-check-input" type="checkbox" name="checkEnabled" checked={formData["checkEnabled"]} onChange={handleCheckBoxChange}/>
                            Check/Checkmate detection
                        </label>
                    </div>
                    <div className="form-group form-check">
                        <label className="form-check-label">
                            <input className="form-check-input" type="checkbox" name="castlingEnabled" checked={formData["castlingEnabled"]} onChange={handleCheckBoxChange}/>
                            Castling
                        </label>
                    </div>
                    <div className="form-group form-check">
                        <label className="form-check-label">
                            <input className="form-check-input" type="checkbox" name="flippingEnabled" checked={formData["flippingEnabled"]} onChange={handleCheckBoxChange}/>
                            Board flipping each turn
                        </label>
                    </div>
                    <div className="form-group">
                        <a href=".">Guide for customizing moves</a><br/>
                    </div>
                    <div className="form-group" id="accordion">
                        {Object.entries(pieceMovements).map(([key, value], index) => (
                            <div className="card">
                                <div className="card-header" id={`heading${key}`}>
                                    <h5 className="mb-0">
                                        <button type="button" className="btn collapsed" data-bs-toggle="collapse" data-bs-target={`#collapse${key}`} aria-expanded="true" aria-control={`collapse${key}`}>
                                            {`${firstToUppercase(key)} Movement Settings`}
                                        </button>
                                    </h5>
                                </div>
                                <div id={`collapse${key}`} className="collapse" aira-labelledby="headingOne" data-bs-parent="#accordian">
                                    <div className="card-body">
                                        {value.map((movements, index) => (
                                            <div className="border rounded p-2 my-1">
                                                <label className="m-2"> Unit x: <input type="text" value={movements[0]}/> </label> 
                                                <label className="m-2"> Unit y: <input type="text" value={movements[1]}/> </label> 
                                                <label className="m-2"> Max units: <input type="text" value={movements[2]}/> </label>  
                                                <button type="button" class="btn btn-outline-danger float-end" fdprocessedid="dlbjoq">
                                                    Delete
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link className="btn btn-primary my-4" to="/singleplayer/play" state={formData}>Start Game</Link>
                </form>
            </div>
        </>
    )
}

export default SingleplayerSettings