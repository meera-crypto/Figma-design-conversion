document.addEventListener("DOMContentLoaded", () => {
  // Navigation
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const overlay = document.querySelector(".menu-overlay");
  const closeBtn = document.querySelector(".menu-close");

  // Footer Email
  const form = document.querySelector(".email-form");
  const emailInput = document.getElementById("email");
  const errorText = form.querySelector(".emailError");
  const emailWrapper = document.querySelector(".input-email-field");

  // Counter
  const counters = document.querySelectorAll(".counter");

  // Modals
  const modalButtons = document.querySelectorAll("[data-modal]");
  const modals = document.querySelectorAll(".modal");
  const modalOverlay = document.getElementById("modalOverlay");
  const closeButtons = document.querySelectorAll("[data-close]");

  const modalForms = document.querySelectorAll(".modal-form");

  // Heading animation on scroll
  const scrollHeadings = document.querySelectorAll(".scroll-heading");

  // Feature cards animation
  const featureCards = document.querySelectorAll(".feature-card");

  /* UTIL FUNCTIONS*/

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateName(name) {
    return /^[a-zA-Z\s]{2,}$/.test(name);
  }

  function validatePassword(password) {
    return password.length >= 6;
  }

  function showError(input, message) {
    let error = input.nextElementSibling;

    if (!error || !error.classList.contains("field-error")) {
      error = document.createElement("small");
      error.classList.add("field-error");
      input.after(error);
    }

    error.textContent = message;
    input.classList.add("input-error");
  }

  function clearError(input) {
    input.classList.remove("input-error");

    const error = input.nextElementSibling;

    if (error && error.classList.contains("field-error")) {
      error.textContent = "";
    }
  }

  /* HAMBURGER MENU */

  hamburger.addEventListener("click", () => {
    const isOpen = hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    overlay.classList.toggle("active");

    hamburger.setAttribute("aria-expanded", isOpen);
  });

  function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    overlay.classList.remove("active");
    hamburger.setAttribute("aria-expanded", false);
  }

  closeBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  document.addEventListener("click", (e) => {
    const isClickInside =
      navMenu.contains(e.target) || hamburger.contains(e.target);

    if (!isClickInside && navMenu.classList.contains("active")) {
      closeMenu();
    }
  });

  /* FOOTER EMAIL VALIDATION */

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailValue = emailInput.value.trim();

    if (emailValue === "") {
      errorText.textContent = "Email is required";
      emailWrapper.classList.add("input-error");
      return;
    }

    if (!validateEmail(emailValue)) {
      errorText.textContent = "Enter a valid email address";
      emailWrapper.classList.add("input-error");
      return;
    }

    errorText.textContent = "";
    emailWrapper.classList.remove("input-error");
    emailWrapper.classList.add("input-success");
  });

  /* COUNTER ANIMATION */

  const animateCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    let count = 0;

    const updateCounter = () => {
      const increment = target / 150;

      if (count < target) {
        count += increment;
        counter.innerText = Math.ceil(count).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };

    updateCounter();
  };

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.4,
    },
  );

  counters.forEach((counter) => observer.observe(counter));

  /* CLIENT LOGO MARQUEE */

  window.addEventListener("load", () => {
    const slider = document.querySelector(".client-slider");
    const logos = document.getElementById("clientLogos");

    const sliderWidth = slider.offsetWidth;
    let logosWidth = logos.scrollWidth;

    while (logosWidth < sliderWidth * 2) {
      logos.innerHTML += logos.innerHTML;
      logosWidth = logos.scrollWidth;
    }
  });

  /* MODALS */

  let lastFocusedElement;
  modalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      closeModal();
      lastFocusedElement = button;

      const modalId = button.dataset.modal;
      const modal = document.getElementById(modalId);

      modal.classList.add("active");
      modal.setAttribute("aria-hidden", "false");

      modalOverlay.classList.add("active");

      const firstField = modal.querySelector("input");

      if (firstField) {
        setTimeout(() => firstField.focus(), 100);
      }
    });
  });

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });

  modalOverlay.addEventListener("click", closeModal);

  function closeModal() {
    document.activeElement?.blur();
    modals.forEach((modal) => {
      modal.classList.remove("active");
      modal.setAttribute("aria-hidden", "true");
    });

    modalOverlay.classList.remove("active");

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
      closeModal();
    }
  });

  /* MODAL FORM VALIDATION */
  modalForms.forEach((form) => {
    const inputs = form.querySelectorAll("input");

    inputs.forEach((input) => {
      input.addEventListener("input", () => clearError(input));
    });

    form.addEventListener("submit", (e) => {
      let isValid = true;

      inputs.forEach((input) => {
        const value = input.value.trim();

        if (input.type === "text") {
          if (!validateName(value)) {
            showError(input, "Enter valid name");
            isValid = false;
          }
        }

        if (input.type === "email") {
          if (!validateEmail(value)) {
            showError(input, "Enter valid email");
            isValid = false;
          }
        }

        if (input.type === "password") {
          if (!validatePassword(value)) {
            showError(input, "Minimum 6 characters");
            isValid = false;
          }
        }
      });

      if (!isValid) e.preventDefault();
    });

    /* ENTER KEY NAVIGATION */
    inputs.forEach((input, index) => {
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();

          const value = input.value.trim();
          let isValid = true;

          if (input.type === "text" && !validateName(value)) {
            showError(input, "Enter valid name");
            isValid = false;
          }

          if (input.type === "email" && !validateEmail(value)) {
            showError(input, "Enter valid email");
            isValid = false;
          }

          if (input.type === "password" && !validatePassword(value)) {
            showError(input, "Minimum 6 characters");
            isValid = false;
          }

          if (!isValid) return;

          const nextInput = inputs[index + 1];

          if (nextInput) {
            nextInput.focus();
          } else {
            form.querySelector("button[type='submit']").click();
          }
        }
      });
    });
  });

  /* HEADING SCROLL ANIMATION */
  const headingObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3,
    },
  );

  scrollHeadings.forEach((heading) => {
    headingObserver.observe(heading);
  });

  // FEATURE CARD ANIMATION
  featureCards.forEach((card, index) => {
    headingObserver.observe(card);

    card.style.transitionDelay = `${index * 0.15}s`;
  });
});
