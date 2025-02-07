# from supabase_client import supabase

# def add_customer(name, email=None, phone=None):
#     data = {"name": name, "email": email, "phone": phone}
#     response = supabase.table("Customers").insert(data).execute()
#     return response.data if response.data else response.error

# def fetch_customers():
#     response = supabase.table("Customers").select("*").execute()
#     return response.data if response.data else response.error

# def update_customer(customer_id, updated_data):
#     response = supabase.table("Customers").update(updated_data).eq("id", customer_id).execute()
#     return response.data if response.data else response.error

# def delete_customer(customer_id):
#     response = supabase.table("Customers").delete().eq("id", customer_id).execute()
#     return response.data if response.data else response.error

# def add_product(name, price):
#     data = {"name": name, "price": price}
#     response = supabase.table("Products").insert(data).execute()
#     return response.data if response.data else response.error

# def fetch_products():
#     response = supabase.table("Products").select("*").execute()
#     return response.data if response.data else response.error

# def update_product(product_id, updated_data):
#     response = supabase.table("Products").update(updated_data).eq("id", product_id).execute()
#     return response.data if response.data else response.error

# def delete_product(product_id):
#     response = supabase.table("Products").delete().eq("id", product_id).execute()
#     return response.data if response.data else response.error

# def add_order(date, customer_id, delivery_date, order_products=None):
#     data = {
#         "date": date,
#         "customer_id": customer_id,
#         "delivery_date": delivery_date,
#         "order_products": order_products
#     }
#     response = supabase.table("Orders").insert(data).execute()
#     return response.data if response.data else response.error

# def fetch_orders():
#     response = supabase.table("Orders").select("*").execute()
#     return response.data if response.data else response.error

# def update_order(order_id, updated_data):
#     response = supabase.table("Orders").update(updated_data).eq("id", order_id).execute()
#     return response.data if response.data else response.error

# def delete_order(order_id):
#     response = supabase.table("Orders").delete().eq("id", order_id).execute()
#     return response.data if response.data else response.error

# def add_customer_account(username, password, customer_id=None):
#     data = {"username": username, "password": password, "customer_id": customer_id}
#     response = supabase.table("Customer_Accounts").insert(data).execute()
#     return response.data if response.data else response.error

# def fetch_customer_accounts():
#     response = supabase.table("Customer_Accounts").select("*").execute()
#     return response.data if response.data else response.error

# def update_customer_account(account_id, updated_data):
#     response = supabase.table("Customer_Accounts").update(updated_data).eq("id", account_id).execute()
#     return response.data if response.data else response.error

# def delete_customer_account(account_id):
#     response = supabase.table("Customer_Accounts").delete().eq("id", account_id).execute()
#     return response.data if response.data else response.error
