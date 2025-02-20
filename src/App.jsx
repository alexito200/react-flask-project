import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./components/mock/cartContext";
import CustomerDetail from "./components/customer/deleteCustomer";
import CustomerDetails from "./components/customer/readCustomer";
import CreateCustomer from "./components/mock/createMockCustomer";
import UpdateCustomer from "./components/mock/updateCustomer";
import CustomerList from "./components/mock/mockCustomers";
import CreateMockProduct from "./components/mock/createMockProduct";
import ProductDetail from "./components/product/deleteProduct";
import OrderPage from './components/mock/mockOrders';
import ProductList from "./components/mock/mockProducts";
import UpdateProduct from "./components/mock/updateProduct";
import Navigation from "./navigation";
import HomePage from "./homepage";
import ShoppingCart from "./components/mock/shoppingCart";
import OrderConfirmation from './components/mock/mockOrderConfirmation';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div>
          <Navigation />
          <div className="container mt-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/customers/update/:id" element={<UpdateCustomer />} />
              <Route path="/customers" element={<CustomerList />} />
              <Route path="/customers/:id" element={<CustomerDetails />} />
              <Route path="/customers/create" element={<CreateCustomer />} />
              <Route path="/edit-customer/:id" element={<UpdateCustomer />} />
              <Route path="/customers/:id" element={<CustomerDetail />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/create-product" element={<CreateMockProduct />} />
              <Route path="/update-product/:id" element={<UpdateProduct />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/orders" element={<OrderPage />} />
              <Route path="/shopping-cart" element={<ShoppingCart />} />
              <Route path="/checkout" element={<OrderConfirmation />} />
            </Routes>
          </div>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
