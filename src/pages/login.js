import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const baseUrl = "http://localhost:5000"
function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errMessage, setErrMessage] = useState("")
    const navigate = useNavigate()

    async function logIn() {
        try {
            const response = await axios.post(`${baseUrl}/api/login`, {
                username: username,
                password: password
            })
            
            const {isValid, errMessage} = response.data

            if (isValid) {
                navigate("/", {state: {
                    fromLogin: true
                }})
                window.location.reload(false)
            } else {
                setErrMessage(errMessage)
            }
        } catch (error) {
            console.error("Error: ", error)
        }
    }

    return (
        <>
            <div className="w-100 h-100 text-center" style={{
                backgroundColor: "rgb(60, 60, 60)"
            }}>
                <div className="bg-light rounded align-middle mx-auto p-4" style={{
                    position: "relative",
                    top: "8rem",
                    width: "18rem"
                }}>
                    <h1 className="mb-3">Log In</h1>
                    <hr />
                    <form>
                        <input type="text" placeholder="Username" className="p-1 my-3" value={username} onChange={(event) => setUsername(event.target.value)}></input>
                        <input type="password" placeholder="Password" className="p-1 my-3" value={password} onChange={(event) => setPassword(event.target.value)}></input>
                        <button type="button" className="btn btn-primary my-3" onClick={logIn}>Log In</button>
                        {(errMessage !== "") ? (
                            <>
                                <div className="text-danger">{errMessage}</div>
                            </>
                        ) : ""}
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login