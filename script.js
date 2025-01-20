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
  const popup = document.getElementById("signupPopup");
  const closePopup = document.getElementById("closePopup");
  const signupForm = document.getElementById("signupForm");

  // Show the popup after a delay
  setTimeout(() => {
    popup.classList.add("active");
  }, 2000);

  // Close the popup
  closePopup.addEventListener("click", () => {
    popup.classList.remove("active");
  });

  // Handle the signup form submission
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you for signing up!");
    popup.classList.remove("active");
  });
});

