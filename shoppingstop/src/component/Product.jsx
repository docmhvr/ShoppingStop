import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/actions";
import { NavLink, useParams } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const addProduct = (product) => {
        dispatch(addItem(product));
    }

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://dummyjson.com/product/${id}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok.");
                }
                const jsonData = await response.json(); // Await the response.json() call
                console.log("Fetched data:", jsonData); // Log fetched data
                setProduct(jsonData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        getProducts();
    }, [id]);

    const Loading = () => {
        return (
            <>
                <div className="col-md-6">
                    <Skeleton height={320} />
                </div>
                <div className="col-md-6">
                    <Skeleton height={80} width={240} />
                </div>
            </>
        );
    };

    const ShowProducts = () => {
        // Check if product.images exists and has at least one image link
        if (!product.images || product.images.length === 0) {
            return <div>No images available</div>; // Render a message if no images are available
        }

        return (
            <>
                <div className="col-md-6">
                    <img src={product.images[0]} alt={product.title} height="512px" width="480px" />
                </div>
                <div className="col-md-6">
                    <h4 className="text-uppercase text-black-50">{product.category}</h4>
                    <h1 className="display-5">{product.title}</h1>
                    <p className="lead fw-bolder">Rating {product.rating} <i className="fa fa-star"></i></p>
                    <h3 className="dis[;ay-6 fw-bold my-4">$ {product.price}</h3>
                    <p className="lead">{product.description}</p>
                    <button className="btn btn-outline-dark px-4 py-2" onClick={()=>addProduct(product)}>Add to Cart</button>
                    <NavLink to="/cart" className="btn btn-dark ms-2 px-3 py-2">Go to Cart</NavLink>
                </div>
            </>
        );
    };



    return (
        <div>
            <div className="container py-5">
                <div className="row py-5">
                    {loading ? <Loading /> : <ShowProducts />}
                </div>
            </div>
        </div>
    );
};

export default Product;