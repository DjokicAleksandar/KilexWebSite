import ProductList from "../components/ProductList";

function Home() {
    return (
        <>
            <div className="d-flex align-items-center justify-content-center position-relative p-2 mb-5" 
                style={{width: "80%", maxWidth: "1200px"}}>
                <ProductList/>
            </div>
        </>
    )
}

export default Home;