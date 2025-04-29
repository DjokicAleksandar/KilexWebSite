import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext"
import productData from "../data/products.json";
import { formatPrice } from "../utilities/formatPrice";

type CartItemProps = {
    id: number,
    quantity: number
    variant: "home" | "cart"
}

export function CartItem({id, quantity, variant = "home"}: CartItemProps ) {
    const { removeFromCart } = useShoppingCart();
    const item = productData.find(it => it.id === id);

    if (item == null) return <h1> Nema </h1>;

    return (
        <Stack direction="horizontal" className="align-items-center justify-content-between w-100">
            {/* Slika */}
            <div style={{ width: "150px", flexShrink: 0 }}>
                <img
                src={item.image}
                alt={item.name}
                className="img-fluid"
                style={{ objectFit: "cover", height: "70px", width: "100%" }}
                />
            </div>

            {/* Ime + komadna cena */}
            <div className="flex-grow-1 d-flex flex-column">
                <div className="fw-bold">{item.name}</div>
                {(
                <div className="text-muted" style={{ fontSize: "1rem" }}>
                    x{quantity}
                </div>
                )}
                <div className="text-muted" style={{ fontSize: "1rem", whiteSpace: "nowrap" }}>
                {item.price} RSD
                </div>
            </div>

            {/* Ukupna cena */}
            <div className="text-start" style={{ whiteSpace: "nowrap" }}>
                <strong>{formatPrice(item.price * quantity)}</strong>
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