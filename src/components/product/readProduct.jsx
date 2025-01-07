import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductDetail = () => {
const { id } = useParams();
const [product, setProduct] = useState(null);
const [error, setError] = useState('');
const navigate = useNavigate();

useEffect(() => {
    const fetchProduct = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setProduct(response.data);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
        setError('Error retrieving product details');
    }
    };

    fetchProduct();
}, [id]);

if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
}

if (!product) {
    return <div>Loading...</div>;
}

return (
    <div>
    <h2>Product Details</h2>
    <div>
        <h3>{product.name}</h3>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Description:</strong> {product.description}</p>
    </div>
    <button onClick={() => navigate('/products')}>Back to Product List</button>
    </div>
);
};

export default ProductDetail;
