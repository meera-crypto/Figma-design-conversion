document.addEventListener("DOMContentLoaded", () => {
  // Hamburger menu and close button
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const overlay = document.querySelector(".menu-overlay");
  const closeBtn = document.querySelector(".menu-close");

  // Footer email validation
  const form = document.querySelector(".email-form");
  const emailInput = document.getElementById("email");
  const errorText = document.getElementById("emailError");
  const emailWrapper = document.querySelector(".input-email-field");

  // counter for statistics
  const counters = document.querySelectorAll(".counter");

  // hamburger active
  hamburger.addEventListener("click", () => {
    const isOpen = hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    overlay.classList.toggle("active");

    hamburger.setAttribute("aria-expanded", isOpen);
  });

  // close hamburger
  function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    overlay.classList.remove("active");
    hamburger.setAttribute("aria-expanded", false);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  });

  closeBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  document.addEventListener("click", (e) => {
    const isClickInside =
      navMenu.contains(e.target) || hamburger.contains(e.target);

    if (!isClickInside && navMenu.classList.contains("active")) {
      closeMenu();
    }
  });

  // Footer email validation
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

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

  // counter for statistics
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

  counters.forEach((counter) => {
    observer.observe(counter);
  });

  // Marquee for logos
  window.addEventListener("load", () => {
    const slider = document.querySelector(".client-slider");
    const logos = document.getElementById("clientLogos");

    const sliderWidth = slider.offsetWidth;
    let logosWidth = logos.scrollWidth;

    // Duplicate until enough width
    while (logosWidth < sliderWidth * 2) {
      logos.innerHTML += logos.innerHTML;
      logosWidth = logos.scrollWidth;
    }
  });

  const modalButtons = document.querySelectorAll("[data-modal]");
  const modals = document.querySelectorAll(".modal");
  const modalOverlay = document.getElementById("modalOverlay");
  const closeButtons = document.querySelectorAll("[data-close]");

  // Open modal
  modalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modalId = button.dataset.modal;
      document.getElementById(modalId).classList.add("active");
      modalOverlay.classList.add("active");
    });
  });

  // Close modal
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });

  modalOverlay.addEventListener("click", closeModal);

  function closeModal() {
    modals.forEach((modal) => modal.classList.remove("active"));
    modalOverlay.classList.remove("active");
  }

  // ESC key close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // Modal Email Validation
  const modalForms = document.querySelectorAll(".modal-form");

  modalForms.forEach((form) => {
    const emailInput = form.querySelector('input[type="email"]');

    if (!emailInput) return;

    const error = document.createElement("small");
    error.classList.add("email-error");
    emailInput.after(error);

    emailInput.addEventListener("input", () => {
      error.textContent = "";
      emailInput.classList.remove("input-error");
    });

    form.addEventListener("submit", (e) => {
      const emailValue = emailInput.value.trim();

      if (emailValue === "") {
        e.preventDefault();
        error.textContent = "Email is required";
        emailInput.classList.add("input-error");
        return;
      }

      if (!validateEmail(emailValue)) {
        e.preventDefault();
        error.textContent = "Enter a valid email address";
        emailInput.classList.add("input-error");
        return;
      }

      error.textContent = "";
      emailInput.classList.remove("input-error");
    });
  });
});
