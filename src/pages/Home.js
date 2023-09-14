import { Link } from "react-router-dom"

function Home() {
    return (
        <>
            <div className="container">
                <div className="text-center mx-auto mt-5">
                    <h1>Welcome to Custom Chess!</h1>
                    <hr />
                    <div className="my-4">
                        <Link to="/multiplayer" className="btn btn-primary mx-2">Play Multiplayer</Link>
                        <Link to="/singleplayer" className="btn btn-primary mx-2">Play Singleplayer</Link>
                    </div>
                    <div className="my-4">
                        <Link to="https://jwernethumd.github.io/custom-chess/" className="btn btn-primary">Play Old Version</Link>
                    </div>
                    <div className="my-4">
                        <Link to="https://github.com/jwernethUMD/Custom-Chess-Updated" className="btn btn-primary">View Source Code</Link>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Home