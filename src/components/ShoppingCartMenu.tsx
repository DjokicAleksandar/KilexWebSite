import { Button, Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { formatPrice } from "../utilities/formatPrice";
import productData from "../data/products.json";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "../hooks/useIsMobile";

type ShoppingCartMenuProps = {
    isOpen: boolean
}

export function ShoppingCartMenu({isOpen} : ShoppingCartMenuProps) {
    const {closeCart, cartItems} = useShoppingCart();
    const navigate = useNavigate();

    const isMobile = useIsMobile();

    function handleFinishPurchase() {
        navigate("/cart");
        closeCart();
    }

    return (

        <Offcanvas show={isOpen} onHide={closeCart} placement="end" 
            style={{width: isMobile ? "85%" : "400px",
                maxWidth: "800px"}}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Vaša korpa</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="d-flex flex-column gap-3 justify-content-between" style={{overflow: "hidden"}}>
                <Stack gap={3} className="w-100" style={{maxHeight: "60vh", overflowY: "auto"}}>
                    {cartItems.length == 0 && <h1 style={{textAlign: "center"}}>Vaša korpa je prazna :(</h1>}

                    {cartItems.map(item => {
                        return <CartItem key={item.id} {...item} variant="home"/>
                    })}
                    
                </Stack>

                <div className="d-flex flex-column gap-3">
                    <div className="ms-auto fw-normal fs-5 pt-2 pb-2 w-100 d-flex justify-content-center"
                        style={{borderTop: "1px solid black", borderBottom: "1px solid black"}}>
                        Ukupno: {formatPrice(cartItems.reduce((total: number, cartItem) => {
                            const item = productData.find(i => i.id === cartItem.id);
                            return total + (item?.discount ? item.price * (1 - item.discount / 100) : item?.price || 0) * cartItem.quantity;
                        }, 0))}
                    </div>

                    <div className="w-100 d-flex flex-column gap-3">
                        {<Button variant="outline-none" className="fs-4 pt-2 pb-2 px-4 w-100" 
                            style={{backgroundColor: "#0f0904", color: "#FFF", cursor: "pointer"}}
                            onClick={handleFinishPurchase}
                            disabled={cartItems.length > 0 ? false : true}> Završi kupovinu </Button>}

                        <Button variant="outline-none" className="fs-4 pt-2 pb-2 px-4 w-100"
                            style={{backgroundColor: "#dab684", color: "#FFF", cursor: "pointer"}}
                            onClick={closeCart}> Nastavi kupovinu </Button>
                    </div>
                </div>
                
            </Offcanvas.Body>
        </Offcanvas>
    )
}