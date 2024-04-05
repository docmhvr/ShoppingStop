import React, { useState, useEffect } from "react";
import Skeleton from 'react-loading-skeleton';
import { NavLink } from "react-router-dom";

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
        console.log("Fetched data:", jsonData["products"]); // Log fetched data
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
        <div className="col-md-3">
          <Skeleton height={320}/>
        </div>
        <div className="col-md-3">
          <Skeleton height={320}/>
        </div>
        <div className="col-md-3">
          <Skeleton height={320}/>
        </div>
        <div className="col-md-3">
          <Skeleton height={320}/>
        </div>
      </>
    );
  };


  const filterProduct = (cat) => {
    let updatedList;
    if (cat === "Electronics") {
      const categories = ["smartphones", "laptops"];
      updatedList = data.filter((product) => categories.includes(product.category));
    } else if (cat === "Cosmetics") {
      const categories = ["fragrances", "skincare"];
      updatedList = data.filter((product) => categories.includes(product.category));
    } else {
      const categories = ["fragrances", "skincare", "smartphones", "laptops"];
      updatedList = data.filter((product) => !categories.includes(product.category));
    }
    setFilter(updatedList);
  }

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <button className="btn btn-outline-dark me-2" onClick={() => setFilter(data)}>All</button>
          <button className="btn btn-outline-dark me-2"  onClick={() => filterProduct("Electronics")}>Electronics</button>
          <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("Cosmetics")}>Cosmetics</button>
          <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("Other")}>Other</button>
        </div>
          {filter.map((product) => (
          <div className="col-md-3 mb-4" key={product.id}>
            <div className="card h-100 text-center p-4">
              <img src={product.images[0]} className="card-img-top" alt={product.title} height="250px"/>
              <div className="card-body">
                <h5 className="card-title mb-0 ">{product.title}</h5>
                <p className="card-text lead fw-bold">${product.price}</p>
                <NavLink to={`/products/${product.id}`} className="btn btn-outline-dark">Buy Now</NavLink>
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
