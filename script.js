/****************************************************
 * 1) TYPEWRITER HEADING
 ****************************************************/
// Grouping related functions together for better organization

// Preloader and Typewriter Effect
function hidePreloader() {
  try {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.classList.add("hidden");
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    }
  } catch (error) {
    console.error("Error hiding preloader:", error);
    // Force hide in case of error
    const preloader = document.getElementById("preloader");
    if (preloader) preloader.style.display = "none";
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
  if (!navbar || !navLinks.length) return;
  
  const scrollPos = window.scrollY;

  // Sticky Nav if you want to enable
  if (scrollPos > navOffsetTop + 50) {
    navbar.classList.add('sticky-nav');
  } else {
    navbar.classList.remove('sticky-nav');
  }

  // Highlight active link
  navLinks.forEach((link) => {
    if (!link || !link.getAttribute) return;
    
    const sectionId = link.getAttribute("href");
    if (!sectionId) return;
    
    const section = document.querySelector(sectionId);
    if (!section) return;
    
    const sectionTop = section.offsetTop - 60;
    const sectionHeight = section.offsetHeight;
    
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach((l) => l && l.classList && l.classList.remove("active-link"));
      link.classList.add("active-link");
    }
  });
}

/****************************************************
 * 3) MOBILE NAV TOGGLE
 ****************************************************/
// Mobile Navigation Toggle
function toggleNav() {
  try {
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
  } catch (error) {
    console.error("Error toggling navigation:", error);
    // Reset body overflow in case of error
    document.body.style.overflow = "";
  }
}

function toggleNavIfMobile() {
  try {
    // Only close the menu if on mobile (menu toggle is visible)
    if (window.innerWidth <= 768) {
      toggleNav();
    }
  } catch (error) {
    console.error("Error toggling mobile nav:", error);
  }
}

/****************************************************
 * 4) THEME TOGGLE (LIGHT / DARK)
 ****************************************************/
// Theme Toggle
function applySavedTheme() {
  try {
    const savedTheme = localStorage.getItem("theme");
    const themeIcon = document.getElementById("themeIcon");

    if (savedTheme === "light") {
      document.body.classList.add("light-theme");
      if (themeIcon) {
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
      }
    }
  } catch (error) {
    console.error("Error applying saved theme:", error);
  }
}

function toggleTheme() {
  try {
    const themeIcon = document.getElementById("themeIcon");
    if (!themeIcon) return;
    
    // Add animation class
    themeIcon.parentElement.classList.add("switching-theme");
    
    // Slight delay for the animation to complete before switching icons
    setTimeout(() => {
      document.body.classList.toggle("light-theme");
      
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
      
      // Remove animation class after another short delay
      setTimeout(() => {
        themeIcon.parentElement.classList.remove("switching-theme");
      }, 300);
    }, 200);
  } catch (error) {
    console.error("Error toggling theme:", error);
  }
}

/****************************************************
 * 5) FLOATING SHAPES MOUSEMOVE
 ****************************************************/
// Floating Shapes Mousemove
function handleMouseMove(e) {
  try {
    const shape1 = document.querySelector(".shape-1");
    const shape2 = document.querySelector(".shape-2");
    if (!shape1 || !shape2) return;
    if (!e || typeof e.pageX !== 'number' || typeof e.pageY !== 'number') return;

    // Adjust these multipliers to your liking
    const speed1 = 0.02;
    const speed2 = 0.03;

    const x1 = (window.innerWidth / 2 - e.pageX) * speed1;
    const y1 = (window.innerHeight / 2 - e.pageY) * speed1;
    shape1.style.transform = `translate(${x1}px, ${y1}px)`;

    const x2 = (window.innerWidth / 2 - e.pageX) * speed2;
    const y2 = (window.innerHeight / 2 - e.pageY) * speed2;
    shape2.style.transform = `translate(${x2}px, ${y2}px)`;
  } catch (error) {
    console.error("Error in mouse move handler:", error);
    // Remove the event listener if there's a persistent error
    if (error.message && error.message.includes("Cannot read properties")) {
      document.removeEventListener("mousemove", handleMouseMove);
    }
  }
}

/****************************************************
 * 6) PROJECTS CAROUSEL
 ****************************************************/
let currentSlide = 0;
// Projects Carousel
function updateCarousel() {
  try {
    const track = document.querySelector(".carousel-track");
    const slides = document.querySelectorAll(".project-slide");
    const indicators = document.querySelectorAll(".indicator");

    if (!track || !slides.length || !indicators.length) return;
    if (currentSlide < 0 || currentSlide >= slides.length) {
      currentSlide = 0; // Reset to valid value
    }

    const slideWidth =
      slides[0].clientWidth +
      parseInt(getComputedStyle(slides[0]).marginLeft || 0) +
      parseInt(getComputedStyle(slides[0]).marginRight || 0);

    // Move track
    track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

    // Update indicators
    indicators.forEach((ind, index) => {
      if (ind && ind.classList) {
        ind.classList.remove("active-indicator");
        if (index === currentSlide) {
          ind.classList.add("active-indicator");
        }
      }
    });
  } catch (error) {
    console.error("Error updating carousel:", error);
  }
}

