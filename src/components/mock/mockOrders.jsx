import { useCart } from "./cartContext";
import { Link } from "react-router-dom";

function Orders() {
  const { orders } = useCart();

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {orders.map((order) => {
            const totalPrice = Array.isArray(order.items)
              ? order.items.reduce((total, product) => total + (product.price || 0), 0)
              : 0;

            return (
              <li key={order.id} style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}>
                <h3>Order ID: {order.id}</h3>
                <p>Total: ${totalPrice.toFixed(2)}</p>
                <Link to={`/order/${order.id}`}>
                  <button
                    style={{
                      backgroundColor: "#28a745",
                      color: "white",
                      padding: "5px 10px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    View Order
                  </button>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Orders;
