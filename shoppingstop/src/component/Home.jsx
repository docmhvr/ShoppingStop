import React from "react";
import Products from "./Products";

const Home = () => {
    return (
        <div className="hero">
            <div className="card text-bg-dark border-0">
                <img src="/assets/bg.jpg" className="card-img" alt="Background" height="512px"/>
                <div className="card-img-overlay d-flex flex-column">
                    <div className="container">
                        <h5 className="card-title display-3 fw-bolder mb-0">NEW OFFERS COMING SOON</h5>
                        <p className="card-text lead fs-2">Check out all the new arrivals only at ShoppingStop</p>
                    </div>
                </div>
            </div>
            <Products/>
        </div>
    );
};

export default Home;