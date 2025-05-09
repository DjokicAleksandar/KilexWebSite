import { Button, Card } from "react-bootstrap"; 
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useEffect } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import { formatPrice } from "../utilities/formatPrice";

type ProductProps = {
    id: number
    name: string
    price: number
    image: string
    available: number
    discount: number
    onOpenSlider: (id: number) => void
}

const Product = ({ id, name, price, image, available, discount, onOpenSlider} : ProductProps) => {
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();
    let quantity = getItemQuantity(id);
    const { openCart } = useShoppingCart();
    const isMobile = useIsMobile();

    useEffect(() => {
        const handleScroll = () => {
            const items = document.querySelectorAll(".item");
    
            items.forEach(item => {
                const box = item.getBoundingClientRect();
                if (box.top <= window.innerHeight) {
                    item.classList.add("visibleItem");
                } else {
                    item.classList.remove("visibleItem");
                }
            });
        };
    
        const timeout = setTimeout(() => {
          handleScroll(); // pokreni jednom odmah
          window.addEventListener("scroll", handleScroll);
        }, 500);
    
        return () => {
          clearTimeout(timeout);
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);

    return (
        <>
            <Card className="item" style={{border: "none"}}>

                <Card.Img variant="top" 
                    src={image} 
                    style={{objectFit: "cover", cursor: "pointer", width: "100%"}}
                    onClick={() => onOpenSlider(id)}/> 

                <Card.Body className="d-flex flex-column justify-content-center align-items-center mb-2" style={{padding: "0px"}}>
                    
                    {discount ?
                        <div className="position-absolute top-0 start-0"
                            style={{backgroundColor: "rgb(247, 43, 43)", 
                                color: "white",
                                padding: "5px 10px",
                                fontSize: "1.3rem",
                                borderTopLeftRadius: "5px",
                                borderBottomRightRadius: "5px"}}>
                            -{discount}%
                        </div>
                        :
                        null
                    }

                    <Card.Text className="d-flex justify-content-center align-items-center text-muted"
                        style={{margin: "0px"}}> Trepavice </Card.Text>
                    <Card.Title className="d-flex flex-column justify-content-center align-items-center gap-2"> 
                        <span> {name} </span>
                        <span>
                            { 
                                discount? 
                                    <span>
                                        <span className="fs-3"> {formatPrice(price - ((discount / 100) * price))} </span>
                                        <span className="danger" 
                                            style={{textDecoration: "line-through", color: "rgb(247, 43, 43)"}}> 
                                            {formatPrice(price)} 
                                        </span> 
                                    </span>
                                    : 
                                    <span className="fs-3"> {formatPrice(price)} </span>
                            } 
                        </span> 
                    </Card.Title>

                    {/* add to cart button  */}
                    <div>
                        {quantity === 0 ? (
                            <Button 
                                onClick={() => {
                                    increaseCartQuantity(id);
                                    openCart();
                                }}
                                style={{width: "max-content", color: "white"}} 
                                className="bg-black mt-1" 
                                disabled={available? false : true}
                                variant="outline-none"> DODAJ U KORPU 
                            </Button>
                        ) : <div className="d-flex justify-content-center align-items-center flex-column" style={{gap: "0.5rem"}}> 
                                <div className="d-flex justify-content-center align-items-center" style={{gap: "0.5rem"}}> 
                                    <Button 
                                        style={{width: isMobile ? "30px" : "40px", height: isMobile ? "30px" : "40px", backgroundColor: "#dab684", color: "white"}}
                                        className="rounded-circle d-flex justify-content-center align-items-center fw-bold fs-3"
                                        variant="outline-none"
                                        onClick={() => decreaseCartQuantity(id)}>-
                                    </Button>
                                    <div> 
                                        <span className="fs-3"> {quantity} </span> u korpi
                                    </div>
                                    <Button 
                                        style={{width: isMobile ? "30px" : "40px", height: isMobile ? "30px" : "40px", backgroundColor: "#dab684", color: "white"}}
                                        className="rounded-circle d-flex justify-content-center align-items-center fw-bold fs-3"
                                        variant="outline-none"
                                        onClick={() => increaseCartQuantity(id)}>+
                                    </Button>
                                </div>
                                <Button 
                                    onClick={() => removeFromCart(id)}
                                    variant="danger"
                                    size="sm" 
                                    style={{backgroundColor: "rgb(247, 43, 43)"}}> Izbiriši iz korpe </Button>
                            </div>}
                    </div>
                    {/* ------------------------ */}

                </Card.Body>
                {available? null : <div className="position-absolute" 
                    style={{top: "0", 
                            right: "0", 
                            color: "white",
                            padding: "10px", 
                            whiteSpace: "nowrap",
                            fontSize: "0.8rem",
                            backgroundColor: "rgb(247, 43, 43)",
                            borderBottomLeftRadius: "5px",
                            borderTopRightRadius: "5px"}}> NEMA NA STANJU </div>}
            </Card>
            <div
                style={{width: "80%",
                    height: "0.5px",
                    backgroundColor: "black",
                    margin: "0 auto",
                    marginTop: "10px"}}></div>
        </>
    )
}

export default Product;