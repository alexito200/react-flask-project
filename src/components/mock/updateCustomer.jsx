import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateCustomer() {
  const { id } = useParams(); // Get the customer ID from the URL
  const navigate = useNavigate(); // Use navigate instead of history

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  useEffect(() => {
    // Fetch the customer details by ID when the component mounts
    const fetchCustomer = async () => {
      try {
        const response = await fetch(`/api/customers/${id}`);
        const data = await response.json();

        // Ensure the response contains the customer object and update state
        if (data && data.customer) {
          setCustomer(data.customer); // Set the customer data to state
        } else {
          console.error("Invalid customer data received:", data);
        }
      } catch (error) {
        console.error("Error fetching customer:", error);
      }
    };

    fetchCustomer();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the updated customer data to the server
    try {
      const response = await fetch(`/api/customers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      });

      if (response.ok) {
        // Redirect to customer list after successful update
        navigate("/customers");
      } else {
        console.error("Failed to update customer");
      }
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  return (
    <div>
      <h2>Update Customer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={customer.name || ""} // Ensure value is never undefined
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={customer.email || ""} // Ensure value is never undefined
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={customer.phone || ""} // Ensure value is never undefined
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={customer.location || ""} // Ensure value is never undefined
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Customer</button>
      </form>
    </div>
  );
}

export default UpdateCustomer;
