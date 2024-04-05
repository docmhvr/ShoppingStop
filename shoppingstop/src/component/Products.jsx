import React, { useState, useEffect } from "react";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState();
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
        const jsonData = response.json();
        if (componentMounted) {
          setData(jsonData);
          setFilter(jsonData); // Initialize filter with all products
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
      {filter.map((product) => {
        return (
            <div className="col-md-3" key={product.id}>
              <div class="card">
                <img src={product.image} class="card-img-top" alt={product.title} />
                <div class="card-body">
                  <h5 class="card-title">{product.title}</h5>
                  <p class="card-text">${product.price}</p>
                  <a href="" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div>
        )
      })}
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