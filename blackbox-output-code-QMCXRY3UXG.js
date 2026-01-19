const products = [
    { id: 1, name: "Wireless Headphones", price: 99.99, image: "https://via.placeholder.com/250x150?text=Headphones" },
    { id: 2, name: "Smartphone Charger", price: 19.99, image: "https://via.placeholder.com/250x150?text=Charger" },
    { id: 3, name: "Bluetooth Speaker", price: 49.99, image: "https://via.placeholder.com/250x150?text=Speaker" },
    // Add more products as needed
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayProducts() {
    const productsSection = document.getElementById('products');
    productsSection.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productsSection.appendChild(productDiv);
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

function showCart() {
    const modal = document.getElementById('cart-modal');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartItems.appendChild(li);
        total += item.price;
    });
    cartTotal.textContent = total.toFixed(2);
    modal.style.display = 'block';
}

document.getElementById('cart-btn').addEventListener('click', showCart);
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('cart-modal').style.display = 'none';
});

document.getElementById('search').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    // Re-render filtered products (simplified)
    const productsSection = document.getElementById('products');
    productsSection.innerHTML = '';
    filtered.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productsSection.appendChild(productDiv);
    });
});

displayProducts();
updateCartCount();