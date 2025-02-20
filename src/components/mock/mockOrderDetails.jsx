import { useParams } from "react-router-dom";
import { useCart } from "./cartContext";

function OrderDetails() {
const { id } = useParams(); 
const { orders } = useCart();

const orderId = Number(id);
const order = orders.find((order) => order.id === orderId);

if (!order) {
    return <h2>Order not found</h2>;
}

return (
    <div>
    <h1>Order Details</h1>
    <h2>Order ID: {order.id}</h2>
    <ul>
        {order.items.map((product, index) => (
        <li key={index}>
            {product.name} - ${product.price.toFixed(2)}
        </li>
        ))}
    </ul>
    <p>Total: ${order.items.reduce((total, product) => total + (product.price || 0), 0).toFixed(2)}</p>
    </div>
);
}

export default OrderDetails;
