import { useEffect, useState } from "react";
import { CartItem } from "../components/CartItem";
import {Form} from "../components/Form";
import { Container } from "react-bootstrap";
import { useIsMobile } from "../hooks/useIsMobile";
import { validateForm } from "../utilities/validateForm";
import Popup from "../components/Popup";
import truck from "../../public/images/truck.png";
import clock from "../../public/images/clock.png";
import wallet from "../../public/images/wallet.png";
import { formatPrice } from "../utilities/formatPrice";
import { Link, useNavigate } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";

type CartItem = {
    id: number
    quantity: number
    name: string
    price: number
}

function Cart() {
    let total = 300;
    const isMobile = useIsMobile();
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_BASE_URL;

    // const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const { cartItems, setCartItems } = useShoppingCart();
    const [emailFormatError, setEmailFormatError] = useState(false);
    const [phoneFormatError, setPhoneFormatError] = useState(false);
    const [popupStatus, setPopupStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        email: "",
        city: "",
        adress: "",
        post: "",
        phone: ""
    })
    const [formError, setFormError] = useState({
        name: false,
        lastName: false,
        email: false,
        city: false,
        adress: false,
        post: false,
        phone: false
    })

    // useEffect(() => {
    //     const data = localStorage.getItem("shopping-cart");

    //     if (data) {
    //         console.log(data)
    //         setCartItems(JSON.parse(data));
    //     }
    // }, []);

    useEffect(() => {
        if (popupStatus !== "idle") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
      
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [popupStatus]);

    useEffect(() => {
        if (popupStatus === "success" || popupStatus === "error") {
          const timeout = setTimeout(() => setPopupStatus("idle"), 4000);
          return () => clearTimeout(timeout);
        }
    }, [popupStatus]);

    cartItems.forEach((cartItem) => {
        total += (cartItem.price * cartItem.quantity);
    })

    function ClearInputs() {
        setFormData({
            name: "",
            lastName: "",
            email: "",
            city: "",
            adress: "",
            post: "",
            phone: ""
        })
    }

    const handleOnClick = async () => {
        const {isValid, errors, emailFormatError, phoneFormatError} = validateForm(formData);

        setFormError(errors);
        
        if (emailFormatError) {
            setEmailFormatError(true);
        } else {
            setEmailFormatError(false);
        }

        if (phoneFormatError) {
            setPhoneFormatError(true);
        } else {
            setPhoneFormatError(false);
        }

        if (!isValid) {
            window.scrollTo(0, 0);
            return;
        }

        const now = new Date();
        const fullData = {
            formData,
            cartItems,
            today: {
                day: String(now.getDate()).padStart(2, '0'),
                month: String(now.getMonth() + 1).padStart(2, '0'),
                year: now.getFullYear(),
                time: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
            }
        };
        
        try {   
            setPopupStatus("loading");
            

            const response = await fetch(`${API_URL}/send-email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(fullData)
            })

            const data = await response.json();
            
            if (!response.ok) {
                setPopupStatus("error");

                if (data.message == "Pogresan format emaila") {
                    window.scrollTo(0, 0);
                    return;
                }

                if (response.status == 500) {
                    setPopupStatus("error");
                    return;
                }
            }

            fetch(`${API_URL}/add-sale`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({products: fullData.cartItems})
            })
            .then(res => res.json())
            .then(data => console.log("Sacuvana prodaja: " + data))
            .catch(err => {
                console.log("Greska prilikom cuvanja u bazu: " + err);
                setPopupStatus("error");
            });

            ClearInputs();
            setPopupStatus("success");
            localStorage.removeItem("shopping-cart");
            
            setCartItems([]);
        } catch (error) {
            setPopupStatus("error");
            console.error("Greska tokom slanja: ", error);
        } finally {
            //sakrij popup
        }
    }

    return (        
        <>
        <Container 
            className="w-100" 
            style={{height: "100%", 
                    display: isMobile ? "flex" : "grid",
                    flexDirection: isMobile ? "column" : "inherit",
                    gridTemplateColumns: "1.2fr 0.8fr",
                    padding: isMobile ? "10px" : "20px",
                    position: "relative"}}>

            <Form formData={formData} setFormData={setFormData} formError={formError} 
                emailFormatError={emailFormatError} phoneFormatError={phoneFormatError}/>

            <div style={{padding: isMobile ? "10px" : "30px"}}>
                <h1 className="mb-3" style={{padding: "0px"}}>Porudžbina: </h1>
                <div 
                    className="d-flex justify-content-around pt-2 pb-2"
                    style={{border: "1px solid #dab684"}}>
                    <h4 style={{margin: "0", width: "50%", textAlign: "center", fontWeight: "400"}}> Proizvod </h4>
                    <h4 style={{margin: "0", width: "50%", textAlign: "center", fontWeight: "400"}}> Cena </h4>
                </div>

                <div className="d-grid pt-2 pb-2 gap-2"
                    style={{gridTemplateColumns: "1fr", border: "1px solid #dab684"}}>
                    {cartItems.map(cartItem => {
                        return (
                            <div key={cartItem.id} className="d-flex justify-content-around">
                                <CartItem id={cartItem.id} quantity={cartItem.quantity} variant="cart"/>
                            </div>
                        )
                    })}
                </div>

                <div 
                    className="d-flex justify-content-around pt-2 pb-2"
                    style={{border: "1px solid #dab684"}}>
                    <h5 style={{margin: "0", width: "50%", textAlign: "center", fontWeight: "400"}}> Dostava: </h5>
                    <h5 style={{margin: "0", width: "50%", textAlign: "center", paddingLeft: "10px"}}> 300 RSD </h5>
                </div>

                <div 
                    className="d-flex justify-content-around pt-2 pb-2"
                    style={{border: "1px solid #dab684"}}>
                    <h4 style={{margin: "0", width: "50%", textAlign: "center", fontWeight: "400"}}> Ukupno: </h4>
                    <h4 style={{margin: "0", width: "50%", textAlign: "center", paddingLeft: "10px"}}> {formatPrice(total)} </h4>
                </div>
                
                <div className="d-flex flex-column gap-3 rounded-3 mt-5 mb-3" style={{fontSize: "1rem", textAlign: "center"}}> 
                    <div className="w-100 gap-2 p-2 d-flex flex-column" 
                        style={{textAlign: "left", borderTop: "1px solid #dab684", borderBottom: "1px solid #dab684"}}>
                        <div className="segmentInfo"> 
                            <div className="d-flex align-items-center gap-2"> 
                                <img width="40px" height="40px" src={truck}/> <h4 style={{fontSize: "1.1rem", fontWeight: "500", margin: "0"}}> Isporuka proizvoda </h4> 
                            </div>
                            <h5 style={{fontWeight: "400", fontSize: "1.1rem"}}> Isporuka se vrši kurirskom službom <br/>
                                Cena dostave iznosi <b>300 RSD</b> i dodaje se na ukupnu cenu narudžbine. </h5>
                        </div>

                        <div className="segmentInfo"> 
                            <div className="d-flex align-items-center gap-2"> 
                                <img width="40px" height="40px" src={clock}/> <h4 style={{fontSize: "1.1rem", fontWeight: "500", margin: "0"}}> Rok isporuke </h4> 
                            </div>
                            <h5 style={{fontWeight: "400", fontSize: "1.1rem"}}> Očekivani rok isporuke je 2 do 5 radnih dana </h5>
                        </div>

                        <div className="segmentInfo"> 
                            <div className="d-flex align-items-center gap-2"> 
                                <img width="40px" height="40px" src={wallet}/> <h4 style={{fontSize: "1.1rem", fontWeight: "500", margin: "0"}}> Troškovi isporuke </h4> 
                            </div>
                            <h5 style={{fontWeight: "400", fontSize: "1.1rem"}}> Snosi ih kupac, naplaćuju se po cenovniku kurirske službe </h5>
                        </div>
                    </div>
                    <h5 className="mt-2 mb-2 p-2" style={{fontWeight: "500"}}> Podaci koje ste nam dostavili će biti korišćeni prilikom procesuiranja Vaše narudžbine u 
                        skladu sa našom <Link to={"/PrivacyPolicy"} style={{color: "#dab684", textDecoration: "none"}}> politikom privatnosti. </Link> </h5>
                
                    <button 
                        className="w-100 bg-black px-4 pt-2 pb-2 mb-2"
                        style={{color: "white", fontSize: "1.5rem", fontWeight: "300", border: "none", borderRadius: "4px"}}
                        onClick={handleOnClick}> 
                    Završi kupovinu </button>
                </div>

            </div>

            
        </Container>

        {popupStatus === "loading" && <Popup type={popupStatus}/>}
        {popupStatus === "error" && <Popup type={popupStatus}/>}
        {popupStatus === "success" && <Popup type={popupStatus}/>}

        {/* dodaj fakturu */}
        </>
    )
}

export default Cart;