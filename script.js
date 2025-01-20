// Scroll-triggered Animations
const scrollElements = document.querySelectorAll(".features, .products");

const elementInView = (el, offset = 150) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset;
};

const displayScrollElement = (element) => {
  element.style.opacity = "1";
  element.style.transform = "translateY(0)";
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 150)) {
      displayScrollElement(el);
    }
  });
};

window.addEventListener("scroll", handleScrollAnimation);

// Button Animation
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    button.style.animation = "bounce 0.5s ease";
    setTimeout(() => {
      button.style.animation = "none";
    }, 500);
  });
});

// Bounce Animation for Buttons
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`);
document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('popup');
  const closePopup = document.getElementById('closePopup');

  // Show the popup after 3 seconds
  setTimeout(() => {
    popup.classList.add('active');
  }, 3000);

  // Close the popup when the close button is clicked
  closePopup.addEventListener('click', () => {
    popup.classList.remove('active');
  });

  // Close the popup when clicking outside of it
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.classList.remove('active');
    }
  });
