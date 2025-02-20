import { useEffect, useState } from "react";
import { makeServer } from "../../../src/mirage/mirageServer";
import CreateMockProduct from "../mock/createMockProduct"; // Import the new component

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let server;
    if (import.meta.env.MODE === "development") {
      server = makeServer();
    }

    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();

    return () => {
      if (server) {
        server.shutdown();
      }
    };
  }, []);

  // ✅ Define handleProductAdded to update product list
  const handleProductAdded = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <div>
      <CreateMockProduct onProductAdded={handleProductAdded} /> {/* Pass the function */}
      <h2>Product List</h2>
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  );
}

export default ProductList;
