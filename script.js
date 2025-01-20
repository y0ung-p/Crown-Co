// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    targetElement.scrollIntoView({ behavior: 'smooth' });
  });
});

// Product data
const products = [
  { name: 'Luxury Watch', price: 499.99, image: 'assets/watch.jpg' },
  { name: 'Designer Bag', price: 1299.99, image: 'assets/bag.jpg' },
  { name: 'Elegant Shoes', price: 899.99, image: 'assets/shoes.jpg' },
];

// Render products
const productsContainer = document.querySelector('.products');
products.forEach(product => {
  const productElement = document.createElement('div');
  productElement.className = 'product';
  productElement.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>$${product.price.toFixed(2)}</p>
  `;
  productsContainer.appendChild(productElement);
});

// Back-to-top button functionality
const backToTop = document.createElement('button');
backToTop.textContent = '↑';
backToTop.className = 'back-to-top';
document.body.appendChild(backToTop);

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});

// Contact form validation
const form = document.querySelector('form');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = form.querySelector('[name="name"]').value.trim();
  const email = form.querySelector('[name="email"]').value.trim();
  const message = form.querySelector('[name="message"]').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all fields.');
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    alert('Please enter a valid email address.');
  } else {
    alert('Thank you for your message!');
    form.reset();
  }
});

