import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const Layout = () => {
    const [navbarHeight, setNavbarHeight] = useState(0);

    return (
        <>
            <Navbar setNavbarHeight={setNavbarHeight} navbarHeight={navbarHeight}/>
            <main className="d-flex justify-content-center align-items-center flex-column" style={{paddingTop: navbarHeight}}>
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
}

export default Layout;