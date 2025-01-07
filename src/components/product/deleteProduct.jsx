import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ConfirmationModal from '../product/productConfirmation';

const ProductDetail = () => {
const { id } = useParams(); 
const [product, setProduct] = useState(null);
const [error, setError] = useState('');
const [showModal, setShowModal] = useState(false);
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

const deleteProduct = async () => {
    try {
    await axios.delete(`http://localhost:5000/products/${id}`);
    navigate('/products');
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
    setError('Error deleting product');
    }
};

const handleDeleteClick = () => {
    setShowModal(true);
};

const handleUpdateClick = () => {
    navigate(`/update-product/${id}`);
};

if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
}

if (!product) {
    return <div>Loading...</div>;
}

return (
    <div>
    <h2>Product Detail</h2>
    <div>
        <h3>{product.name}</h3>
        <p>Price: ${product.price}</p>
        <p>{product.description}</p>
    </div>
    <button onClick={handleUpdateClick} style={{ backgroundColor: 'blue', color: 'white', marginRight: '10px' }}>
        Update Product
    </button>
    <button onClick={handleDeleteClick} style={{ backgroundColor: 'red', color: 'white' }}>
        Delete Product
    </button>

    <ConfirmationModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={deleteProduct}
        actionType="delete"
    />
    </div>
);
};

export default ProductDetail;
