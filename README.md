Installation

Create a virtual environment: Bash python -m venv venv

Activate the virtual environment: Bash

On Windows:
venv\Scripts\activate

On macOS/Linux:
source venv/bin/activate

Install dependencies: Bash pip install -r requirements.txt  

Run the application: Bash python app.py

API Endpoints

Customers

Method Endpoint Description GET /customers Get all customers POST /customers Add a new customer PUT /customers/int:id Update customer with given ID DELETE /customers/int:id Delete customer with given ID

Customer Accounts

Method Endpoint Description POST /customer-account Create a new customer account GET /customer-account/int:id Get customer account with given ID PUT /customer-account/int:id Update customer account with given ID DELETE /customer-account/int:id Delete customer account with given ID

Products

Method Endpoint Description GET /products/int:id Get all products POST /products Add a new product PUT /products/int:id Update product with given ID DELETE /products/int:id Delete product with given ID GET /products/int:id Get product by ID

Orders

Method Endpoint Description POST /orders Place a new order

Postman Collection A Postman collection (ecommerce-api.postman_collection.json) is included in the postman-collection folder. You can import this collection into Postman to easily test the API endpoints.
