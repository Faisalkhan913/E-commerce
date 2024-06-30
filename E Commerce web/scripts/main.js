document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'login.html';
    }

    // Fetch products and display them
    fetchProducts();
    fetchCategories();
});

function fetchProducts(page = 1, query = '') {
    let url = `https://dummyjson.com/products?limit=10&page=${page}`;
    if (query) {
        url = `https://dummyjson.com/products/search?q=${query}&limit=10&page=${page}`;
    }
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayProducts(data.products);
            setupPagination(data.total, page);
        });
}

function displayProducts(products) {
    const container = document.getElementById('product-container');
    container.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-item';
        productElement.innerHTML = `
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <button onclick="viewProduct(${product.id})">View</button>
            <button onclick="deleteProduct(${product.id})">Delete</button>
        `;
        container.appendChild(productElement);
    });
}

function setupPagination(total, currentPage) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    const totalPages = Math.ceil(total / 10);
    for (let i = 1; i <= totalPages; i++) {
        const pageElement = document.createElement('button');
        pageElement.innerText = i;
        pageElement.onclick = () => fetchProducts(i);
        if (i === currentPage) {
            pageElement.className = 'active';
        }
        pagination.appendChild(pageElement);
    }
}

function viewProduct(id) {
    window.location.href = `product.html?id=${id}`;
}

function searchProducts() {
    const query = document.getElementById('search').value;
    fetchProducts(1, query);
}

function logout() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

function fetchCategories() {
    fetch(`https://dummyjson.com/products/categories`)
        .then(response => response.json())
        .then(categories => {
            const categoryContainer = document.getElementById('categories');
            categoryContainer.innerHTML = categories.map(category => `
                <button onclick="fetchProductsByCategory('${category}')">${category}</button>
            `).join('');
        });
}

function fetchProductsByCategory(category) {
    fetch(`https://dummyjson.com/products/category/${category}`)
        .then(response => response.json())
        .then(data => {
            displayProducts(data.products);
            setupPagination(data.total, 1);
        });
}