function slideProject(direction) {
  try {
    if (typeof direction !== 'number') return;
    
    const slides = document.querySelectorAll(".project-slide");
    if (!slides.length) return;

    currentSlide += direction;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    if (currentSlide >= slides.length) currentSlide = 0;
    updateCarousel();
  } catch (error) {
    console.error("Error sliding project:", error);
  }
}

function goToProjectSlide(index) {
  try {
    if (typeof index !== 'number') return;
    
    const slides = document.querySelectorAll(".project-slide");
    if (!slides.length) return;
    
    if (index >= 0 && index < slides.length) {
      currentSlide = index;
      updateCarousel();
    }
  } catch (error) {
    console.error("Error going to slide:", error);
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
  try {
    const circles = document.querySelectorAll(".skill-circle");
    if (!circles.length) return;
    
    circles.forEach((circle) => {
      if (!circle || !circle.getAttribute) return;
      
      const value = circle.getAttribute("data-value");
      if (!value) return;
      
      // Set custom property for conic gradient
      circle.style.setProperty("--percent", value);
    });
  } catch (error) {
    console.error("Error setting up skill circles:", error);
  }
}

/****************************************************
 * 8) SCROLL REVEAL ANIMATIONS
 ****************************************************/
// Scroll Reveal Animations
function revealOnScroll() {
  try {
    const reveals = document.querySelectorAll(".reveal");
    if (!reveals.length) return;
    
    const windowHeight = window.innerHeight;
    const revealPoint = windowHeight < 768 ? 50 : 100; // Adjust based on screen size

    reveals.forEach((rev) => {
      if (!rev || !rev.getBoundingClientRect) return;
      
      const rect = rev.getBoundingClientRect();
      if (rect.top < windowHeight - revealPoint) {
        rev.classList.add("visible");
      }
    });
  } catch (error) {
    console.error("Error in reveal scroll:", error);
  }
}

/****************************************************
 * 9) CONTACT FORM (EmailJS Example)
 ****************************************************/
// EmailJS configuration values
const serviceID = "service_8fp8l1h"; // Actual service ID from .env
const templateID = "template_wlz912q"; // Actual template ID from .env 
const userID = "2NuFlks6i9Agwz1bo"; // User ID already set in HTML

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
  try {
    // Hide preloader first to ensure it disappears even if there are errors elsewhere
    hidePreloader();
    
    // Initialize other components
    try { initTypewriter(); } catch (e) { console.error("Error in typewriter:", e); }
    try { applySavedTheme(); } catch (e) { console.error("Error in theme:", e); }
    try { setupSkillCircles(); } catch (e) { console.error("Error in skill circles:", e); }
    try { revealOnScroll(); } catch (e) { console.error("Error in scroll reveal:", e); }
    try { updateCarousel(); } catch (e) { console.error("Error in carousel:", e); }
  } catch (error) {
    console.error("Initialization error:", error);
    // Force hide preloader in case of critical error
    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.style.display = "none";
    }
  }
}

// Initialize event listeners with error handling
document.addEventListener("DOMContentLoaded", function() {
  try {
    // Initialize main components
    init();
    
    // Check if AOS is available and initialize it
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        once: true
      });
    } else {
      console.warn("AOS library not available, animations may not work");
      // Enable all AOS elements even without animation
      document.querySelectorAll('[data-aos]').forEach(el => {
        el.classList.add('aos-animate');
      });
    }
  } catch (error) {
    console.error("Error during initialization:", error);
    // Force hide preloader in case of critical error
    const preloader = document.getElementById("preloader");
    if (preloader) preloader.style.display = "none";
  }
});

// Add error handling to all event listeners
window.addEventListener("scroll", function() {
  try {
    handleScroll();
  } catch (error) {
    console.error("Error in scroll handler:", error);
  }
});

window.addEventListener("scroll", function() {
  try {
    revealOnScroll();
  } catch (error) {
    console.error("Error in reveal scroll handler:", error);
  }
});

document.addEventListener("mousemove", function(e) {
  try {
    handleMouseMove(e);
  } catch (error) {
    console.error("Error in mouse move handler:", error);
  }
});

window.addEventListener("resize", function() {
  try {
    updateCarousel();
  } catch (error) {
    console.error("Error in resize handler:", error);
  }
});
