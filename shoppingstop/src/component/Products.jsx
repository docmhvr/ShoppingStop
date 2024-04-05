import React, { useState, useEffect } from "react";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const jsonData = await response.json(); // Await the response.json() call
        // console.log("Fetched data:", jsonData["products"]); // Log fetched data
        if (componentMounted) {
          setData(jsonData["products"]);
          setFilter(jsonData["products"]); // Initialize filter with all products
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();

    return () => {
      componentMounted = false;
    };
  }, []);

  const Loading = () => {
    return (
      <>
        Loading...
      </>
    );
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <button className="btn btn-outline-dark me-3">All</button>
          <button className="btn btn-outline-dark me-3">Electronics</button>
          <button className="btn btn-outline-dark me-3">Accessories</button>
          <button className="btn btn-outline-dark me-3">Other</button>
        </div>
        {filter.map((product) => (
          <div className="col-md-3 mb-4">
            <div className="card h-100 text-center p-4" key={product.id}>
              <img src={product.images[0]} className="card-img-top" alt={product.title} height="250px"/>
              <div className="card-body">
                <h5 className="card-title mb-0 ">{product.title}</h5>
                <p className="card-text lead fw-bold">${product.price}</p>
                <a href="#" className="btn btn-outline-dark">Buy Now</a>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
};

export default Products;
