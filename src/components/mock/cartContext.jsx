import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";


const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = () => {
    const newOrder = {
      id: Date.now(),
      items: cart,
      totalPrice: cart.reduce((total, product) => total + product.price, 0),
    };

    setOrders((prevOrders) => [...prevOrders, newOrder]);
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, orders, addToCart, removeFromCart, clearCart, placeOrder }}>
      {children}
    </CartContext.Provider>
  );
};
CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
