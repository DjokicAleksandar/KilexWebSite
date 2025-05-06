import { useState } from "react";
import ProductList from "../components/ProductList";
import WelcomeImage from "../components/WelcomeImage";

function Home() {
    const [imageHeight, setImageHeight] = useState(0);

    return (
        <>
            <div className="d-flex align-items-center justify-content-center position-relative p-2 mb-5" 
                style={{width: "90%", maxWidth: "1200px"}}>
                <WelcomeImage imageHeight={imageHeight} setImageHeight={setImageHeight}/>
                <ProductList top={imageHeight}/>
            </div>
        </>
    )
}

export default Home;