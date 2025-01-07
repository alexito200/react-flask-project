import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const CustomerEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState({
        name: '',
        email: '',
        address: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/customers/${id}`);
                setCustomer(response.data);
            // eslint-disable-next-line no-unused-vars
            } catch (error) {
                setError('Error fetching customer details.');
            } finally {
                setLoading(false);
            }
        };

        fetchCustomerDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:5000/customers/${id}`, customer);
            navigate(`/customer/${id}`);
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setError('Error updating customer details.');
        }
    };

    if (loading) return <p>Loading customer details...</p>;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Container className="mt-4">
            <h2>Edit Customer</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={customer.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={customer.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="text"
                        name="address"
                        value={customer.phone}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Save Changes
                </Button>
                <Button variant="secondary" className="mt-3 ms-2" onClick={() => navigate(`/customers/${id}`)}>
                    Cancel
                </Button>
            </Form>
        </Container>
    );
};

export default CustomerEdit;
