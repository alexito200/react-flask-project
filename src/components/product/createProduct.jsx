import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ConfirmationModal from '../product/productConfirmation';

const CreateProduct = () => {
const [name, setName] = useState('');
const [price, setPrice] = useState('');
const [description, setDescription] = useState('');
const [showModal, setShowModal] = useState(false);
const navigate = useNavigate();

const createProduct = async () => {
    const newProduct = { name, price, description };

    try {
    await axios.post('http://localhost:5000/products', newProduct);
    navigate('/products');
    } catch (err) {
    console.error('Error creating product', err);
    }
};

const handleCreateClick = () => {
    setShowModal(true);
};

const handleRedirectToProducts = () => {
    navigate('/products');
};

return (
    <div>
    <h2>Create Product</h2>
    <form>
        <label>
        Product Name:
        <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        </label>
        <label>
        Price:
        <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
        />
        </label>
        <label>
        Description:
        <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
        </label>
        <button type="button" onClick={handleCreateClick}>
        Create Product
        </button>
    </form>

    <ConfirmationModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={createProduct}
        actionType="create"
    />

            <button type="button" onClick={handleRedirectToProducts} style={{ marginTop: '10px' }}>
                Back to Product List
            </button>
    </div>
);
};

export default CreateProduct;
