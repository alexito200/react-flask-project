import { useState, useEffect } from 'react';
import { Container, ListGroup, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CustomersPage = () => {
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/customers');
                setCustomers(response.data);
            } catch (error) {
                setError('Error fetching customers. Please try again later.');
                console.error('Fetch error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    return (
        <Container>
            <h1 className="my-4">Customer List</h1>
            {loading && <p>Loading customers...</p>}
            {error && <Alert variant="danger">{error}</Alert>}
            
            <ListGroup>
                {customers.map((customer) => (
                    <ListGroup.Item key={customer.id}>
                        <p><strong>Name:</strong> {customer.name}</p>
                        <p><strong>Email:</strong> {customer.email}</p>
                        <Button 
                            variant="primary" 
                            onClick={() => navigate(`/customers/${customer.id}`)}
                        >
                            View Details
                        </Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default CustomersPage;
