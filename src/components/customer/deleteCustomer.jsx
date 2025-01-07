import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Alert, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const CustomerDetail = () => {
const { id } = useParams();
const navigate = useNavigate();
const [customer, setCustomer] = useState(null);
const [error, setError] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchCustomerDetails = async () => {
    try {
        const response = await axios.get(`http://localhost:5173/customers/${id}`);
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

const handleDeleteCustomer = async () => {
    try {
    await axios.delete(`http://localhost:5000/customers/${id}`);
    navigate('/customers');
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
    setError('An error occurred while deleting the customer.');
    }
};

if (loading) {
    return <div>Loading...</div>;
}

if (error) {
    return <Alert variant="danger">{error}</Alert>;
}

if (!customer) {
    return <div>Customer not found</div>;
}

return (
    <div className="customer-detail">
    <h2>Customer Details</h2>
    <Card>
        <Card.Body>
        <Card.Title>{customer.name}</Card.Title>
        <Card.Text>Email: {customer.email}</Card.Text>
        <Card.Text>Phone: {customer.phone}</Card.Text>
        <Button variant="danger" onClick={handleDeleteCustomer}>
            Delete Customer
        </Button>
        </Card.Body>
    </Card>
    </div>
);
};

export default CustomerDetail;
