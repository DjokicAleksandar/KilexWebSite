import { useEffect, useState } from "react";
import logo from "../../public/images/logoTransparent.png";
import { useIsMobile } from "../hooks/useIsMobile";
import { useNavigate } from "react-router-dom";

interface PopupProps {
    type: "loading" | "error" | "success" | "idle";
}

const Popup = ({type}: PopupProps) => {
    const isMobile = useIsMobile();
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (type !== "idle") {
            const timeout = setTimeout(() => setIsVisible(true), 10);

            if (type === "success") {
                const navigateTimeout = setTimeout(() => {
                    navigate("/");
                }, 2000);
    
                return () => clearTimeout(navigateTimeout);
            }

            return () => clearTimeout(timeout);
        } else {
            setIsVisible(false);
        }
    }, [type])

    return (
        <div className="position-fixed top-0 p-0"
            style={{height: "100vh", width: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: "10"}}>

            <div className={`position-fixed bg-white shadow-lg rounded-xl z-50 top-50 start-50 translate-middle item ${isVisible ? "visibleItem" : ""}`}>
                <div className="w-100 p-2 d-flex justify-content-center align-items-center" style={{backgroundColor: "black"}}>
                    <img src={logo} width={isMobile ? "40px" : "50px"} height={isMobile ? "40px" : "50px"}/>
                </div>

                {type === "loading" && 
                    <div className="p-4">
                        <div className="loader"></div>
                        <h4 style={{whiteSpace: "nowrap"}}> Vaša porudžbina se obrađuje. </h4>
                        <h4> Molimo sačekajte. </h4>
                    </div>}
                {type === "error" && 
                    <div className="p-4">
                        <h4 style={{whiteSpace: "nowrap"}}> Greška pri slanju mejla... </h4>
                        <h4> Pokušajte kasnije </h4>
                    </div>}
                {type === "success" && 
                    <div className="p-4">
                        <h4> Porudžbina uspešno poslata </h4>
                        <h4> Proverite email! </h4>
                    </div>}
            </div>

        </div>
    )
}

export default Popup;