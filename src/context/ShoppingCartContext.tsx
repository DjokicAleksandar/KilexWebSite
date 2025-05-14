import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCartMenu } from "../components/ShoppingCartMenu";
import { useLocalStorage } from "../hooks/useLocalStorage";
import productData from "../data/products.json";

const ShoppingCartContext = createContext({});

type ShoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: number
    quantity: number
    name: string
    price: number
}

type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[]
}

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children} : ShoppingCartProviderProps) {
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", []);
    const [isOpen, setIsOpen] = useState(false);

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

    const closeCart = () => setIsOpen(false);
    const openCart = () => setIsOpen(true);

    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }

    function increaseCartQuantity(id: number) {
        const product = productData.find(p => p.id === id);
        if (!product) return;

        const discount = product.discount || 0;
        const discountPrice = product.price * (1 - discount / 100);

        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id: id, quantity: 1, name: productData[id - 1].name, price: discountPrice }];
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity + 1};
                    } else {
                        return item;
                    }
                })
            }
        })
    }

    function decreaseCartQuantity(id: number) {
        const product = productData.find(p => p.id === id);
        if (!product) return;

        const discount = product.discount || 0;
        const discountPrice = product.price * (1 - discount / 100);

        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity == 1) {
                return currItems.filter(item => item.id !== id);
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity - 1, price: discountPrice};
                    } else {
                        return item;
                    }
                })
            }
        })
    }

    function removeFromCart(id: number) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id);
        })
    }

    return (
        <ShoppingCartContext.Provider 
            value={{ getItemQuantity, 
            increaseCartQuantity, 
            decreaseCartQuantity, 
            removeFromCart, 
            openCart, 
            closeCart,
            cartItems,
            cartQuantity
        }}>
            {children}
            <ShoppingCartMenu isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
    )
}