const BASE_URL = 'https://your-backend-api.com/api';

export const fetchProducts = async () => {
try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
    throw new Error('Failed to fetch products');
    }
    return await response.json();
} catch (error) {
    console.error('Error fetching products:', error);
    return [];
}
};

export const fetchProductById = async (id) => {
try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) {
    throw new Error('Product not found');
    }
    return await response.json();
} catch (error) {
    console.error('Error fetching product:', error);
    return null;
}
};

export const createProduct = async (productData) => {
try {
    const response = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
    });
    if (!response.ok) {
    throw new Error('Failed to create product');
    }
    return await response.json();
} catch (error) {
    console.error('Error creating product:', error);
}
};

export const deleteProduct = async (id) => {
try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'DELETE',
    });
    if (!response.ok) {
    throw new Error('Failed to delete product');
    }
    return true;
} catch (error) {
    console.error('Error deleting product:', error);
    return false;
}
};
