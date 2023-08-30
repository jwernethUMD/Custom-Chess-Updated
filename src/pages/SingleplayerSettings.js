import { Link } from "react-router-dom"
import "../assets/settings.css"
import { useState } from "react"

let ogPieceMovements = {
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

let currKey = 0
function createInitialState() {
    for (const piece in ogPieceMovements) {
        let movements = ogPieceMovements[piece]
        for (let i = 0; i < movements.length; i++) {
            movements[i][3] = currKey++
        }
    }

    return ogPieceMovements
}

function SingleplayerSettings() {
    const [formData, setFormData] = useState({
        checkEnabled: true,
        castlingEnabled: true,
        flippingEnabled: false
    })

    // Triplet structure: unit x, unit y, max units
    const [pieceMovements, setPieceMovements] = useState(createInitialState())

    function handleCheckBoxChange(evnt) {
        const {name, checked} = evnt.target
        setFormData((prevFormData) => ({...prevFormData, [name]: checked}))
    }

    function removeTriplet(key, piece) {
        let newMovements = pieceMovements[piece].filter((movement) => key !== movement[3])
        setPieceMovements({...pieceMovements, [piece]: newMovements})
    }

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
                        {Object.entries(pieceMovements).map(([piece, value], index) => (
                            <div className="card" key={piece}>
                                <div className="card-header" id={`heading${piece}`}>
                                    <h5 className="mb-0">
                                        <button type="button" className="btn collapsed" data-bs-toggle="collapse" data-bs-target={`#collapse${piece}`} aria-expanded="true" aria-control={`collapse${piece}`}>
                                            {`${firstToUppercase(piece)} Movement Settings`}
                                        </button>
                                    </h5>
                                </div>
                                <div id={`collapse${piece}`} className="collapse" aira-labelledby="headingOne" data-bs-parent="#accordian">
                                    <div className="card-body">
                                        {value.map((movements, index) => (
                                            <div className="border rounded p-2 my-1" key={movements[3]}>
                                                <label className="m-2"> Unit x: <input type="text" value={movements[0]}/> </label> 
                                                <label className="m-2"> Unit y: <input type="text" value={movements[1]}/> </label> 
                                                <label className="m-2"> Max units: <input type="text" value={movements[2]}/> </label>  
                                                <button type="button" class="btn btn-outline-danger float-end" onClick={() => removeTriplet(movements[3], piece)}>
                                                    Delete
                                                </button>
                                            </div>
                                        ))}
                                        <button type="button" class="btn btn-outline-success mt-1">Add</button>
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