import { useCart } from "./cartContext";
import { Link } from "react-router-dom";

function OrderConfirmation() {
  const { orders } = useCart();

  // Assuming the last order is the most recent order
  const lastOrder = orders.length > 0 ? orders[orders.length - 1] : null;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Order Confirmation</h1>

      {lastOrder ? (
        <>
          <h2>Order ID: {lastOrder.id}</h2>
          <h3>Total Price: ${lastOrder.totalPrice.toFixed(2)}</h3>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {lastOrder.items.map((product) => (
              <li key={product.id} style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}>
                <h4>{product.name}</h4>
                <p>Price: ${product.price}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No order found.</p>
      )}

      <Link to="/orders">
        <button
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          View Orders
        </button>
      </Link>
    </div>
  );
}

export default OrderConfirmation;
