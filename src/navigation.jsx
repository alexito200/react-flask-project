import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from './components/mock/cartContext';

const Navigation = () => {
    const location = useLocation();
    const { cart } = useCart();

    return (
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Navbar.Brand as={Link} to="/">E-Commerce App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/products" active={location.pathname === "/products"}>Products</Nav.Link>
                    {/* <Nav.Link as={Link} to="/orders/create" active={location.pathname === "/orders/create"}>Place Order</Nav.Link> */}
                    <Nav.Link as={Link} to="/customers/create" active={location.pathname === "/customers/create"}>Create Account</Nav.Link>
                    <Nav.Link as={Link} to="/customers" active={location.pathname === "/customers"}>View Customers</Nav.Link>
                </Nav>
                
                {/* Cart Icon with Badge */}
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/shopping-cart" style={{ position: "relative", color: "white" }}>
                        <FaShoppingCart size={24} />
                        {cart.length > 0 && (
                            <span style={{
                                position: "absolute",
                                top: "0px",
                                right: "-10px",
                                background: "red",
                                color: "white",
                                borderRadius: "50%",
                                padding: "2px 6px",
                                fontSize: "12px",
                            }}>
                                {cart.length}
                            </span>
                        )}
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navigation;
