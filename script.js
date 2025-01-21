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

  // Check if the popup has been closed before using localStorage
  const popupClosed = localStorage.getItem("popupClosed");

  // Debugging: Log the initial state
  console.log("Popup closed state in localStorage:", popupClosed);

  // If the popup hasn't been closed before, show it after a delay
  if (!popupClosed) {
    console.log("Popup will show after a delay.");
    setTimeout(() => {
      popup.classList.add("active");
      console.log("Popup displayed.");
    }, 10000); // 10-second delay
  } else {
    console.log("Popup will not show as it has been closed before.");
  }

  // Handle the close button click
  closeBtn.addEventListener("click", () => {
    console.log("Popup closed by user.");
    popup.classList.remove("active");
    localStorage.setItem("popupClosed", "true"); // Prevent it from showing again
  });
});
