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
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("signup-popup");
  const closeBtn = document.getElementById("close-popup");
  const form = document.getElementById("signup-form");

  // Check if the popup has been handled before
  const isPopupHandled = localStorage.getItem("popupHandled") === "true";

  if (!isPopupHandled) {
    // Show the popup after a delay
    setTimeout(() => {
      popup.classList.add("active");
    }, 3000); // 3 seconds delay
  }

  // Close popup when clicking the close button
  closeBtn.addEventListener("click", () => {
    popup.classList.remove("active");
    // Store the closed status in localStorage
    localStorage.setItem("popupHandled", "true");
  });

  // Handle form submission
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission for testing
    popup.classList.remove("active");
    // Store the handled status in localStorage
    localStorage.setItem("popupHandled", "true");
    alert("Thank you for signing up!"); // Optional success message
  });
});

