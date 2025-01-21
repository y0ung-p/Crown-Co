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
// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  // Automatically show the pop-up after a delay
  setTimeout(() => {
    const popup = document.getElementById("signup-popup");
    if (popup) {
      popup.classList.add("active");
    }
  }, 2000); // Delay in milliseconds (e.g., 2000 = 2 seconds)

  // Close the pop-up when the close button is clicked
  const closeButton = document.querySelector(".close-popup");
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      const popup = document.getElementById("signup-popup");
      if (popup) {
        popup.classList.remove("active");
      }
    });
  }
});document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("signup-popup");
  if (popup) {
    popup.classList.add("active");
  }
});
function closeHandler() {
  Enabler.reportManualClose(); 
  Enabler.close();
}

document.getElementById('signup-popup').addEventListener('click', closeHandler, false);

