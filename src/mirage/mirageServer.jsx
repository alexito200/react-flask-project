import { createServer, Model } from "miragejs";

export function makeServer() {
  let server = createServer({
    models: {
      customer: Model,
      product: Model,
    },

    seeds(server) {
      server.create("customer", { id: 1, name: "John Doe", email: "johndoe@example.com", phone: "123-456-7890", location: "New York" });
      server.create("customer", { id: 2, name: "Jane Smith", email: "janesmith@example.com", phone: "987-654-3210", location: "Los Angeles" });
      server.create("customer", { id: 3, name: "Emily Johnson", email: "emilyj@example.com", phone: "555-123-4567", location: "Chicago" });

      server.create("product", { id: 1, name: "Laptop", description: "Powerful laptop", price: 1200, stock: 10 });
      server.create("product", { id: 2, name: "Phone", description: "Smartphone with great camera", price: 800, stock: 15 });
      server.create("product", { id: 3, name: "Tablet", description: "Lightweight and portable", price: 500, stock: 20 });
    },

    routes() {
      this.namespace = "api";

      this.get("/products", (schema) => {
        return schema.products.all();
      });

      this.get("/products/:id", (schema, request) => {
        let id = request.params.id;
        return schema.products.find(id);
      });

      this.post("/products", (schema, request) => {
        let newProduct = JSON.parse(request.requestBody);
        return schema.products.create(newProduct);
      });

      this.put("/products/:id", (schema, request) => {
        let id = request.params.id;
        let attrs = JSON.parse(request.requestBody);
        return schema.products.find(id).update(attrs);
      });

      this.delete("/products/:id", (schema, request) => {
        let id = request.params.id;
        return schema.products.find(id).destroy();
      });

      this.get("/customers", (schema) => {
        return schema.customers.all();
      });

      this.get("/customers/:id", (schema, request) => {
        let id = request.params.id;
        return schema.customers.find(id);
      });

      this.post("/customers/create", (schema, request) => {
        let newCustomer = JSON.parse(request.requestBody);
        return schema.customers.create(newCustomer);
      });

      this.put("/customers/:id", (schema, request) => {
        let id = request.params.id;
        let attrs = JSON.parse(request.requestBody);
        return schema.customers.find(id).update(attrs);
      });

      this.delete("/customers/:id", (schema, request) => {
        let id = request.params.id;
        return schema.customers.find(id).destroy();
      });
    },
  });

  return server;
}
