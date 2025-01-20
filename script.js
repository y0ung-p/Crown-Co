// Navigation Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Dynamic Product Highlight
const products = document.querySelectorAll('.product');
products.forEach(product => {
  product.addEventListener('mouseover', () => {
    product.style.transform = 'scale(1.05)';
    product.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.2)';
  });
  product.addEventListener('mouseout', () => {
    product.style.transform = 'scale(1)';
    product.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  });
});

// Pop-up Message for Contact Form Submission
const contactForm = document.querySelector('form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for reaching out! We’ll get back to you soon.');
  });
}
