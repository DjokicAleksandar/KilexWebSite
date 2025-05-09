import imageMobile1 from "/images/welcomeImageMobile1.webp";
import imageMobile2 from "/images/welcomeImageMobile2.webp"; 
import imageDesktop1 from "/images/welcomeImageCmp1.webp";
import imageDesktop2 from "/images/welcomeImageCmp2.webp"
import { useRef, useEffect } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

interface WelcomeImageProps {
    imageHeight: number;
    setImageHeight: (height: number) => void;
}

const WelcomeImage = ({imageHeight, setImageHeight}: WelcomeImageProps) => {
    const isMobile = useIsMobile();

    const imagesMobile = [
        imageMobile1,
        imageMobile2
    ]

    const imagesDesktop = [
        imageDesktop1,
        imageDesktop2
    ]

    const imageRef = useRef<HTMLDivElement | null>(null);

    const updateImageHeight = () => {
        if (imageRef.current) {
            const height = imageRef.current.offsetHeight;
            setImageHeight(height);
        }
    }

    useEffect(() => {
        updateImageHeight();

        window.addEventListener("resize", updateImageHeight)

        return () => {
            window.removeEventListener("resize", updateImageHeight);
        }
    })

    return (
        <div ref={imageRef} className="position-absolute top-0 z-1" style={{overflow: "hidden", height: isMobile? "70vh" : "", width: "100vw", aspectRatio: isMobile ? "2 / 3" : "16 / 9"}}>
            <div className="w-100 d-flex slider">
                {isMobile ? 
                    imagesMobile.map((src, i) => (
                        <img
                            key={i}
                            src={src}
                            className={`slider-image`}  
                            alt={`Slide ${i}`}  
                        />
                    )) :
                    imagesDesktop.map((src, i) => (
                        <img
                            key={i}
                            src={src}
                            className={`slider-image`}  
                            alt={`Slide ${i}`}  
                        />
                    ))
                } 
            </div>
        </div>
    )
}

export default WelcomeImage;