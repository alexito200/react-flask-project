// import { useState } from "react";
// import axios from "axios";
// import { Form, Button, Alert, Spinner } from "react-bootstrap";
// import CreateCustomer from "../mock/createMockCustomer";

// const CustomerForm = () => {
// const [customer, setCustomer] = useState({
//     name: "",
//     email: "",
//     phone: "",
// });

// const [error, setError] = useState(null);
// const [success, setSuccess] = useState(false);
// const [loading, setLoading] = useState(false);
//   const [showForm, setShowForm] = useState(false); // ✅ Controls form visibility

// const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCustomer((prevState) => ({
//     ...prevState,
//     [name]: value,
//     }));
// };

// const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//     const { data } = await axios.post(
//         "http://localhost:5000/customers/create",
//         customer
//     );
//     setSuccess(true);
//     setError(null);
//     console.log("Response:", data);

//     setCustomer({
//         name: "",
//         email: "",
//         phone: "",
//     });
//     } catch (err) {
//     console.error("Error:", err);
//     setError("An error occurred while adding the customer.");
//     setSuccess(false);
//     } finally {
//     setLoading(false);
//     }
// };

// return (
//     <div className="customer-form">
//     <h2>Add Customer</h2>
//     {success && <Alert variant="success">Customer added successfully!</Alert>}
//     {error && <Alert variant="danger">{error}</Alert>}

//     <CreateCustomer />

//       {/* ✅ Only show form if showForm is true */}
//     {showForm && (
//         <Form onSubmit={handleSubmit}>
//         <Form.Group controlId="formCustomerName">
//             <Form.Label>Name</Form.Label>
//             <Form.Control
//             type="text"
//             placeholder="Enter customer's name"
//             name="name"
//             value={customer.name}
//             onChange={handleChange}
//             required
//             />
//         </Form.Group>

//         <Form.Group controlId="formCustomerEmail">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//             type="email"
//             placeholder="Enter customer's email"
//             name="email"
//             value={customer.email}
//             onChange={handleChange}
//             required
//             />
//         </Form.Group>

//         <Form.Group controlId="formCustomerPhone">
//             <Form.Label>Phone Number</Form.Label>
//             <Form.Control
//             type="text"
//             placeholder="Enter customer's phone number"
//             name="phone"
//             value={customer.phone}
//             onChange={handleChange}
//             required
//             />
//         </Form.Group>

//         <Button variant="primary" type="submit" disabled={loading}>
//             {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
//         </Button>
//         </Form>
//     )}

//       {/* Optional button to toggle the form visibility */}
//     <Button variant="secondary" onClick={() => setShowForm(!showForm)}>
//         {showForm ? "Hide Form" : "Show Form"}
//     </Button>
//     </div>
// );
// };

// export default CustomerForm;

// // import { useState } from 'react';
// // import axios from 'axios';
// // import { Form, Button, Alert, Spinner } from 'react-bootstrap';
// // import CreateCustomer from '../createMockCustomer';

// // const CustomerForm = () => {
// // const [customer, setCustomer] = useState({
// //     name: '',
// //     email: '',
// //     phone: '',
// // });

// // const [error, setError] = useState(null);
// // const [success, setSuccess] = useState(false);
// // const [loading, setLoading] = useState(false);

// // const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setCustomer((prevState) => ({
// //     ...prevState,
// //     [name]: value,
// //     }));
// // };

// // const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     try {
// //     const { data } = await axios.post('http://localhost:5000/customers/create', customer);
// //     setSuccess(true);
// //     setError(null);
// //     console.log('Response:', data);

// //     setCustomer({
// //         name: '',
// //         email: '',
// //         phone: '',
// //     });
// //     } catch (err) {
// //     console.error('Error:', err);
// //     setError('An error occurred while adding the customer.');
// //     setSuccess(false);
// //     } finally {
// //     setLoading(false);
// //     }
// // };

// // return (
// //     <div className="customer-form">
// //     <h2>Add Customer</h2>
// //     {success && <Alert variant="success">Customer added successfully!</Alert>}
// //     {error && <Alert variant="danger">{error}</Alert>}

// //     <CreateCustomer />
    
// //     <Form onSubmit={handleSubmit}>
// //         <Form.Group controlId="formCustomerName">
// //         <Form.Label>Name</Form.Label>
// //         <Form.Control
// //             type="text"
// //             placeholder="Enter customer's name"
// //             name="name"
// //             value={customer.name}
// //             onChange={handleChange}
// //             required
// //         />
// //         </Form.Group>

// //         <Form.Group controlId="formCustomerEmail">
// //         <Form.Label>Email</Form.Label>
// //         <Form.Control
// //             type="email"
// //             placeholder="Enter customer's email"
// //             name="email"
// //             value={customer.email}
// //             onChange={handleChange}
// //             required
// //         />
// //         </Form.Group>

// //         <Form.Group controlId="formCustomerPhone">
// //         <Form.Label>Phone Number</Form.Label>
// //         <Form.Control
// //             type="text"
// //             placeholder="Enter customer's phone number"
// //             name="phone"
// //             value={customer.phone}
// //             onChange={handleChange}
// //             required
// //         />
// //         </Form.Group>

// //         <Button variant="primary" type="submit" disabled={loading}>
// //         {loading ? <Spinner animation="border" size="sm" /> : 'Submit'}
// //         </Button>
// //     </Form>
// //     </div>
// // );
// // };

// // export default CustomerForm;
