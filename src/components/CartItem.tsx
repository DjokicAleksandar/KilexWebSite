import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext"
import productData from "../data/products.json";
import { formatPrice } from "../utilities/formatPrice";
import { useIsMobile } from "../hooks/useIsMobile";

type CartItemProps = {
    id: number,
    quantity: number
    variant: "home" | "cart"
}

export function CartItem({id, quantity, variant = "home"}: CartItemProps ) {
    const { removeFromCart } = useShoppingCart();
    const item = productData.find(it => it.id === id);
    const isMobile = useIsMobile();

    if (item == null) return <h1> Nema </h1>;

    return (
        <Stack direction="horizontal" className={`align-items-center justify-content-between w-100 pr-1`}>
            {/* Slika */}
            <div className={`d-flex ${variant == "cart" ? "ms-3" : ""}`} style={{width: variant == "cart" ? "50%" : ""}}>

                <div style={{ width: isMobile ? "120px" : "140px", flexShrink: 0}}>
                    <img
                    src={`/${item.image}`}
                    alt={item.name}
                    className="img-fluid"
                    style={{ objectFit: "cover", height: "70px", width: "100%" }}
                    />
                </div>

                {/* Ime + komadna cena */}
                <div className="d-flex flex-grow-1 flex-column">
                    <div 
                        className="fw-bold"
                        style={{flexShrink: "1",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: isMobile ? "60px" : "auto"
                        }}>{item.name}</div>

                    {(
                    <div className="text-muted" style={{ fontSize: "1rem" }}>
                        x{quantity}
                    </div>
                    )}

                    <div className="text-muted" style={{ fontSize: "1rem", whiteSpace: "nowrap" }}>
                    {formatPrice(item.discount ? item.price * (1 - item.discount / 100) : item.price)}
                    </div>
                </div>

            </div>

            {/* Ukupna cena */}
            <div className={`${variant == "cart" ? "text-center" : "text-start"}`} style={{ whiteSpace: "nowrap", width: variant == "cart" ? "50%" : ""}}>
                {variant === "home" ? (
                    <strong> {formatPrice((item.discount ? item.price * (1 - item.discount / 100) : item.price) * quantity)} </strong>
                ) : 
                    <h5>{formatPrice((item.discount ? item.price * (1 - item.discount / 100) : item.price) * quantity)}</h5>
                }
            </div>

            {/* Dugme */}
            {variant === "home" ? (
                <Button
                className="ms-1"
                variant="outline-danger"
                size="sm"
                onClick={() => removeFromCart(item.id)}
                >
                &times;
                </Button>
            ) : null}
        </Stack>
    )
}