import { useEffect, useState } from "react";
import logo from "../../public/images/logoTransparent.png";
import { useIsMobile } from "../hooks/useIsMobile";

interface PopupProps {
    type: "loading" | "error" | "success" | "idle";
}

const Popup = ({type}: PopupProps) => {
    const isMobile = useIsMobile();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (type !== "idle") {
            const timeout = setTimeout(() => setIsVisible(true), 10);

            if (type === "success") {
                const navigateTimeout = setTimeout(() => {
                    window.location.href = "/";
                }, 4000);
    
                return () => clearTimeout(navigateTimeout);
            }

            return () => clearTimeout(timeout);
        } else {
            setIsVisible(false);
        }
    }, [type])

    const handleBackgroundClick = () => {
        if (type === "success") {
            setIsVisible(false);
            window.location.href = "/";
        } else if (type === "error") {
            setIsVisible(false);
        } else return;
    }

    return (
        <div className="position-fixed top-0 px-2"
            onClick={handleBackgroundClick}
            style={{height: "100vh", width: "100%", backgroundColor: "transparent", zIndex: "10"}}>

            <div className={`position-fixed bg-white shadow-lg rounded-xl d-flex justify-content-center align-items-center flex-column 
                z-50 top-50 start-50 translate-middle item ${isVisible ? "visibleItem" : ""} ${isMobile ? "w-75" : ""}`}
                style={{boxShadow:" rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.6) 0px 2px 4px -1px"}}>

                <div className="w-100 p-2 d-flex justify-content-center align-items-center" style={{backgroundColor: "#0f0904"}}>
                    <img src={logo} width={isMobile ? "45px" : "55px"} height={isMobile ? "45px" : "55px"}/>
                </div>

                {type === "loading" && 
                    <div className="p-3 d-flex justify-content-center align-items-center flex-column">
                        <h4 style={{fontWeight: "300", textAlign: "center"}}> Vaša porudžbina se obrađuje. </h4>
                        <h4 style={{fontWeight: "300", textAlign: "center"}}> Molimo sačekajte. </h4>
                    </div>}
                {type === "error" && 
                    <div className="p-3 d-flex justify-content-center align-items-center flex-column">
                        <h4 style={{fontWeight: "300"}}> Greška pri slanju mejla... </h4>
                        <h4 style={{fontWeight: "300"}}> Pokušajte kasnije </h4>
                        <button 
                            onClick={() => setIsVisible(false)}
                            style={{fontSize: "1rem", 
                            backgroundColor: "#0f0904", 
                            borderRadius: "4px", 
                            color: "white",
                            width: "max-content",
                            padding: "5px 15px 5px 15px",
                            marginTop: "10px",
                            marginBottom: "10px"}}> Zatvori </button>
                    </div>}
                {type === "success" && 
                    <div className="p-3 d-flex justify-content-center align-items-center flex-column">
                        <h3 style={{fontWeight: "300", textAlign: "center"}}> Hvala na ukazanom poverenju! </h3>
                        <h4 style={{fontWeight: "300", textAlign: "center"}}> Vaša narudžbina je uspešno poslata, proverite email! </h4>
                        <button 
                            onClick={() => {
                                setIsVisible(false)
                                window.location.href = "/";
                            }}
                            style={{fontSize: "1rem", 
                            backgroundColor: "#0f0904", 
                            borderRadius: "4px", 
                            color: "white",
                            width: "max-content",
                            padding: "5px 15px 5px 15px",
                            marginTop: "10px",
                            marginBottom: "10px"}}> Zatvori </button>
                    </div>}
            </div>

        </div>
    )
}

export default Popup;