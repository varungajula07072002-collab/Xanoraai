/*
=========================================
XANORA AI
Version: 1.0
Global JavaScript
=========================================
*/

"use strict";

/* =========================================
   DOM READY
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("XANORA AI initialized.");

    initializeWebsite();

});

/* =========================================
   INITIALIZATION
========================================= */

function initializeWebsite(){

    setupNavigation();

}

/* =========================================
   NAVIGATION
========================================= */

function setupNavigation(){

    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.forEach(item => item.classList.remove("active"));

            link.classList.add("active");

        });

    });

}

/* =========================================
   PLACEHOLDER FOR FUTURE FEATURES

   - Mobile Navigation
   - Theme Toggle
   - Scroll Animations
   - Counter Animations
   - Contact Form Validation
   - FAQ Accordion
   - AI Assistant
========================================= */
/* ==========================================
   HERO ANIMATION
========================================== */

function animateHero() {

    const hero = document.querySelector(".hero-content");

    if (!hero) return;

    hero.style.opacity = "0";
    hero.style.transform = "translateY(30px)";

    requestAnimationFrame(() => {

        hero.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        hero.style.opacity = "1";
        hero.style.transform = "translateY(0)";

    });

}

/* ==========================================
   INITIALIZE HERO
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    animateHero();

});