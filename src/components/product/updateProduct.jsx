import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ConfirmationModal from '../product/productConfirmation';

const UpdateProduct = () => {
const { id } = useParams();
const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
});
const [showModal, setShowModal] = useState(false);
const navigate = useNavigate();

useEffect(() => {
    const fetchProduct = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setProduct(response.data);
    } catch (err) {
        console.error('Error fetching product:', err);
    }
    };

    fetchProduct();
}, [id]);

const updateProduct = async () => {
    const updatedProduct = {
    name: product.name,
    price: product.price,
    description: product.description,
    };

    try {
    await axios.put(`http://localhost:5000/products/${id}`, updatedProduct);
    navigate('/products');
    } catch (err) {
    console.error('Error updating product:', err);
    }
};

const handleUpdateClick = () => {
    setShowModal(true);
};

const handleCloseModal = () => {
    setShowModal(false);
};

const handleRedirectToProducts = () => {
    navigate('/products');
};

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
    ...prevProduct,
    [name]: value,
    }));
};

return (
    <div>
    <h2>Update Product</h2>
    <form>
        <label>
        Product Name:
        <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
        />
        </label>
        <label>
        Price:
        <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
        />
        </label>
        <label>
        Description:
        <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleInputChange}
        />
        </label>
        <button type="button" onClick={handleUpdateClick}>
            Update Product
        </button>
        <button type="button" onClick={handleRedirectToProducts} style={{ marginTop: '10px' }}>
                Back to Product List
        </button>
    </form>

    <ConfirmationModal
        show={showModal}
        onClose={handleCloseModal}
        onConfirm={updateProduct}
        actionType="update"
    />
    </div>
);
};

export default UpdateProduct;
