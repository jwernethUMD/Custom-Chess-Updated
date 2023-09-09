import { useState } from "react"
import axios from "axios"

const baseUrl = "http://localhost:5000"
function Signup() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    async function signUp() {
        try {
            const response = await axios.post(`${baseUrl}/api/signup`, {
                username: username,
                password: password
            })
            
            console.log(response.data)
        } catch (error) {
            console.error(error)
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
                    <h1 className="mb-3">Sign Up</h1>
                    <hr />
                    <form>
                        <input type="text" placeholder="Username" className="p-1 my-3" value={username} onChange={(event) => setUsername(event.target.value)}></input>
                        <input type="password" placeholder="Password" className="p-1 my-3" value={password} onChange={(event) => setPassword(event.target.value)}></input>
                        <button type="button" className="btn btn-primary my-3" onClick={signUp}>Sign Up</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup