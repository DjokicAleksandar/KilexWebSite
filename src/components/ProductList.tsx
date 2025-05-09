import Product from "./Product";
import productData from "../data/products.json";
import {Col, Row} from "react-bootstrap";
import { useState, useEffect } from "react";
import WelcomeHeader from "./WelcomeHeader";
import { lazy, Suspense } from "react";

interface ProductListProps {
    top: number;
}

function ProductList({top}: ProductListProps) {    
    const [showSlider, setShowSlider] = useState(false);
    const [sliderData, setSliderData] = useState<{id: number} | null>(null);
    const ImageSlider = lazy(() => import("./ImageSlider"));

    const handleOpenSlider = (id: number) => {
        setShowSlider(true);
        setSliderData({id});
    }
 
    useEffect(() => {
            if (showSlider) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "auto";
            }
          
            return () => {
                document.body.style.overflow = "auto";
            };
        }, [showSlider]);

    return (
        <>
            <div style={{marginTop: top}}>
                <WelcomeHeader/>
                <Row xs={1} md={2} lg={3} className="g-4">
                    {productData.map(item => (
                        <Col key={item.id}> 
                            <Product 
                                id={item.id} 
                                name={item.name} 
                                price={item.price} 
                                image={`${item.image}`} 
                                available={item.available} 
                                discount={item.discount}
                                onOpenSlider={handleOpenSlider}/> 
                        </Col>
                    ))}
                </Row>
                    
            </div>
            {showSlider && sliderData && (
                <Suspense fallback={null}>
                    <ImageSlider 
                        setShowSlider={() => setShowSlider(false)}
                        id={sliderData.id}/>
                </Suspense>
            )}
        </>
    )
}

export default ProductList;