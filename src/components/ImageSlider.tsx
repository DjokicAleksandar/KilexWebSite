import { useState, useEffect } from "react";
import productData from "../data/products.json";

type ImageSliderProps = {
    setShowSlider: () => void;
    id: number;
}

const ImageSlider = ({id, setShowSlider}: ImageSliderProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

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
        backgroundImage: `url(${images[currentIndex]})`,
        borderRadius: "10px",
        backgroundPosition: "center",
        backgroundSize: "cover",
        objectFit: "cover",
        margin: "0 auto",
        width: "350px",
        height: "200px"
    }
    
    return (
        <div 
            style={{width: "100%", height: "100vh", backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: "10"}}
            className={`position-fixed top-0 p-0 item ${isVisible ? "visibleItem" : ""}`}
            onClick={handleClose}>

            {/* content */}
            <div 
                onClick={(e) => e.stopPropagation()}
                className={`position-fixed top-50 start-50 translate-middle bg-light 
                    d-flex justify-content-center align-items-center flex-column gap-4`}
                style={{width: "90%"}}>

                <div>{name}</div>

                <div 
                    className="position-relative"
                    style={slideStyles}>

                    <div 
                        onClick={handleLeftClick}
                        className="position-absolute"
                        style={{top: "50%", transform: "translate(0, -50%)", left: "-32px", fontSize: "45px", zIndex: "1", cursor: "pointer"}}> L
                    </div>

                    <div className="d-flex justify-content-center gap-2 mt-2" style={{position: "absolute", bottom: "-20px", left: "50%", transform: "translateX(-50%)"}}>
                        {images.map((slide, index) => (
                            <div 
                                onClick={() => handleDotClick(index)}
                                key={index} 
                                style={{width: "10px", 
                                    height: "10px", 
                                    borderRadius: "50%", 
                                    backgroundColor: index === currentIndex ? "#dab684" : "black", 
                                    transform: `scale(${index === currentIndex ? "1.3" : "1"})`,
                                    cursor: "pointer"}}></div>
                        ))}
                    </div>

                    <div 
                        onClick={handleRightClick}
                        className="position-absolute"
                        style={{top: "50%", transform: "translate(0, -50%)", right: "-32px", fontSize: "45px", zIndex: "1", cursor: "pointer"}}> R 
                    </div>

                </div>
                

                <div>
                    {desc}
                </div>

            </div>

        </div>
    )
}

export default ImageSlider;