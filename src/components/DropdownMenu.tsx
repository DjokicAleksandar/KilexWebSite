import { useEffect, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

interface DropdownMenuProps {
    onClose: () => void;
    navbarHeight: number;
}

const DropdownMenu = ({ onClose, navbarHeight }: DropdownMenuProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 10);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 500);
    }

    const handleCloseContact = () => {
        window.scrollTo(5000, 5000);
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 500);
    }

    return (
        <div className={`z-3 w-100 h-100 position-fixed top-0 start-0 dropDown ${isVisible ? "visibleDropDown" : ""}`}
            onClick={handleClose}>
            <Container className="position-fixed z-3" style={{top: `${navbarHeight}px`, left: "0", padding: "0px", width: "max-content"}}>
                <Nav className="d-flex flex-column" style={{backgroundColor: "rgba(15, 9, 4, 0.75)", width: "100%"}}>
                    <Nav.Link to={"/"} as={NavLink} onClick={handleClose}>
                        <li style={{color: "white"}} className="px-5 pt-3 pb-3 fs-5 d-flex justify-content-center align-items-center fw-medium" id="Home"> Početna </li>
                    </Nav.Link>

                    <Nav.Link to={"/"} as={NavLink} onClick={handleCloseContact}>
                        <li style={{color: "white"}} className="px-5 pt-3 pb-3 fs-5 d-flex justify-content-center align-items-center fw-medium" id="Contact"> Kontakt </li>
                    </Nav.Link>

                    <Nav.Link to={"/about"} as={NavLink} onClick={handleClose}>
                        <li style={{color: "white"}} className="px-5 pt-3 pb-3 fs-5 d-flex justify-content-center align-items-center fw-medium" id="About"> O nama </li>
                    </Nav.Link>
                </Nav>
            </Container>
        </div>
    )
}

export default DropdownMenu;