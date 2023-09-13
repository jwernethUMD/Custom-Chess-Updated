import axios from "axios"
import { useEffect, useState } from "react"
const baseUrl = "http://localhost:5000"

function Profile() {
    const [username, setUsername] = useState("")
    const [wins, setWins] = useState(0)
    const [losses, setLosses] = useState(0)
    const [draws, setDraws] = useState(0)

    async function setUserStats() {
        try {
            const response = await axios.get(`${baseUrl}/api/userstats`)

            const data = response.data
            console.log(data)
            setUsername(data.username)
            setWins(data.wins)
            setLosses(data.losses)
            setDraws(data.draws)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setUserStats()
    }, [])

    return (
        <>
            <div className="container mt-5 text-light rounded p-4" style={{fontSize: "2rem", backgroundColor: "rgb(60, 60, 60)"}}>
                <div className="mb-3">
                    <h1 style={{fontSize: "3rem"}}>{username}</h1>
                </div>
                <hr />
                <div>
                    <b>Wins:</b> {wins}<br/>
                    <b>Losses:</b> {losses}<br/>
                    <b>Draws:</b> {draws}<br/>
                </div>
            </div>
        </>
    )
}

export default Profile