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

        {filter.map((product, index) => {
          const isEven = index % 2 === 0;
          return (
            <article // Changed from div to article
              id={`product-card-${product.id}`} // Changed id format
              key={`${product.category}-${product.id}`} // Changed key format
              className={`product-item ${isEven ? 'even-item' : 'odd-item'} col-lg-3 col-md-4 col-sm-6 col-12 mb-4`} // Changed classes and added conditional classes
              data-product-id={product.id} // Added data attribute
              data-category={product.category} // Added data attribute
              style={{ 
                animationDelay: `${index * 0.1}s` // Added inline style
              }}
              onMouseEnter={() => highlightProduct(product.id)} // Added event handler
            >
              {/* Added discount badge conditionally */}
              {product.discountPercentage > 0 && (
                <div className="discount-badge">
                  {product.discountPercentage}% OFF
                </div>
              )}
              
              <div 
                className={`card text-center h-100 ${product.featured ? 'featured-card' : ''}`} // Added conditional class
                key={product.id}
                role="article" // Added ARIA role
                tabIndex={0} // Added tabIndex
              >
                {/* Added wishlist button */}
                <button 
                  type="button"
                  className="wishlist-btn"
                  aria-label={`Add ${product.title} to wishlist`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                >
                  <i className="fa fa-heart"></i>
                </button>
                
                <div className="image-container position-relative"> {/* Added wrapper div */}
                  <img
                    className={`product-image card-img-top p-3 ${product.isNew ? 'new-product' : ''}`} // Changed class and added conditional class
                    src={product.image}
                    alt={`Product: ${product.title}`} // Changed alt text
                    height={250} // Changed height
                    width="auto" // Added width
                    loading="lazy" // Added attribute 
                    onError={(e) => e.target.src = '/assets/placeholder.jpg'} // Added event handler
                  />
                  
                  {/* Added quick view button */}
                  <button 
                    className="quick-view-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      openQuickView(product);
                    }}
                  >
                    Quick View
                  </button>
                </div>
                
                {/* Changed class name completely */}
                <div className="product-details p-3">
                  {/* Added category label */}
                  <span className="category-label">{product.category}</span>
                  
                  <h4 className="product-title text-truncate" title={product.title}> {/* Changed tag and class */}
                    {product.title}
                  </h4>
                  
                  {/* Added rating component */}
                  <div className="product-rating">
                    {[1, 2, 3, 4, 5].map(star => (
                      <span key={star} className={star <= product.rating ? 'star-filled' : 'star-empty'}>
                        ★
                      </span>
                    ))}
                    <span className="rating-count">({product.ratingCount})</span>
                  </div>
                  
                  <div className="product-description"> {/* Changed wrapper */}
                    <p className="description-text" title={product.description}> {/* Changed class */}
                      {product.description.length > 75 ? 
                        product.description.substring(0, 75) + '...' : 
                        product.description
                      } {/* Changed truncation logic */}
                    </p>
                  </div>
                </div>
                
                {/* Changed to div from ul and completely restructured */}
                <div className="product-pricing py-2">
                  <div className="price-container">
                    {product.discountPercentage > 0 && (
                      <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                    )}
                    <span className={`current-price ${product.onSale ? 'sale-price' : ''}`}>
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  
                  {/* Added stock indicator */}
                  <div className={`stock-indicator ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </div>
                </div>
                
                {/* Completely restructured action section */}
                <div className="product-actions d-flex justify-content-between p-3 bg-light">
                  <Link
                    to={`/shop/product/${product.id}`} // Changed URL format
                    className="view-details-btn"
                    aria-label={`View details for ${product.title}`} // Added ARIA label
                    onClick={(e) => {
                      e.stopPropagation();
                      trackProductClick(product);
                    }}
                  >
                    View Details
                  </Link>
                  
                  <div className="action-buttons">
                    <button
                      className={`add-to-cart-btn ${!product.inStock ? 'disabled' : ''}`} // Changed class and added conditional class
                      disabled={!product.inStock} // Added conditional disable
                      onClick={(e) => {
                        e.stopPropagation();
                        if (product.inStock) {
                          addToCart(product, 1);
                          showAddedToCartNotification(product.title);
                        }
                      }} // Changed event handler completely
                      aria-label={`Add ${product.title} to cart`} // Added ARIA label
                    >
                      <i className="fa fa-shopping-cart me-2"></i> {/* Added icon */}
                      {product.inStock ? 'Add to Cart' : 'Sold Out'}
                    </button>
                    
                    {/* Added compare button */}
                    <button
                      className="compare-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCompare(product);
                      }}
                      aria-label={`Add ${product.title} to comparison`}
                    >
                      <i className="fa fa-exchange"></i>
                    </button>
                  </div>
                </div>
                
                {/* Added delivery information */}
                {product.freeShipping && (
                  <div className="free-shipping-badge">
                    Free Shipping
                  </div>
                )}
              </div>
            </article>
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