import { Link } from "react-router-dom"

function MultiplayerChoose() {
    return (
        <>
            <div className="text-center" style={{
                height: "90%"
            }}>
                <Link to="" className="btn btn-primary align-middle" style={{
                    marginTop: "35vh"
                }}>Join game with code</Link><br />
                <Link to="settings" className="btn btn-primary align-middle" style={{
                    marginTop: "2rem"
                }}>Create game</Link>
            </div>
        </>
    )
}

export default MultiplayerChoose