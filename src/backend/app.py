from sqlalchemy.orm import DeclarativeBase, relationship, backref
from sqlalchemy import Integer, String, Float, Date
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from marshmallow import fields, ValidationError
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from flask_cors import CORS
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL') or \
                                        f'mysql+mysqlconnector://root:Vitoria96!@localhost:3306/e_commerce_api'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

class Customer(db.Model):
    __tablename__ = 'Customers'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(320))
    phone = db.Column(db.String(15))
    orders = db.relationship('Order', backref='customer')

class Order(db.Model):
    __tablename__ = 'Orders'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    delivery_date = db.Column(db.Date, nullable=False)
    order_products = db.Column(db.String, nullable=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('Customers.id'))

class CustomerAccount(db.Model):
    __tablename__ = 'Customer_Accounts'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey('Customers.id'))
    customer = db.relationship('Customer', backref='customer_account', uselist=False)

order_product = db.Table('Order_Product',
        db.Column('order_id', db.Integer, db.ForeignKey('Orders.id'), primary_key=True),
        db.Column('product_id', db.Integer, db.ForeignKey('Products.id'), primary_key=True)
)

class Product(db.Model):
    __tablename__ = 'Products'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    orders = db.relationship('Order', secondary=order_product, backref=db.backref('products'))

class CustomerSchema(ma.Schema):
    id = fields.Integer(required=True)
    name = fields.String(required=True)
    email = fields.String(required=True)
    phone = fields.Integer(required=True)
    
    class Meta:
        fields = ('id', 'name', 'email', 'phone')

customer_schema = CustomerSchema()
customers_schema = CustomerSchema(many=True)

class CustomerAccountSchema(ma.Schema):
    username = fields.String(required=True)
    password = fields.String(required=True)
    customer_id = fields.String(required=True)
    
    class Meta:
        fields = ('username', 'password', 'customer_id')

customeraccount_schema = CustomerAccountSchema()
customeraccounts_schema = CustomerAccountSchema(many=True)

class ProductSchema(ma.Schema):
    id = fields.Integer(required=True)
    name = fields.String(required=True)
    price = fields.Integer(required=True)
    
    class Meta:
        fields = ('id', 'name', 'price')

product_schema = ProductSchema()
products_schema = ProductSchema(many=True)

class OrderSchema(ma.Schema):
    id = fields.Integer(required=True)
    date = fields.String(required=True)
    delivery_date = fields.String(required=True)
    order_products = fields.String(required=True)
    customer_id = fields.Integer(required=True)
    
    class Meta:
        fields = ('id', 'date', 'delivery_date', 'order_products', 'customer_id')

customer_schema = CustomerSchema()
customers_schema = CustomerSchema(many=True)
customer_account_schema = CustomerAccountSchema()
customer_accounts_schema = CustomerAccountSchema(many=True)
product_schema = ProductSchema()
products_schema = ProductSchema(many=True)
order_schema = OrderSchema()
orders_schema = OrderSchema(many=True)

# Customers #

@app.route('/customers', methods=['GET'])
def get_customers():
    customers = Customer.query.all()
    customers_list = [customer_schema.dump(customer) for customer in customers]
    return jsonify(customers_list)

@app.route('/customer', methods=['GET'])
def get_customer_by_id(id):
    customer = Customer.query.get_or_404(id)
    return customer_schema.jsonify(customer)

@app.route('/customers/create', methods=['POST'])
def add_customers():
    try:
        customer_data = customer_schema.load(request.json)
    except ValidationError as err:
        return jsonify(err.messages), 400
    
    new_customer = Customer(id=customer_data['id'], name=customer_data['name'], email=customer_data['email'], phone=customer_data['phone'])
    db.session.add(new_customer)
    db.session.commit()
    return jsonify({'message': 'New customer added successfully'}), 201

@app.route('/customers/<int:id>', methods=['PUT'])
def update_customers(id):
    customer = Customer.query.get_or_404(id)
    try:
        customer_data = customer_schema.load(request.json)
    except ValidationError as err:
        return jsonify(err.messages), 400
    
    customer.id = customer_data['id']
    customer.name = customer_data['name']
    customer.email = customer_data['email']
    customer.phone = customer_data['phone']
    db.session.commit()
    return jsonify({'message': 'Customer details updated successfully'}), 200

@app.route('/customers/<int:id>', methods=['DELETE'])
def delete_customer(id):
    customer = Customer.query.get_or_404(id)
    db.session.delete(customer)
    db.session.commit()
    return jsonify({'message': 'Customer removed successfully'}), 200

# ------------------------------------------------------------------------------------------------------- #
# ------------------------------------------------------------------------------------------------------- #
                                # End of Customers CRUD #
# Customer Accounts #

@app.route('/customer_accounts', methods=['GET'])
def get_customer_accounts():
    customer_accounts = CustomerAccount.query.all()
    return customeraccounts_schema.jsonify(customer_accounts)

