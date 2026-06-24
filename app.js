/* ==========================================================
   VOLTANET - APP.JS
   Version 2026
   Fonctionnalités :
   - Menu Mobile
   - Dark Mode
   - Progress Bar
   - Compteurs Animés
   - Animations Scroll
   - Formulaire Contact
   - Back To Top
   - Navigation Active
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initDarkMode();
  initProgressBar();
  initCounters();
  initScrollAnimations();
  initContactForm();
  initBackToTop();
  initActiveNavigation();
});

/* ==========================================================
   MENU MOBILE
========================================================== */

function initMobileMenu() {
  const menuBtn = document.querySelector(".menu-btn");

  const navLinks = document.querySelector(".nav-links");

  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    menuBtn.innerHTML = navLinks.classList.contains("active") ? "✕" : "☰";
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");

      menuBtn.innerHTML = "☰";
    });
  });
}

/* ==========================================================
   DARK MODE
========================================================== */

function initDarkMode() {
  const themeBtn = document.getElementById("themeToggle");

  if (!themeBtn) return;

  const currentTheme = localStorage.getItem("voltanet-theme");

  if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");

    themeBtn.innerHTML = "☀";
  }

  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const darkMode = document.body.classList.contains("dark-mode");

    localStorage.setItem("voltanet-theme", darkMode ? "dark" : "light");

    themeBtn.innerHTML = darkMode ? "☀" : "🌙";
  });
}

/* ==========================================================
   BARRE DE PROGRESSION
========================================================== */

function initProgressBar() {
  const progressBar = document.getElementById("progressBar");

  if (!progressBar) return;

  window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const progress = (scrollTop / height) * 100;

    progressBar.style.width = progress + "%";
  });
}

/* ==========================================================
   COMPTEURS ANIMÉS
========================================================== */

function initCounters() {
  const counters = document.querySelectorAll(".counter");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const target = parseInt(counter.dataset.target);

        let current = 0;

        const increment = Math.max(target / 100, 1);

        const updateCounter = () => {
          current += increment;

          if (current < target) {
            counter.textContent = Math.floor(current);

            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };

        updateCounter();

        observer.unobserve(counter);
      });
    },
    {
      threshold: 0.4,
    },
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}

/* ==========================================================
   ANIMATIONS AU SCROLL
========================================================== */

function initScrollAnimations() {
  const elements = document.querySelectorAll(
    ".card, .service-card, .project, .stat-card",
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";

          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  elements.forEach((el) => {
    el.style.opacity = "0";

    el.style.transform = "translateY(40px)";

    el.style.transition = "all .8s ease";

    observer.observe(el);
  });
}

/* ==========================================================
   FORMULAIRE CONTACT
========================================================== */

function initContactForm() {
  const form = document.getElementById("contactForm");

  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = form.querySelector('input[type="email"]');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.value)) {
      alert("Veuillez saisir une adresse email valide.");

      return;
    }

    alert("Votre demande a été envoyée avec succès.");

    form.reset();
  });
}

/* ==========================================================
   BOUTON RETOUR HAUT
========================================================== */

function initBackToTop() {
  const button = document.createElement("button");

  button.id = "backToTop";

  button.innerHTML = "↑";

  document.body.appendChild(button);

  Object.assign(button.style, {
    position: "fixed",
    bottom: "25px",
    right: "25px",

    width: "50px",
    height: "50px",

    border: "none",
    borderRadius: "50%",

    background: "#00B4FF",
    color: "#fff",

    cursor: "pointer",

    display: "none",

    fontSize: "20px",

    zIndex: "9999",

    boxShadow: "0 10px 25px rgba(0,0,0,.2)",
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  });

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
  });
}

/* ==========================================================
   NAVIGATION ACTIVE
========================================================== */

function initActiveNavigation() {
  const sections = document.querySelectorAll("section");

  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;

      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");

      const href = link.getAttribute("href");

      if (href === "#" + current) {
        link.classList.add("active");
      }
    });
  });
}

/* ==========================================================
   MESSAGE CONSOLE
========================================================== */

console.log(`
========================================
VOLTANET 2026
Consulting & Ingénierie Intégrée
========================================
Application JavaScript chargée
========================================
`);
