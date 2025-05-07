import imageMobile1 from "../..public/images/logoBackground.jpg";
import imageMobile2 from "../..public/images/naslovnaSlika2.webp"; 
import { useRef, useEffect } from "react";

interface WelcomeImageProps {
    imageHeight: number;
    setImageHeight: (height: number) => void;
}

const WelcomeImage = ({imageHeight, setImageHeight}: WelcomeImageProps) => {
    const images = [
        imageMobile1,
        imageMobile2
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
        <div ref={imageRef} className="position-absolute top-0 z-1" style={{overflow: "hidden", height: "70vh", width: "100vw"}}>
            <div className="w-100 d-flex slider">
                {images.map((src, i) => (
                    <img
                        key={i}
                        src={src}
                        className={`slider-image`}  
                        alt={`Slide ${i}`}  
                    />
                ))}
            </div>
        </div>
    )
}

export default WelcomeImage;