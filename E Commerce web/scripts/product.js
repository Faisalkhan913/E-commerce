document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        fetchProductDetail(productId);
    }
});

function fetchProductDetail(id) {
    getProduct(id).then(product => {
        const detailContainer = document.getElementById('product-detail');
        detailContainer.innerHTML = `
            <h1>${product.title}</h1>
            <p>${product.description}</p>
            <img src="${product.thumbnail}" alt="${product.title}">
            <p>Price: $${product.price}</p>
        `;
    });
}

function editProduct() {
    // Implement edit functionality
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const newTitle = prompt('Enter new title:');
    if (newTitle) {
        updateProduct(productId, { title: newTitle }).then(() => {
            fetchProductDetail(productId);
        });
    }
}

function deleteProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    deleteProductAPI(productId).then(() => {
        window.location.href = 'index.html';
    });
}
