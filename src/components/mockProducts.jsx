import { useEffect, useState } from "react";
import { makeServer } from "../mirage/mirageServer";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let server;

    if (import.meta.env.MODE === "development") {
      server = makeServer(); // Start MirageJS only in development mode
    }

    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data.products); // Ensure correct data structure
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();

    return () => {
      if (server) {
        server.shutdown(); // Shutdown Mirage on unmount
      }
    };
  }, []);

  return (
    <div>
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
