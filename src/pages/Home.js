import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"

const baseUrl = "http://localhost:5000"


function Home() {
    const location = useLocation()
    async function findIfLoggedIn() {
        try {
            console.log("HOWDY")
            const response = await axios.get(`${baseUrl}/api/loggedin`)
            console.log(response.data)
            // setUserLoggedIn(response.data.loggedIn)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        findIfLoggedIn()
        const state = location.state
        console.log(state?.fromLogin, localStorage.getItem("refreshFlag"))
        if (state?.fromLogin && !localStorage.getItem("refreshFlag")) {
            console.log("boiiii")
            // window.location.reload(false)
            localStorage.setItem("refreshFlag", "true")
        } else {
            // localStorage.setItem("refreshFlag", "") // Falsy value in js
        }
    }, [])
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