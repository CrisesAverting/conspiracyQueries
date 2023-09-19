// import '../../style.css';
import Auth from '../utils/auth';
import React, { useState, useEffect } from 'react';


function ProductList() {
  // if (!auth.isLoggedIn()) {
    // Redirect to the login page or show a message
  //   return <Redirect to="/login" />; // You need to define your login route
  // }
  const [products, setProducts] = useState([]);
// console.log("im getting products");
  useEffect(() => {
    // Make an HTTP GET request to your backend API
    fetch('/api/products')
    // console.log("im fetching products")
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return console.log(response.json)
        // response.json();
      })
      .then((data) => {
        setProducts(data); // Update the products state with fetched data
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, []);
  return (
    
     
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>{product.name}</li>
          // Render other product details as needed
        ))}
      </ul>
    </div>


  );
}

export default ProductList;
