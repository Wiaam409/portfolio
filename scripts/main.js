// main.js
document.addEventListener("DOMContentLoaded", function () {
  // Typing animation effect
  function initTypingAnimation() {
    const textElement = document.querySelector(".typing-text");
    const roles = [
      "Software Engineer",
      "Back-End Laravel Developer",
      "Problem Solver",
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        textElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        textElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = 100;

      if (isDeleting) {
        typeSpeed /= 2;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }

      setTimeout(type, typeSpeed);
    }

    type();
  }

  // Start the typing animation
  initTypingAnimation();

  // Set up the Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add the "visible" class to trigger animations
          entry.target.classList.add("visible");

          // For elements with individual animations
          if (entry.target.classList.contains("skills")) {
            const skillItems = entry.target.querySelectorAll(".skill-item");
            skillItems.forEach((item, index) => {
              setTimeout(() => {
                item.style.opacity = "1";
                item.style.transform = "translateY(0)";
              }, 100 * index);
            });
          }
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of element is visible
      rootMargin: "0px 0px -50px 0px", // Adjust trigger point
    }
  );

  // Observe sections
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    section.classList.add("hidden");
    observer.observe(section);
  });

  // Header scroll effect

  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    const logoIcon = document.querySelector(".logo i");

    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Highlight active section in navigation
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");

    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active");
      }
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Form validation and submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // Simple validation: check if fields are filled
      const name = this.name.value.trim();
      const email = this.email.value.trim();
      const message = this.message.value.trim();

      if (name && email && message) {
        console.log("Form submitted:", { name, email, message });
        alert("Thank you for your message! I will get back to you soon.");
        this.reset();
      } else {
        alert("Please fill in all fields.");
      }
    });
  }

  // Trigger hero animation after page load
  setTimeout(() => {
    document.querySelector(".hero").classList.add("visible");
  }, 300);
});
