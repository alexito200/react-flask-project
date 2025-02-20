import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./cartContext";

function ProductList() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>

      <Link to="/create-product">
        <button>Add Product</button>
      </Link>

      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} style={{ border: "1px solid #ddd", padding: "10px", margin: "10px 0" }}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>

            <button
              style={{
                backgroundColor: "green",
                color: "white",
                padding: "5px 10px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: "10px",
              }}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>

            <Link to={`/update-product/${product.id}`}>
              <button>Update Product</button>
            </Link>
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
