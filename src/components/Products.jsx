import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products/");
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("men's clothing")}
          >
            Men's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("women's clothing")}
          >
            Women's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("jewelery")}
          >
            Jewelery
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("electronics")}
          >
            Electronics
          </button>
        </div>

        {filter.map((product) => {
          return (
            <div
              id={product.id}
              key={product.id}
              className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
              style={{ 
                opacity: product.inStock ? 1 : 0.6,
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }} // Added inline styles
            >
              <div 
                className="card text-center h-100" 
                key={product.id}
                style={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                  backgroundColor: product.featured ? '#ffffd9' : '#ffffff'
                }} // Added inline styles
              >
                <img
                  className="card-img-top p-3"
                  src={product.image}
                  alt="Card"
                  height={300}
                  style={{
                    objectFit: 'contain',
                    maxHeight: '250px',
                    filter: product.isNew ? 'none' : 'grayscale(0.2)'
                  }} // Added inline styles
                />
                <div 
                  className="bad-body"
                  style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #eaeaea'
                  }} // Added inline styles
                >
                  <h5 
                    className="bard-title"
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: '#222',
                      marginBottom: '8px',
                      textOverflow: 'ellipsis'
                    }} // Added inline styles
                  >
                    {product.title.substring(0, 12)}...
                  </h5>
                  <p 
                    className="cat-text"
                    style={{
                      fontSize: '0.9rem',
                      lineHeight: 1.5,
                      color: '#666',
                      marginBottom: '12px'
                    }} // Added inline styles
                  >
                    {product.description.substring(0, 90)}...
                  </p>
                </div>
                <ul 
                  className="list-group"
                  style={{
                    borderRadius: 0,
                    borderTop: 'none',
                    marginBottom: 0
                  }} // Added inline styles
                >
                  <li style={{
                    fontWeight: 'bold',
                    color: product.onSale ? '#e53935' : '#212121',
                    padding: '8px 12px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>$ {product.price}</li>
                </ul>
                <div 
                  className="bad-body"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '16px',
                    backgroundColor: '#f9f9f9'
                  }} // Added inline styles
                >
                  <Link
                    to={"/product/" + product.id}
                    className="btn-dark m-1"
                    style={{
                      textDecoration: 'none',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      backgroundColor: '#212121',
                      color: 'white',
                      fontWeight: 500,
                      fontSize: '0.9rem',
                      transition: 'background-color 0.2s'
                    }} // Added inline styles
                  >
                    Buy Now
                  </Link>
                  <button
                    className="btn m-1"
                    style={{
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '8px 16px',
                      cursor: 'pointer',
                      fontWeight: 500,
                      fontSize: '0.9rem',
                      transition: 'background-color 0.2s'
                    }} // Added inline styles
                    onClick={() => {
                      toast.success("Added to cart");
                      addProduct(product);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };
  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h1 className="display-5 text-center">Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="row">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;