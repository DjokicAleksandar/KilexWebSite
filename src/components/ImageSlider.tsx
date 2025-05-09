import { useState, useEffect, useRef } from "react";
import productData from "../data/products.json";
import { useIsMobile } from "../hooks/useIsMobile";

type ImageSliderProps = {
    setShowSlider: () => void;
    id: number;
}

const ImageSlider = ({id, setShowSlider}: ImageSliderProps) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const navDotsRef = useRef<HTMLAnchorElement[]>([]);
    const [isVisible, setIsVisible] = useState(false);
    const isMobile = useIsMobile();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 10);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const slider = sliderRef.current;
        const navDots = navDotsRef.current;

        if (!slider || navDots.length == 0) return;

        const updateActiveDot = () => {
            const sliderWidth = slider.scrollWidth / slider.childElementCount;
            const scrollLeft = slider.scrollLeft;
            const activeIndex = Math.round(scrollLeft / sliderWidth);
      
            navDots.forEach(dot => dot.classList.remove("active"));
            navDots[activeIndex]?.classList.add("active");
        };

        slider.addEventListener("scroll", updateActiveDot);

        updateActiveDot();

        return () => {
            removeEventListener("scroll", updateActiveDot)
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            setShowSlider();
        }, 500)
    }
    
    const name = productData.find((product) => product.id === id)?.name;
    const images = productData.find((product) => product.id === id)?.images || [];
    
    return (
        <div 
            style={{width: "100%", height: "100vh", backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: "10"}}
            className={`position-fixed top-0 p-0 item ${isVisible ? "visibleItem" : ""}`}
            onClick={handleClose}>

            {/* content */}
            <div 
                onClick={(e) => e.stopPropagation()}
                className={`position-fixed top-50 start-50 translate-middle
                    d-flex justify-content-center align-items-center flex-column px-3 pb-4`}
                style={{width: isMobile ? "95%" : "50%", backgroundColor: "white"}}>

                {/* close button */}
                <p className="position-absolute" 
                    style={{color: "#dab684", top: "-25px", right: "0", cursor: "pointer", fontWeight: "300", textDecoration: "underline"}}
                    onClick={handleClose}>
                    ZATVORI X
                </p>

                <div 
                    style={{fontSize: "1.8rem", 
                    width: "90%", 
                    textAlign: "center", 
                    padding: "10px 20px 10px 20px",
                    borderBottom: "1px solid #0f0904"}}>{name}</div>

                <div 
                    className="position-relative">

                    <div className="w-100 d-flex eyelashSlider" 
                        ref={sliderRef}
                        style={{overflowX: "auto", scrollSnapType: "x mandatory", scrollBehavior: "smooth"}}>
                        {images.map((image, i) => (
                            <img key={i} src={images[i]} loading="lazy" alt="Učitavanje..." 
                            style={{width: "90%", flex: "1 0 100%", aspectRatio: "16 / 9", padding: "10px", scrollSnapAlign: "start", objectFit: "contain"}}/>
                        ))}
                    </div>

                    <div className="d-flex justify-content-center gap-3 mt-2 w-100 p-1" 
                        style={{position: "absolute", 
                            bottom: "-20px", 
                            left: "50%", 
                            transform: "translateX(-50%)", 
                            scrollBehavior: "smooth",
                            scrollSnapType: "x mandatory",
                            overflowX: "auto"}}>
                        {images.map((slide, index) => (
                            <a 
                                key={index} 
                                style={{width: "10px", 
                                    height: "10px", 
                                    borderRadius: "50%",
                                    textDecoration: "none"}}
                                ref={(el) => {
                                    if (el) navDotsRef.current[index] = el;
                                }}
                                className={`dot ${index === 0 ? "active" : ""}`}></a>
                        ))}
                    </div>

                </div>

            </div>

        </div>
    )
}

export default ImageSlider;