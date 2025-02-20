import { useCart } from "./cartContext";
import { Link } from "react-router-dom";

function ShoppingCart() {
  const { cart, removeFromCart, clearCart, placeOrder } = useCart();

  // Calculate total price
  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  const handleCheckout = () => {
    placeOrder(); // Place the order and save it to the orders array
    clearCart();  // Clear the cart
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {cart.map((product) => (
              <li key={product.id} style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}>
                <h3>{product.name}</h3>
                <p>Price: ${product.price}</p>
                <p>{product.description}</p>

                <button
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    padding: "5px 10px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => removeFromCart(product.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <h2>Total: ${totalPrice.toFixed(2)}</h2>
        </>
      )}

      <div style={{ marginTop: "20px" }}>
        {/* Back to Products Button */}
        <Link to="/products">
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
            Back to Products
          </button>
        </Link>

        {/* Checkout Button */}
        {cart.length > 0 && (
          <Link to="/checkout" onClick={handleCheckout}>
            <button
              style={{
                marginLeft: "10px",
                backgroundColor: "#28a745",
                color: "white",
                padding: "10px 15px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Checkout
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default ShoppingCart;
