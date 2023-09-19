// import '../../style.css';
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
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log(response.json())
        return response.json();
      })
      .then((data) => {
        console.log('success!');
        setProducts(data); // Update the products state with fetched data
      })
      .catch((error) => {
        console.log('fuck')
        console.error(error);
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
