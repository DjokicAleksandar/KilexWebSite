import menu from '../../public/images/menu1.png';
import logoTransparent from '../../public/images/logoTransparent.png';
import cart from '../../public/images/cart1.png';
import back from "../../public/images/backarrow.png";
import DropdownMenu from './DropdownMenu';
import { Button, Container, Navbar as NavbarBs } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { useIsMobile } from '../hooks/useIsMobile';

interface NavbarProps {
    setNavbarHeight: (height: number) => void;
    navbarHeight: number;
}

const Navbar = ( {setNavbarHeight, navbarHeight}: NavbarProps ) => {
    const navRef = useRef<HTMLElement | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const isMobile = useIsMobile();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isHomePage = location.pathname === "/";

    const { openCart, cartQuantity } = useShoppingCart();

    const toggleMenu = () => {
        setIsMenuOpen(prev => {
            return !prev;
        })
    }

    const updateNavbarHeight = () => {
        if (navRef.current) {
            const height = navRef.current.offsetHeight;
            setNavbarHeight(height);
        }
    }

    const handleBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        updateNavbarHeight();

        window.addEventListener("resize", updateNavbarHeight)

        return () => {
            window.removeEventListener("resize", updateNavbarHeight);
        }
    })
    
    return (
        <>
            <NavbarBs ref={navRef} expand={false} className="d-flex flex-row position-fixed w-100 z-3 p-2" style={{backgroundColor: "#0f0904"}}>
                <Container className="w100" style={{paddingLeft: "0px", paddingRight: "0px"}}>
                    <div onClick={toggleMenu} style={{cursor: "pointer", transition: "0.3s", transform: isMenuOpen ? "rotateZ(90deg)" : "rotateZ(0deg)"}}> 
                        <img src={menu} width="30px" height="30px"/> 
                    </div>

                    <div> <img src={logoTransparent} width={ isMobile ? "40px" : "70px"} height={ isMobile ? "40px" : "55px"}/> </div>

                    {isHomePage ?
                        <Button 
                            onClick={openCart}
                            variant="outline-none" 
                            style={{padding: "0px"}} 
                            className="d-flex justify-content-center align-items-center position-relative"> 
                            <img src={cart} width="30px" height="30px"/> 
                            <div className="position-absolute d-flex justify-content-center align-items-center bg-danger rounded-circle fs-6" 
                                style={{width: isMobile ? "0.9rem" : "1.1rem", height: isMobile ? "0.9rem" : "1.1rem", top: "0", right: "-4px", color: "white"}}> {cartQuantity}
                            </div> 
                        </Button> :
                        <Button
                            onClick={handleBack}
                            variant="outline-none" 
                            style={{padding: "0px"}} 
                            className="d-flex justify-content-center align-items-center position-relative"> 
                            <img src={back} width="35px" height="35px"/>
                        </Button>
                    }

                </Container>
            </NavbarBs>

            {isMenuOpen && <DropdownMenu onClose={() => setIsMenuOpen(false)} navbarHeight={navbarHeight}/>}
        </>
    )
}

export default Navbar;