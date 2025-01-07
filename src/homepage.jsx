import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './homePage.css';

const HomePage = () => {

    const [customers, setCustomers] = useState([]);
    const [showCustomers, setShowCustomers] = useState(false);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/customers');
            setCustomers(response.data);
            setShowCustomers(true);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    return (
        <Container fluid className="home-container">
            <Row className="home-row justify-content-center align-items-center">
                <Col md={8} className="text-center">
                    <h1>Welcome to the E-Commerce App!</h1>
                    <p>Manage products, orders, and customers with ease.</p>
                    <p>
                        <Button as={Link} to="/products/" variant="primary" className="m-2">
                            Start Shopping
                        </Button>
                        <Button as={Link} to="/customers/" variant="success" onClick={fetchCustomers} className="m-2">
                            View Customers
                        </Button>
                    </p>
                    {showCustomers && (
                        <ListGroup>
                            {customers.map((customer) => (
                                <ListGroup.Item key={customer.id}>
                                    {customer.name} - {customer.email}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;
