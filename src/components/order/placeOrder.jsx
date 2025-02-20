// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const PlaceOrder = () => {
//     const [products, setProducts] = useState([]);
//     const [selectedProducts, setSelectedProducts] = useState([]);
//     const [customerId, setCustomerId] = useState('');
//     const [date, setDate] = useState('');
//     const [deliveryDate, setDeliveryDate] = useState('');

//     useEffect(() => {
//         axios.get('http://localhost:5000/products')
//             .then(response => setProducts(response.data))
//             .catch(error => console.error('Error fetching products:', error));
//     }, []);

//     const handleProductChange = (event) => {
//         const value = Array.from(event.target.selectedOptions, option => option.value);
//         setSelectedProducts(value);
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         const orderData = {
//             id: Math.floor(Math.random() * 10000),
//             date,
//             delivery_date: deliveryDate,
//             order_products: selectedProducts.join(','),
//             customer_id: customerId
//         };

//         try {
//             const response = await axios.post('http://localhost:5000/orders', orderData);
//             alert(`Order placed successfully! Total Price: $${response.data.total_price}`);
//         } catch (error) {
//             console.error('Error placing order:', error);
//             alert('Failed to place order. Please check your inputs.');
//         }
//     };

//     return (
//         <div>
//             <h2>Place a New Order</h2>
//             <form onSubmit={handleSubmit}>
//                 <label>Customer ID:</label>
//                 <input
//                     type="text"
//                     value={customerId}
//                     onChange={(e) => setCustomerId(e.target.value)}
//                     required
//                 />

//                 <label>Order Date:</label>
//                 <input
//                     type="date"
//                     value={date}
//                     onChange={(e) => setDate(e.target.value)}
//                     required
//                 />

//                 <label>Delivery Date:</label>
//                 <input
//                     type="date"
//                     value={deliveryDate}
//                     onChange={(e) => setDeliveryDate(e.target.value)}
//                     required
//                 />

//                 <label>Select Products:</label>
//                 <select multiple={true} value={selectedProducts} onChange={handleProductChange} required>
//                     {products.map(product => (
//                         <option key={product.id} value={product.id}>
//                             {product.name} - ${product.price}
//                         </option>
//                     ))}
//                 </select>

//                 <button type="submit">Place Order</button>
//             </form>
//         </div>
//     );
// };

// export default PlaceOrder;
