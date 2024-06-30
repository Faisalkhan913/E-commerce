// API utility functions
async function getProducts(page = 1) {
    const response = await fetch(`https://dummyjson.com/products?limit=10&page=${page}`);
    return await response.json();
}

async function getProduct(id) {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    return await response.json();
}

async function addProduct(product) {
    const response = await fetch(`https://dummyjson.com/products/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    });
    return await response.json();
}

async function updateProduct(id, product) {
    const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    });
    return await response.json();
}

async function deleteProductAPI(id) {
    const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: 'DELETE'
    });
    return await response.json();
}
