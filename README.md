<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#readme-top">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#home-page">Home Page</a></li>
        <li><a href="#products-list">Products List</a></li>
        <li><a href="#create-product">Create Product</a></li>
        <li><a href="#delete-product">Delete Product</a></li>
        <li><a href="#update-product">Update Product</a></li>
        <li><a href="#place-order">Place Order</a></li>
        <li><a href="#create-customer">Create Customer</a></li>
        <li><a href="#customer-list">Customer List</a></li>
        <li><a href="#app">App</a></li>
        <li><a href="#app-backend">App Backend</a></li>
        <li><a href="#main">Main</a></li>
        <li><a href="#navigation">Navigation</a></li>
      </ul>
    </li>
</details>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/alexito200/react-flask-project && cd react-flask-project
   ```
2. Set up .env file
   ```sh
   cp .env.example .env
   ```
3. Install backend dependencies
   ```sh
   python -m venv venv && source venv/bin/activate
   pip install -r requirements.txt
   ```
4. Install NPM packages
   ```sh
   npm install
   ```
5. Run Flask server
   ```sh
   flask run
   ```
6. Set up frontend
   ```sh
   cd frontend
   npm install
   npm run dev
   ```
7. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

This section will give an explanation of the inner workings of the app

### Home Page
The home page of this fullstack app includes a navbar with four links, a welcome message, a short description of the app, and two buttons to start using the app.

![react-flask-homepage](https://github.com/user-attachments/assets/b9f58a66-7877-443c-a088-3d6a7ac72b96)


### Products List
The Start Shopping button in the home page directs the user to the Products List. The list is made up of products fetched from our backend that can be updated in our frontend. The list provides us with the name and price of the product, as well as a link to view the product details. The user can also see their active tab on the navbar because it turns into a different color than the rest.

![products-page](https://github.com/user-attachments/assets/dfdcc140-37df-44d2-b10c-3d985b0c584f)


### Create Product
The Create Product page is made up of three input boxes and two buttons. The input boxes are for the product name, price, and description. The price box has arrows that allow the user to increment or decrement the number with just a click. The Create Product button will trigger a modal pop up to confirm the creation of this new product. 

![add-product](https://github.com/user-attachments/assets/5a68fada-afb7-46b1-b6e2-9dd37dbf57e9)


### Delete Product
To delete a product, the user can click a big, red button that'll trigger a confirmation modal when clicked. 

![delete-confimation](https://github.com/user-attachments/assets/823c4ceb-9902-412c-8845-1c6d082a8c6e)


### Update Product
The Update Product page includes three input boxes and two buttons. Product name, price, and description are the three input boxes and Update Product, and Back to Product List are the two buttons. The fields must be filled out and the user can click on the Update Product button to trigger a confirmation modal.  

![update-product](https://github.com/user-attachments/assets/ae84063d-4589-44db-8614-c3304d2462a1)


### Place Order
To place an order, the user clicks on the Place Order tab located in the navbar. The fields that must be completed are Customer ID, Order Date, Delivery Date, and a product selection. The Place Order button will require these fields to be complete before triggering a confirmation modal. For the date fields, the user can choose to either fill in one by one the month, day, and year, or they can choose to use the calendar dropdrown.

![place-order](https://github.com/user-attachments/assets/c682d4b5-d9c7-4214-aec3-e25e5a028efc)


### Create Customer
To Crate a Customer, the user clicks on the Create Account tab located in the navbar. This page includes three input boxes and a submit button. Name, email, and phone number are the required fields for a new customer to be added. 

![add-customers](https://github.com/user-attachments/assets/1fe10e72-1bba-4a77-b420-2fa2f05a24fa)


### Customer List
The user can view all the existing customers in the database by navigating with the View Customers tab. This page includes all the users' names and emails. This app is meant for a user with an administration role which is why they would have access to all of the customers. 

![customers-list](https://github.com/user-attachments/assets/dfe62a95-e22b-465b-b71e-78f16851d174)


### App
The App file for this fullstack app is where all of the routes are set up using Browser Router from React Router DOM.
```
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
```


### App Backend
The backend code is written in Python and stored in a separate folder. The backend code sets up the communication betweent the backend and frontend using CORS. The backend code also contains our database schemas (the app uses MySQL) and our CRUD operations. We've also added an extra layer of security by not exposing our backend credentials. This was achieved by creating an .env file and storing our credentials in there.

```
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
```
### Main
Our Main file code is our wrapping of the App in StrictMode which helps us to catch potential issues within our React app.

```
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### Navigation
The Navigation file code gives us our navbar that is used throughout the app. The Navigation code also sets up paths for our links to direct the user to.

this is what the navbar looks like behind-the-scenes:
```
return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
    <Navbar.Brand as={Link} to="/">E-Commerce App</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link as={Link} to="/products" active={location.pathname === "/products"}>Products</Nav.Link>
        <Nav.Link as={Link} to="/orders/create" active={location.pathname === "/orders/create"}>Place Order</Nav.Link>
        <Nav.Link as={Link} to="/customers/create" active={location.pathname === "/customers/create"}>Create Account</Nav.Link>
        <Nav.Link as={Link} to="/customers" active={location.pathname === "/customers"}>View Customers</Nav.Link>
        </Nav>
    </Navbar.Collapse>
    </Navbar>
);
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>
