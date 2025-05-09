import { useIsMobile } from "../hooks/useIsMobile"

const WelcomeHeader = () => {
    const isMobile = useIsMobile();

    return (
        <div className="w-100 d-flex justify-content-center align-items-center mt-3" style={{gap: "10px"}}>
            <div style={{width: "30%", height: "2px", backgroundColor: "#dab684"}}></div>
            <h2 className="d-flex justify-content-center align-items-center"
                style={{fontSize: isMobile ? "25px" : "52px", whiteSpace: isMobile ? "unset" : "nowrap", fontWeight: "500", textAlign: "center"}}
                >Gde se kvalitet i lepota susreću</h2>
            <div style={{width: "30%", height: "2px", backgroundColor: "#dab684"}}></div>
        </div>
    )
}

export default WelcomeHeader