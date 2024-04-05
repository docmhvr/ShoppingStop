import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

const Product = () => {
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);

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
            Loading...
          </>
        );
      };

      const ShowProducts = () => {
        // Check if product.images exists and has at least one image link
        if (!product.images || product.images.length === 0) {
          return <div>No images available</div>; // Render a message if no images are available
        }
      
        return (
          <div className="col-md-6">
            <img src={product.images[0]} alt={product.title} height="512px" width="480px"/>
          </div>
        );
      };
      
    

    return (
        <div>
            <div className="container">
                <div className="row">
                    {loading ? <Loading/> : <ShowProducts/>}
                </div>
            </div>
        </div>
    );
};

export default Product;