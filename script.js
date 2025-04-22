/****************************************************
 * 1) TYPEWRITER HEADING
 ****************************************************/
// Grouping related functions together for better organization

// Preloader and Typewriter Effect
function hidePreloader() {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.classList.add("hidden");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  }
}

function initTypewriter() {
  const typewriterElem = document.getElementById("typewriter");
  if (!typewriterElem) return;

  const text = "Welcome to Daniyal Asif's Portfolio";
  let index = 0;

  function typeEffect() {
    if (index < text.length) {
      typewriterElem.textContent += text.charAt(index);
      index++;
      setTimeout(typeEffect, 100); // typing speed
    }
  }
  typewriterElem.textContent = "";
  typeEffect();
}

/****************************************************
 * 2) NAVIGATION SCROLL / ACTIVE LINKS / STICKY NAV
 ****************************************************/
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-link");
let navOffsetTop = 0;

// Navigation Scroll and Active Links
function handleScroll() {
  const scrollPos = window.scrollY;

  // Sticky Nav if you want to enable
  // if (scrollPos > navOffsetTop + 50) {
  //   navbar.classList.add('sticky-nav');
  // } else {
  //   navbar.classList.remove('sticky-nav');
  // }

  // Highlight active link
  navLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (!section) return;
    const sectionTop = section.offsetTop - 60;
    const sectionHeight = section.offsetHeight;
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach((l) => l.classList.remove("active-link"));
      link.classList.add("active-link");
    }
  });
}

/****************************************************
 * 3) MOBILE NAV TOGGLE
 ****************************************************/
// Mobile Navigation Toggle
function toggleNav() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navbarUl = document.getElementById("navbar");

  if (!menuToggle || !navbarUl) return;

  menuToggle.classList.toggle("active");
  if (navbarUl.style.left === "0px") {
    navbarUl.style.left = "-100%";
    // Enable scrolling again
    document.body.style.overflow = "";
  } else {
    navbarUl.style.left = "0px";
    // Disable scrolling when menu is open
    document.body.style.overflow = "hidden";
  }
}

function toggleNavIfMobile() {
  // Only close the menu if on mobile (menu toggle is visible)
  if (window.innerWidth <= 768) {
    toggleNav();
  }
}

/****************************************************
 * 4) THEME TOGGLE (LIGHT / DARK)
 ****************************************************/
// Theme Toggle
function applySavedTheme() {
  const savedTheme = localStorage.getItem("theme");
  const themeIcon = document.getElementById("themeIcon");

  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    if (themeIcon) {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
    }
  }
}

function toggleTheme() {
  document.body.classList.toggle("light-theme");
  const themeIcon = document.getElementById("themeIcon");
  // Switch icon
  if (document.body.classList.contains("light-theme")) {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
    localStorage.setItem("theme", "light");
  } else {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
    localStorage.setItem("theme", "dark");
  }
}

/****************************************************
 * 5) FLOATING SHAPES MOUSEMOVE
 ****************************************************/
// Floating Shapes Mousemove
function handleMouseMove(e) {
  const shape1 = document.querySelector(".shape-1");
  const shape2 = document.querySelector(".shape-2");
  if (!shape1 || !shape2) return;

  // Adjust these multipliers to your liking
  const speed1 = 0.02;
  const speed2 = 0.03;

  const x1 = (window.innerWidth / 2 - e.pageX) * speed1;
  const y1 = (window.innerHeight / 2 - e.pageY) * speed1;
  shape1.style.transform = `translate(${x1}px, ${y1}px)`;

  const x2 = (window.innerWidth / 2 - e.pageX) * speed2;
  const y2 = (window.innerHeight / 2 - e.pageY) * speed2;
  shape2.style.transform = `translate(${x2}px, ${y2}px)`;
}

/****************************************************
 * 6) PROJECTS CAROUSEL
 ****************************************************/
let currentSlide = 0;
// Projects Carousel
function updateCarousel() {
  const track = document.querySelector(".carousel-track");
  const slides = document.querySelectorAll(".project-slide");
  const indicators = document.querySelectorAll(".indicator");

  if (!track || !slides.length || !indicators.length) return;

  const slideWidth =
    slides[0].clientWidth +
    parseInt(getComputedStyle(slides[0]).marginLeft) +
    parseInt(getComputedStyle(slides[0]).marginRight);

  // Move track
  track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

  // Update indicators
  indicators.forEach((ind) => ind.classList.remove("active-indicator"));
  indicators[currentSlide].classList.add("active-indicator");
}

function slideProject(direction) {
  const slides = document.querySelectorAll(".project-slide");
  if (!slides.length) return;

  currentSlide += direction;
  if (currentSlide < 0) currentSlide = slides.length - 1;
  if (currentSlide >= slides.length) currentSlide = 0;
  updateCarousel();
}

function goToProjectSlide(index) {
  const slides = document.querySelectorAll(".project-slide");
  if (index >= 0 && index < slides.length) {
    currentSlide = index;
    updateCarousel();
  }
}

// Handle window resize to adjust carousel positioning
window.addEventListener("resize", function () {
  updateCarousel();
});

/****************************************************
 * 7) CIRCULAR PROGRESS BARS
 ****************************************************/
// Skill Circles Setup
function setupSkillCircles() {
  const circles = document.querySelectorAll(".skill-circle");
  circles.forEach((circle) => {
    const value = circle.getAttribute("data-value");
    // Set custom property for conic gradient
    circle.style.setProperty("--percent", value);
  });
}

/****************************************************
 * 8) SCROLL REVEAL ANIMATIONS
 ****************************************************/
// Scroll Reveal Animations
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");
  const windowHeight = window.innerHeight;
  const revealPoint = windowHeight < 768 ? 50 : 100; // Adjust based on screen size

  reveals.forEach((rev) => {
    const rect = rev.getBoundingClientRect();
    if (rect.top < windowHeight - revealPoint) {
      rev.classList.add("visible");
    }
  });
}

/****************************************************
 * 9) CONTACT FORM (EmailJS Example)
 ****************************************************/
// Import environment variables
const serviceID = process.env.EMAILJS_SERVICE_ID;
const templateID = process.env.EMAILJS_TEMPLATE_ID;
const userID = process.env.EMAILJS_USER_ID;

// Contact Form EmailJS
function sendEmail(event) {
  event.preventDefault();

  // Get form data
  const formData = {
    from_name: event.target.from_name.value,
    reply_to: event.target.reply_to.value,
    message: event.target.message.value,
  };

  // Show loading state
  const submitBtn = event.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  // Send email using EmailJS
  emailjs
    .send(serviceID, templateID, formData, userID)
    .then(() => {
      // Success message
      alert("Your message has been sent successfully!");
      event.target.reset();
    })
    .catch((error) => {
      // Error message
      console.error("EmailJS error:", error);
      alert("Oops! There was a problem sending your message.");
    })
    .finally(() => {
      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
}

/****************************************************
 * 10) INIT on DOMContentLoaded
 ****************************************************/
// Initialize on DOMContentLoaded
function init() {
  hidePreloader();
  initTypewriter();
  applySavedTheme();
  setupSkillCircles();
  revealOnScroll();
  updateCarousel(); // so it starts on first slide
}

document.addEventListener("DOMContentLoaded", init);
window.addEventListener("scroll", handleScroll);
window.addEventListener("scroll", revealOnScroll);
document.addEventListener("mousemove", handleMouseMove);
window.addEventListener("resize", updateCarousel);
