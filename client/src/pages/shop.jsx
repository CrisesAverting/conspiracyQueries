
// import '../../style.css';
import React, { useState, useEffect } from 'react';



function ProductList() {

  const [products, setProducts] = useState([])
console.log("im getting products");
  useEffect(() => {
    // Make an HTTP GET request to your backend API
    console.log("fetching stuff")
    fetch('/api/products')
      .then(products => {setProducts(products.data)
      console.log(products)})
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, []);
  return (
    
    

    <div>
      <h1>Product List</h1>
      
    </div>
     

      

  );
}

export default ProductList;
