// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import ProductList from "../mock/mockProducts";

// const Products = () => {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         axios.get('http://localhost:5000/products')  
//             .then(response => {
//                 if (Array.isArray(response.data)) {
//                     setProducts(response.data);
//                 } else {
//                     setProducts([]);
//                     console.error('Expected an array but got:', response.data);
//                 }
//             })
//             .catch(error => console.error('Error fetching products:', error));
//     }, []);

//     return (
//         <div>
//             <h2>Product List</h2>
//             <Link to="/create-product">
//                 <button>Add Product</button>
//             </Link>
//             <ul>
//                 {Array.isArray(products) && products.map(product => (
//                     <li key={product.id}>
//                         <p><strong>{product.name}</strong> - ${product.price}</p>
//                         <Link to={`/products/${product.id}`}>View Details</Link>
//                     </li>
//                 ))}
//             </ul>
//                         <ProductList />
//         </div>
//     );
// };

// export default Products;
