import { io } from "socket.io-client"

function Home() {
    // const socket = io("http://localhost:5000")

    return (
        <>
            <div className="container">
                <div className="text-center mx-auto mt-5">
                    <h1>Welcome to Custom Chess!</h1>
                    <a href="/singleplayer">Click here to play</a>
                </div>
            </div>
        </>
    )

}

export default Home