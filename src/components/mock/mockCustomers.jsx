import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ✅ Import Link from react-router-dom

function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("/api/customers");
        const data = await response.json();
        setCustomers(data.customers); // Access the 'customers' array inside the response
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div>
      {/* Button to add a new customer */}
      <Link to="/customers/create">
        <button>Add a Customer</button>
      </Link>

      {customers.length > 0 ? (
        customers.map((customer) => (
          <div key={customer.id}>
            <h2>{customer.name}</h2>
            <p>{customer.email}</p>
            <p>Phone: {customer.phone}</p>
            <p>Location: {customer.location}</p>

            {/* Button to update customer account */}
            <Link to={`/edit-customer/${customer.id}`}>
              <button>Update Customer Account</button>
            </Link>
            <hr />
          </div>
        ))
      ) : (
        <p>Loading customers...</p>
      )}
    </div>
  );
}

export default CustomerList;
