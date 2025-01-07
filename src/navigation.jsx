import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Navigation = () => {
const location = useLocation();

return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
    <Navbar.Brand as={Link} to="/">E-Commerce App</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link as={Link} to="/products" active={location.pathname === "/products"}>Products</Nav.Link>
        <Nav.Link as={Link} to="/orders/create" active={location.pathname === "/orders/create"}>Place Order</Nav.Link>
        <Nav.Link as={Link} to="/customers/create" active={location.pathname === "/customers/create"}>Create Account</Nav.Link>
        {/* <Nav.Link as={Link} to="/customers/read" active={location.pathname === "/customers/read"}>View Profile</Nav.Link> */}
        <Nav.Link as={Link} to="/customers" active={location.pathname === "/customers"}>View Customers</Nav.Link>
        </Nav>
    </Navbar.Collapse>
    </Navbar>
);
};

export default Navigation;