@app.route('/customer_accounts', methods=['POST'])
def add_customer_accounts():
    try:
        customer_account_data = customeraccount_schema.load(request.json)
    except ValidationError as err:
        return jsonify(err.messages), 400
    
    new_customer_account = CustomerAccount(username=customer_account_data['username'], password=customer_account_data['password'], customer_id=customer_account_data['customer_id'])
    db.session.add(new_customer_account)
    db.session.commit()
    return jsonify({'message': 'New customer account added successfully'}), 201

@app.route('/customer_accounts/<int:id>', methods=['PUT'])
def update_customer_accounts(id):
    customer_account = CustomerAccount.query.get_or_404(id)
    try:
        customer_account_data = customeraccount_schema.load(request.json)
    except ValidationError as err:
        return jsonify(err.messages), 400
    
    customer_account.username = customer_account_data['username']
    customer_account.password = customer_account_data['password']
    customer_account.customer_id = customer_account_data['customer_id']
    db.session.commit()
    return jsonify({'message': 'Customer account details updated successfully'}), 200

@app.route('/customer_accounts/<int:id>', methods=['DELETE'])
def delete_customer_accounts(id):
    customer_account = CustomerAccount.query.get_or_404(id)
    db.session.delete(customer_account)
    db.session.commit()
    return jsonify({'message': 'Customer account removed successfully'}), 200



# ------------------------------------------------------------------------------------------------------- #
# ------------------------------------------------------------------------------------------------------- #
                                # End of Customer Accounts CRUD #
# Products #

@app.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    products_list = [{"id": p.id, "name": p.name, "price": p.price, "order": p.orders} for p in products]
    return jsonify(products_list)

@app.route('/products/<int:id>', methods=['GET'])
def get_product_by_id(id):
    product = Product.query.get_or_404(id)
    return jsonify({"id": product.id, "name": product.name, "price": product.price, "order": product.orders})

@app.route('/create-product', methods=['POST'])
def add_products():
    try:
        product_data = product_schema.load(request.json)
    except ValidationError as err:
        return jsonify(err.messages), 400
    
    new_product = Product(id=product_data['id'], name=product_data['name'], price=product_data['price'])
    db.session.add(new_product)
    db.session.commit()
    return jsonify({'message': 'New product added successfully'}), 201

@app.route('/products/<int:id>', methods=['PUT'])
def update_products(id):
    product = Product.query.get_or_404(id)
    try:
        product_data = product_schema.load(request.json)
    except ValidationError as err:
        return jsonify(err.messages), 400
    
    product.id = product_data['id']
    product.name = product_data['name']
    product.price = product_data['price']
    db.session.commit()
    return jsonify({'message': 'Product details updated successfully'}), 200

@app.route('/products/<int:id>', methods=['DELETE'])
def delete_products(id):
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product removed successfully'}), 200



# ------------------------------------------------------------------------------------------------------- #
# ------------------------------------------------------------------------------------------------------- #
                                # End of Products CRUD #
# Orders #

@app.route('/orders', methods=['GET'])
def get_order():
    orders = Order.query.all()
    return orders_schema.jsonify(orders)

@app.route('/orders', methods=['POST'])
def add_orders():
    try:
        order_data = order_schema.load(request.json)
    except ValidationError as err:
        return jsonify(err.messages), 400

    customer = Customer.query.get(order_data['customer_id'])
    if not customer:
        return jsonify({"error": "Customer not found"}), 404

    product_ids = [int(pid) for pid in order_data['order_products'].split(',')]
    products = Product.query.filter(Product.id.in_(product_ids)).all()
    
    if len(products) != len(product_ids):
        return jsonify({"error": "One or more products not found"}), 404

    total_price = sum([p.price for p in products])

    new_order = Order(
        id=order_data['id'],
        date=order_data['date'],
        delivery_date=order_data['delivery_date'],
        order_products=order_data['order_products'],
        customer_id=order_data['customer_id']
    )
    
    db.session.add(new_order)
    db.session.commit()

    return jsonify({
        'message': 'New order added successfully',
        'total_price': total_price
    }), 201


@app.route('/orders/<int:id>', methods=['PUT'])
def update_orders(id):
    order = Order.query.get_or_404(id)
    try:
        order_data = order_schema.load(request.json)
    except ValidationError as err:
        return jsonify(err.messages), 400
    
    order.id = order_data['id']
    order.date = order_data['date']
    order.delivery_date = order_data['delivery_date']
    order.order_products = order_data['order_products']
    order.customer_id = order_data['customer_id']
    db.session.commit()
    return jsonify({'message': 'Order details updated successfully'}), 200

@app.route('/orders/<int:id>', methods=['DELETE'])
def delete_orders(id):
    order = Order.query.get_or_404(id)
    db.session.delete(order)
    db.session.commit()
    return jsonify({'message': 'Order removed successfully'}), 200



# ------------------------------------------------------------------------------------------------------- #
# ------------------------------------------------------------------------------------------------------- #
                                # End of Orders CRUD #

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    with app.app_context():
        db.metadata.clear()
        db.create_all()
        app.run(debug=True)