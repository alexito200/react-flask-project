import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UpdateCustomer from './components/customer/updateCustomer';
import CustomerDetail from './components/customer/deleteCustomer';
import CustomerDetails from './components/customer/readCustomer';
import CustomerForm from './components/customer/createCustomer';
import CustomerEdit from './components/customer/customerForm';
import CustomersPage from './components/customer/customerList';
import CreateProduct from './components/product/createProduct';
import UpdateProduct from './components/product/updateProduct';
import ProductDetail from './components/product/deleteProduct';
import PlaceOrder from './components/order/placeOrder';
import ListProduct from './components/product/displayProduct';
import Products from './components/product/displayAllProducts';
import Navigation from './navigation';
import HomePage from './homepage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import ProductList from "./components/mockProducts";

const App = () => {
return (
    <Router>
    <div>
        <Navigation />
        <div className="container mt-4">
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/customers/update/:id" element={<UpdateCustomer />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/customers/:id" element={<CustomerDetails />} />
            <Route path="/customers/create" element={<CustomerForm />} />
            <Route path="/edit-customer/:id" element={<CustomerEdit />} />
            <Route path="/customers/:id" element={<CustomerDetail />} />
            <Route path="/products" element={<Products />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/update-product/:id" element={<UpdateProduct />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/orders" element={<ListProduct />} />
            <Route path="/orders/create" element={<PlaceOrder />} />
        </Routes>
        </div>
    </div>
    </Router>
);
};

export default App;
