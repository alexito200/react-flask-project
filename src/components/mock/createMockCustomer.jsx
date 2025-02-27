import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateCustomer() {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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

    if (response.ok) {
      setMessage("Customer successfully created!");

      setTimeout(() => {
        navigate("/customers");
      }, 2000);

    } else {
      console.error("Failed to create customer");
      setMessage("Error creating customer.");
    }

    setCustomer({ name: "", email: "", phone: "", location: "" });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Create Customer</h1>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={customer.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={customer.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={customer.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={customer.location}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Customer</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateCustomer;
