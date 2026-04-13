document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const overlay = document.querySelector(".menu-overlay");
  const closeBtn = document.querySelector(".menu-close");

  function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    overlay.classList.remove("active");
    hamburger.setAttribute("aria-expanded", false);
  }

  hamburger.addEventListener("click", () => {
    const isOpen = hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    overlay.classList.toggle("active");

    hamburger.setAttribute("aria-expanded", isOpen);
  });

  closeBtn.addEventListener("click", closeMenu);

  overlay.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  });

  document.addEventListener("click", (e) => {
    const isClickInside =
      navMenu.contains(e.target) || hamburger.contains(e.target);

    if (!isClickInside && navMenu.classList.contains("active")) {
      closeMenu();
    }
  });
});
