import Home from "../pages/Home";
import Singleplayer from "../pages/Singleplayer"
import SingleplayerPlay from "../pages/SingleplayerPlay";
import GameSettings from "../pages/GameSettings";
import Multiplayer from "../pages/Multiplayer";
import MultiplayerPlay from "../pages/MultiplayerPlay";
import MultiplayerChoose from "../pages/MultiplayerChoose";
import Guide from "../pages/Guide";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Header from "./Header"
import Signup from "../pages/Signup";
import Login from "../pages/login";


function Router() {
    const Layout = () => {
        return (
            <>
                <Header />
                <Outlet />
            </>
        )
    }

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element = {<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/singleplayer" element={<Singleplayer/> }>
                            <Route index element={<GameSettings gameType="singleplayer"/>} />
                            <Route path="play" element={<SingleplayerPlay />} />
                        </Route>
                        <Route path="/multiplayer" element={<Multiplayer />}>
                            <Route index element={<MultiplayerChoose />} />
                            <Route path="settings" element={<GameSettings gameType="multiplayer"/>} />
                            <Route path="play" element={<MultiplayerPlay />} />
                        </Route>
                        <Route path="/signup" element={<Signup />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/guide" element={<Guide />}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router