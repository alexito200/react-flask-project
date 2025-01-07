import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const CustomerDetails = () => {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/customers/${id}`);
                setCustomer(response.data);
            } catch (error) {
                setError('Error fetching customer details. Please try again later.');
                console.error('Fetch error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomerDetails();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
                await axios.delete(`http://127.0.0.1:5000/customers/${id}`);
                alert("Customer deleted successfully!");
                navigate('/customers');
            // eslint-disable-next-line no-unused-vars
            } catch (error) {
                setError('Error deleting customer.');
            }
        }
    };

    if (loading) return <p>Loading customer details...</p>;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Container className="mt-4">
            <h2>Customer Details</h2>
            {customer ? (
                <>
                    <p><strong>Name:</strong> {customer.name}</p>
                    <p><strong>Email:</strong> {customer.email}</p>
                    <p><strong>Phone:</strong> {customer.phone || 'N/A'}</p>
                    <Button variant="primary" onClick={() => navigate('/customers')}>
                        Back to Customers
                    </Button>
                    <Button
                        variant="success"
                        className="mt-3 me-2"
                        onClick={() => navigate(`/edit-customer/${id}`)}
                        >
                        Edit Customer
                    </Button>
                    <Button 
                        variant="danger" 
                        className="mt-3 me-2"
                        onClick={handleDelete}
                        >
                        Delete Customer
                    </Button>

                </>
            ) : (
                <p>Customer not found.</p>
            )}
        </Container>
    );
};

export default CustomerDetails;
