// main.js (Corrected Version)
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
          entry.target.classList.add("visible");
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
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
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
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
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

  //=============== SEND EMAIL JS ===============
  const contactForm = document.getElementById("contact-form");
  const contactMessage = document.getElementById("contact-message");

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_1mil15l",
        "template_1jve192",
        "#contact-form",
        "D4_lmbXFb60I5gIWd"
      )
      .then(
        () => {
          contactMessage.textContent = "Message sent successfully ✅";
          setTimeout(() => {
            contactMessage.textContent = "";
          }, 5000);
          contactForm.reset();
        },
        () => {
          contactMessage.textContent = "Message not sent (service error) ❌";
        }
      );
  };

  contactForm.addEventListener("submit", sendEmail);

  // Trigger hero animation after page load
  setTimeout(() => {
    document.querySelector(".hero").classList.add("visible");
  }, 300);
});
