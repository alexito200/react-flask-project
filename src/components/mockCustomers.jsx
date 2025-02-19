import { useEffect, useState } from "react";
import { makeServer } from "../mirage/mirageServer";

function CustomerList() {
const [customers, setCustomers] = useState([]);

useEffect(() => {
    fetch("/api/customers")
    .then((response) => response.json())
    .then((data) => setCustomers(data))
    .catch((error) => console.error("Error fetching customers:", error));
}, []);

useEffect(() => {
    let server;
    if (import.meta.env.MODE === "development") {
      server = makeServer(); // Start MirageJS only when this component loads
    }

    fetch("/api/customers")
    .then((response) => response.json())
    .then((data) => setCustomers(data))
    .catch((error) => console.error("Error fetching customers:", error));

return () => {
    if (server) {
      server.shutdown(); // Shut down Mirage when the component unmounts
    }
};
}, []);

return (
    <div>
    {customers.length > 0 ? (
        customers.map((customer) => (
        <div key={customer.id}>
            <h2>{customer.name}</h2>
            <p>{customer.email}</p>
            <p>Phone: ${customer.phone}</p>
            <p>Location: {customer.location}</p>
            <hr />
        </div>
        ))
    ) : (
        <p>Loading products...</p>
    )}
    </div>
);
}

export default CustomerList;
