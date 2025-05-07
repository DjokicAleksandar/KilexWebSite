import { useState, useEffect } from "react";
import productData from "../data/products.json";
import { useIsMobile } from "../hooks/useIsMobile";
import leftArrow from "../../public/images/leftArrow.png";
import rightArrow from "../../public/images/rightArrow.png";

type ImageSliderProps = {
    setShowSlider: () => void;
    id: number;
}

const ImageSlider = ({id, setShowSlider}: ImageSliderProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const isMobile = useIsMobile();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 10);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            setShowSlider();
        }, 500)
    }

    const handleLeftClick = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }

    const handleRightClick = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }
    
    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
    }
    
    const desc = productData.find((product) => product.id === id)?.description;
    const name = productData.find((product) => product.id === id)?.name;
    const images = productData.find((product) => product.id === id)?.images || [];

    const slideStyles = {
        backgroundImage: `url(${import.meta.env.BASE_URL}${images[currentIndex]})`,
        backgroundPosition: "center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        objectFit: "cover",
        margin: "0 auto",
        width: "90%",
        flex: "1 0 100%",
        aspectRatio: "16/9",
        scrollSnapType: "x mandatory",
        scrollBehavior: "smooth"
    }
    
    return (
        <div 
            style={{width: "100%", height: "100vh", backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: "10"}}
            className={`position-fixed top-0 p-0 item ${isVisible ? "visibleItem" : ""}`}
            onClick={handleClose}>

            {/* content */}
            <div 
                onClick={(e) => e.stopPropagation()}
                className={`position-fixed top-50 start-50 translate-middle
                    d-flex justify-content-center align-items-center flex-column gap-2 px-3`}
                style={{width: isMobile ? "95%" : "max-content", backgroundColor: "white"}}>

                {/* close button */}
                <p className="position-absolute" 
                    style={{color: "#dab684", top: "-25px", right: "0", cursor: "pointer", fontWeight: "300", textDecoration: "underline"}}
                    onClick={handleClose}>
                    ZATVORI X
                </p>

                <div 
                    style={{fontSize: "2rem", 
                    width: "90%", 
                    textAlign: "center", 
                    padding: "10px 20px 10px 20px",
                    borderBottom: "1px solid #0f0904"}}>{name}</div>

                <div 
                    className="position-relative"
                    style={slideStyles}>

                    <div 
                        onClick={handleLeftClick}
                        className="position-absolute"
                        style={{top: "50%", transform: "translate(0, -50%)", left: "-32px", fontSize: "45px", zIndex: "1", cursor: "pointer"}}>
                        <img width="35px" height="35px" src={leftArrow}/>
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
                            <div 
                                onClick={() => handleDotClick(index)}
                                key={index} 
                                style={{width: "10px", 
                                    height: "10px", 
                                    borderRadius: "50%", 
                                    backgroundColor: index === currentIndex ? "#B39167" : "#dab684", 
                                    transform: `scale(${index === currentIndex ? "1.2" : "1"})`,
                                    cursor: "pointer"}}></div>
                        ))}
                    </div>

                    <div 
                        onClick={handleRightClick}
                        className="position-absolute"
                        style={{top: "50%", transform: "translate(0, -50%)", right: "-32px", fontSize: "45px", zIndex: "1", cursor: "pointer"}}> 
                        <img width="35px" height="35px" src={rightArrow}/>
                    </div>

                </div>
                

                <div className="mt-4 pb-3">
                    {desc}
                </div>

            </div>

        </div>
    )
}

export default ImageSlider;