import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
const baseUrl = "https://custom-chess.onrender.com"

function Profile() {
    const [username, setUsername] = useState("")
    const [wins, setWins] = useState(0)
    const [losses, setLosses] = useState(0)
    const [draws, setDraws] = useState(0)

    const navigate = useNavigate()

    async function setUserStats() {
        try {
            const response = await axios.get(`${baseUrl}/api/userstats`)

            const data = response.data

            setUsername(data.username)
            setWins(data.wins)
            setLosses(data.losses)
            setDraws(data.draws)
        } catch (error) {
            console.error(error)
        }
    }

    async function logout() {
        try {
            await axios.get(`${baseUrl}/api/logout`)
            navigate("/", {state: {
                fromLogin: true
            }})
            window.location.reload(false)
        } catch (error) {
            console.error(error)
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
                <button className="btn btn-danger mt-5" onClick={logout}>Log out</button>
            </div>
        </>
    )
}

export default Profile