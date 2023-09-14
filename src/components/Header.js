import axios from "axios"
import React, { useEffect, useState } from "react"
import { BackendURL } from "../GlobalConstants"
import { NavLink } from "react-router-dom"

const baseUrl = BackendURL//"http://localhost:5000"//"https://custom-chess.onrender.com"

function Header() {
    const [userLoggedIn, setUserLoggedIn] = useState(true)
    async function findIfLoggedIn() {
        try {
            const response = await axios.get(`${baseUrl}/api/loggedin`)
            setUserLoggedIn(response.data.loggedIn)
        } catch (error) {
            console.error(error)
        }
    }
    
    useEffect(() => {
        findIfLoggedIn()
    }, [])
    return (
        <>
            <div className="navbar navbar-expand-sm navbar-dark bg-dark px-2">
                <a className="navbar-brand" href="/">
                    <img className="d-inline-block align-top" height="30" src={`${process.env.PUBLIC_URL}/piece-images/white-king.png`} alt="king icon" />
                    Custom Chess
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#ccNavbar" aria-controls="ccNavbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="ccNavbar">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink activeclassname="active" className="nav-link" to="/" >Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeclassname="active" className="nav-link" to="/singleplayer">Singleplayer</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeclassname="active" className="nav-link" to="/multiplayer">Multiplayer</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeclassname="active" className="nav-link" to="/guide">Guide</NavLink>
                    </li>
                    </ul>
                    <ul className="navbar-nav ms-auto me-2">
                        {userLoggedIn ? (
                            <>
                                <NavLink activeclassname="active" className="nav-link" to="/profile">Profile</NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink activeclassname="active" className="nav-link" to="/signup">Sign Up</NavLink>
                                <NavLink activeclassname="active" className="nav-link" to="/login">Log In</NavLink>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Header