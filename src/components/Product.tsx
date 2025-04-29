import { Button, Card } from "react-bootstrap"; 
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useEffect } from "react";

type ProductProps = {
    id: number
    name: string
    price: number
    image: string
    available: number
    discount: number
    onOpenSlider: (id: number) => void
}

//na osnovu klika da odredi koji je proizvod kliknut (njegov id) i po tome da nadje ime, desc...
//za sad sve slike imaju isto ime

const Product = ({ id, name, price, image, available, discount, onOpenSlider} : ProductProps) => {
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart()
    let quantity = getItemQuantity(id);

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
            <Card style={{boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.6) 0px 2px 4px -1px"}} className="item">

                <Card.Img variant="top" 
                    src={image} 
                    style={{objectFit: "cover", cursor: "pointer"}}
                    onClick={() => onOpenSlider(id)}/> 

                {/* <div style={{width: "100%", height: "150px"}}>
                    <ImageSlider slides={images} desc={desc}/>
                </div> */}

                <Card.Body className="d-flex flex-column justify-content-center align-items-center mb-2" style={{padding: "0px"}}>
                    
                    
                    {discount ?
                        <div className="position-absolute top-0 start-0 fs-2 p-1"
                            style={{backgroundColor: "#dab684", 
                                color: "white",
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
                                        <span className="fs-3"> {price - ((discount / 100) * price)} RSD </span>
                                        <span className="danger" 
                                            style={{textDecoration: "line-through", color: "rgb(247, 43, 43)"}}> 
                                            {price} RSD 
                                        </span> 
                                    </span>
                                    : 
                                    <span className="fs-3"> {price} RSD </span>
                            } 
                        </span> 
                    </Card.Title>

                    {/* add to cart button  */}
                    <div>
                        {quantity === 0 ? (
                            <Button 
                                onClick={() => increaseCartQuantity(id)}
                                style={{width: "max-content", color: "white"}} 
                                className="bg-black mt-1" 
                                disabled={available? false : true}
                                variant="outline-none"> DODAJ U KORPU 
                            </Button>
                        ) : <div className="d-flex justify-content-center align-items-center flex-column" style={{gap: "0.5rem"}}> 
                                <div className="d-flex justify-content-center align-items-center" style={{gap: "0.5rem"}}> 
                                    <Button 
                                        style={{width: "40px", height: "40px", backgroundColor: "#dab684", color: "white"}}
                                        className="rounded-circle d-flex justify-content-center align-items-center fw-bold fs-3"
                                        variant="outline-none"
                                        onClick={() => decreaseCartQuantity(id)}>-
                                    </Button>
                                    <div> 
                                        <span className="fs-3"> {quantity} </span> u korpi
                                    </div>
                                    <Button 
                                        style={{width: "40px", height: "40px", backgroundColor: "#dab684", color: "white"}}
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
                {available? null : <div className="position-absolute p-2 fs-4" 
                    style={{top: "0", 
                            right: "0", 
                            color: "white", 
                            whiteSpace: "nowrap",
                            backgroundColor: "rgb(247, 43, 43)",
                            borderBottomLeftRadius: "5px",
                            borderTopRightRadius: "5px"}}> NEMA NA STANJU </div>}
            </Card>
        </>
    )
}

export default Product;