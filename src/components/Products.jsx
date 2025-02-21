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
            >
              {/* Added badge element */}
              {product.isNew && <span className="badge bg-success position-absolute top-0 end-0 m-2">New</span>}
              
              <div className="card text-center h-100" key={product.id}>
                {/* Added favorite button */}
                <button className="btn-favorite position-absolute top-0 start-0 m-2">
                  <i className="fa fa-heart"></i>
                </button>
                
                <img
                  className="card-img-top p-3"
                  src={product.image}
                  alt="Card"
                  height={300}
                />
                
                {/* Added rating stars */}
                <div className="rating mb-2">
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star-empty">☆</span>
                  <span className="rating-count">(42)</span>
                </div>
                
                <div className="bad-body">
                  <h5 className="bard-title">
                    {product.title.substring(0, 12)}...
                    {/* Added tooltip */}
                    <span className="tooltip-icon ms-1" title={product.title}>ⓘ</span>
                  </h5>
                  <p className="cat-text">
                    {product.description.substring(0, 90)}...
                  </p>
                  
                  {/* Added category tag */}
                  <span className="category-tag">{product.category}</span>
                </div>
                
                <ul className="list-group">
                  <li>$ {product.price}</li>
                  {/* Removed commented list items, added actual discount item */}
                  <li className="list-group-item text-danger">Save 15%</li>
                </ul>
                
                <div className="bad-body">
                  <Link
                    to={"/product/" + product.id}
                    className="btn-dark m-1"
                  >
                    Buy Now
                  </Link>
                  <button
                    className="btn m-1"
                    onClick={() => {
                      toast.success("Added to cart");
                      addProduct(product);
                    }}
                  >
                    Add to Cart
                  </button>
                  
                  {/* Added wishlist button */}
                  <button className="btn-wishlist m-1">Save for later</button>
                </div>
                
                {/* Added stock indicator */}
                <div className="stock-status">
                  {product.inStock ? 
                    <span className="in-stock">In Stock</span> : 
                    <span className="out-of-stock">Out of Stock</span>
                  }
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