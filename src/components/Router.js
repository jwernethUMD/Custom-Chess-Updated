import Home from "../pages/Home";
import Singleplayer from "../pages/Singleplayer"
import SingleplayerPlay from "../pages/SingleplayerPlay";
import SingleplayerSettings from "../pages/SingleplayerSettings";
import Guide from "../pages/Guide";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Header from "./Header"

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
                            <Route index element={<SingleplayerSettings />} />
                            <Route path="play" element={<SingleplayerPlay />} />
                        </Route>
                        <Route path="/guide" element={<Guide />}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router