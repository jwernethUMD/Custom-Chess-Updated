import Home from "../pages/Home";
import Singleplayer from "../pages/Singleplayer"
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
                        <Route path="/singleplayer" element={<Singleplayer/> } />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router