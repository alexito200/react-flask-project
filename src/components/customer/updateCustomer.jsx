import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateCustomer = () => {
const { id } = useParams();
const navigate = useNavigate();
const [customer, setCustomer] = useState({ name: '', email: '', phone: '' });
const [error, setError] = useState(null);
const [loading, setLoading] = useState(true);
const [isSubmitting, setIsSubmitting] = useState(false);

useEffect(() => {
    const fetchCustomerDetails = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/customers/${id}`);
        setCustomer(response.data);
        setError(null);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
        setError('An error occurred while fetching the customer details.');
    } finally {
        setLoading(false);
    }
    };

    fetchCustomerDetails();
}, [id]);

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
    ...prevCustomer,
    [name]: value,
    }));
};

const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
    await axios.put(`http://localhost:5000/customers/${id}`, customer);
    navigate(`/customers/${id}`);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
    setError('An error occurred while updating the customer details.');
    } finally {
    setIsSubmitting(false);
    }
};

if (loading) {
    return <div>Loading...</div>;
}

if (error) {
    return <Alert variant="danger">{error}</Alert>;
}

return (
    <div className="update-customer">
    <h2>Update Customer Details</h2>
    <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={customer.name}
            onChange={handleInputChange}
            required
        />
        </Form.Group>

        <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={customer.email}
            onChange={handleInputChange}
            required
        />
        </Form.Group>

        <Form.Group controlId="formPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control
            type="text"
            placeholder="Enter phone number"
            name="phone"
            value={customer.phone}
            onChange={handleInputChange}
            required
        />
        </Form.Group>

        {error && <Alert variant="danger">{error}</Alert>}

        <Button variant="primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Updating...' : 'Update'}
        </Button>
    </Form>
    </div>
);
};

export default UpdateCustomer;
