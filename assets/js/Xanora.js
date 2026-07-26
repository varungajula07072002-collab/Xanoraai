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