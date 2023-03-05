/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav_link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // when you click on each nav_link, you remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== TYPEWRITTER ====================*/
const TypeWriter = function (txtElement, words, wait = 1200) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = "";
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

// Type Method
TypeWriter.prototype.type = function () {
  // Current index of word
  const current = this.wordIndex % this.words.length;
  // Get full text of current word
  const fullTxt = this.words[current];

  // Check if deleting
  if (this.isDeleting) {
    // Remove char
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    // Add char
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  // Insert txt into element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  // Initial Type Speed
  let typeSpeed = 150;

  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  // If word is complete
  if (!this.isDeleting && this.txt === fullTxt) {
    // Make pause at the end
    typeSpeed = this.wait;
    // Set delete to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    // Move to next word
    this.wordIndex++;
    // Pause before start typing
    typeSpeed = 250;
  }
  setTimeout(() => this.type(), typeSpeed);
};

// Init on DOM Load
document.addEventListener("DOMContentLoaded", init);

// Init App
function init() {
  const txtElement = document.querySelector(".txt-type", ".txt-tyPe");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName("skills_content"),
  skillsHeader = document.querySelectorAll(".skills_header");

function toggleSkills() {
  let itemClass = this.parentNode.className;

  for (i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills_content skills_close";
  }
  if (itemClass === "skills_content skills_close") {
    this.parentNode.className = "skills_content skills_open";
  }
}
skillsHeader.forEach((el) => {
  el.addEventListener("click", toggleSkills);
});

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tabcontent) => {
      tabcontent.classList.remove("qualification_active");
    });
    target.classList.add("qualification_active");

    tabs.forEach((tab) => {
      tab.classList.remove("qualification_active");
    });
    tab.classList.add("qualification_active");
  });
});

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll(".services_modal"),
  modalBtns = document.querySelectorAll(".services_button"),
  modalCloses = document.querySelectorAll(".services_modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener("click", () => {
    modal(i);
  });
});

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
    });
  });
});

//  PORTFOLIO SWIPER
let swiperPortfolio = new Swiper(".portfolio_container", {
  cssMode: true,
  loop: true,
  navigation: {
    nextE1: ".swiper-button-next",
    prevE1: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

//  TESTIMONIAL SWIPER
let swiperTestimonial = new Swiper(".testimonial_container", {
  loop: true,
  grabCursor: true,
  spaceBetween: 48,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  breakpoints: {
    568: {
      slidesPerView: 2,
    }
  }
});
//  EmailJS
const contactForm = document.getElementById("contact-form");
const contactName = document.getElementById("contact-name");
const contactEmail = document.getElementById("contact-email");
const contactProject = document.getElementById("contact-project");
const spinKit = document.getElementById("spinKit");
const btn = document.getElementById("button");
const jsConfetti = new JSConfetti();
const sendEmail = (e) => {
  e.preventDefault()

  spinKit.classList.add("show-spinKit");
  btn.textContent = "Sending message....";

  // serviceID, templateID, #form, public key
  emailjs
    .sendForm(
      "service_jsrwxy9",
      "template_2rrz8ai",
      "#contact-form",
      "JKdfmiXMaJ0Vt98Vt"
    )
    .then(
      () => {
        // Hide Spinner
        // spinKit.textContent = "Message sent successfully"
        spinKit.classList.remove("show-spinKit");
        jsConfetti.addConfetti({

          confettiColors: [

            "#6e57e0",

            "#ff477e",

            "#ff7096",

            "#ff85a1",

            "#fbb1bd",

            "#f9bec7"

          ],

          confettiRadius: 6,

          confettiNumber: 800,

        }).then(() => jsConfetti.addConfetti())
        btn.textContent = "Sent successfully!!";
        //remove
        setTimeout(() => {
          btn.textContent = "Send Message";
        }, 5000)
      },
      (error) => {
        alert("OOPS! Error occured...", error);
      }
    );

  contactName.value = "";
  contactEmail.value = "";
  contactProject.value = "";
};
contactForm.addEventListener("submit", sendEmail);

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const section = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetHeight - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(".nav-menu a[href*=" + sectionId + "]").classList;
    } else {
      document.querySelector(".nav-menu a[href*=" + sectionId + "]").classList;
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
// show scroll top
function scrollHeader() {
  const nav = document.getElementById("header");
  // when the scroll is higher than 560 viewport height, add the show-scroll class
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
// show scroll top
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // when the scroll is higher than 560 viewport height, add the show-scroll class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

// previously selected topic (if user selected))
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// we obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

// we validate if the user previously chose a topic
if (selectedTheme) {
  // if the validation is fulfilled, we ask what the issue was to know if we activate
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme
  );
}

//activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // we save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

// SCROLL REVEAL ANIMATION
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: "2500",
  // reset: true  /*ANIMATION REPEAT*/
});

sr.reveal(".home_img");
sr.reveal(".home_social");
sr.reveal(`.home_data`, { delay: 600, origin: "bottom", interval: 100 });
sr.reveal(`.home_scroll`, { delay: 600, origin: "bottom", interval: 100 });
sr.reveal(".section_title");
sr.reveal(".section_subtitle");
sr.reveal(`.about_img`, { origin: "left" });
sr.reveal(`.about_data`, { origin: "right" });
sr.reveal(`.skills_content:nth-child(1)`, { origin: "left" });
sr.reveal(`.skills_content:nth-child(2)`, { origin: "right" });
sr.reveal(`.skills_content:nth-child(3)`, { origin: "left" });
sr.reveal(
  `.qualification_container, .portfolio_container, .testimonial_container`,
  { delay: 600, origin: "bottom", interval: 100 }
);
sr.reveal(`.contact-left`, { origin: "left" });
sr.reveal(`.contact-right`, { origin: "right" });

// ===== The date that is placed at the footer =====
const date = new Date();
const cYear = date.getFullYear();
document.querySelector(".year").innerHTML = cYear;
