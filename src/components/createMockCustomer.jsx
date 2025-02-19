import { useState } from "react";
import PropTypes from "prop-types";

function CreateCustomer({ onCustomerAdded }) {
const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
});

const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/customers/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
    });

    const newCustomer = await response.json();
    onCustomerAdded(newCustomer);
    setCustomer({ name: "", email: "", phone: "", location: "" });
};

return (
    <form onSubmit={handleSubmit}>
    <input type="text" name="name" placeholder="Name" value={customer.name} onChange={handleChange} required />
    <input type="email" name="email" placeholder="Email" value={customer.email} onChange={handleChange} required />
    <input type="text" name="phone" placeholder="Phone" value={customer.phone} onChange={handleChange} required />
    <input type="text" name="location" placeholder="Location" value={customer.location} onChange={handleChange} required />
    <button type="submit">Add Customer</button>
    </form>
);
}
CreateCustomer.propTypes = {
    onCustomerAdded: PropTypes.func.isRequired,
};

export default CreateCustomer;