import logoTransparent from "../../public/images/logoTransparent.png";
import whatsapp from "../../public/images/whatsapp.png";
import instagram from "../../public/images/instagram.png";
import email from "../../public/images/email.png";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="w-100 bg-black mt-12 d-flex flex-column justify-content-space-around align-items-center gap-5 position-relative" 
            style={{left: "0",
                    bottom: "0",
                    padding: window.innerWidth < 768 ? "12px" : "20px"
                }}>

            <div className="d-flex justify-content-between align-items-center gap-5 pb-2 pr-2 pl-2 z-1" 
                style={{borderBottom: "1px solid #dab684", width: "90%"}}>
                <div className="d-flex flex-column gap-2 justify-content-center">
                    <img src={logoTransparent} height="80px"/> 
                </div>

                <div className="d-flex"> 
                    <div className="d-flex p-1 align-items-center"> 
                        <a href="https://wa.me/381621767144" className="d-flex align-items-center justify-content-center text-decoration-none">
                            <img src={whatsapp} width="40px" height="40px"/>
                        </a>
                    </div>
                    <div className="d-flex p-1 align-items-center">
                        <a href="https://www.instagram.com/kileeeex/" className="d-flex align-items-center justify-content-center text-decoration-none">
                            <img src={instagram} width="40px" height="40px"/>
                        </a>
                    </div>
                    <div className="d-flex p-1 align-items-center">
                        <a href="mailto:kilexxx0@gmail.com" className="d-flex align-items-center justify-content-center text-decoration-none">
                            <img src={email} width="40px" height="40px"/>
                        </a>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-between z-1" style={{width: "90%"}}>
                <div>
                    <h4 className="mb-2 fw-normal" style={{color: "#dab684", whiteSpace: "nowrap"}}> Uslovi korišćenja </h4>
                    <div className="d-flex gap-1 flex-column">
                        <div className="fw-normal"> <Link style={{color: "gray"}} className="text-decoration-none" to={"/PrivacyPolicy"}>  Politika privatnosti </Link> </div>
                        <div className="fw-normal"> <Link style={{color: "gray"}} className="text-decoration-none" to={"/TermsOfService"}>  Uslovi korišćenja </Link> </div>
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <h4 className="mb-2 fw-normal" style={{color: "#dab684"}}> TR Kilex </h4>
                    <div className="d-flex gap-1 flex-column">
                        <h4 className="fw-normal fs-6 text" style={{color: "gray"}}> © 2024 Kilex. <br/> 
                        <span style={{whiteSpace: "nowrap", color: "gray"}}> Sva prava zadržana. </span> </h4>
                    </div>
                </div>
            </div>

            <div className="position-absolute top-50 start-50 translate-middle z-0"
                style={{height: "70%", 
                    aspectRatio: "1 / 1", 
                    backgroundImage: `url(${logoTransparent})`, 
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    objectFit: "cover",
                    opacity: "0.1"}}>
            </div>

        </div>
    )
}

export default Footer;