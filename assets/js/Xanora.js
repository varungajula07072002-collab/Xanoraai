/* =========================================================
   XANORA AI
   GLOBAL JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       LUCIDE ICON INITIALIZATION
    ===================================================== */

    if (window.lucide) {
        lucide.createIcons();
    }


    /* =====================================================
       NAVIGATION
    ===================================================== */

    const navLinks =
        document.querySelectorAll(".nav-links a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.forEach(function (item) {
                item.classList.remove("active");
            });

            this.classList.add("active");

        });

    });

   /* =====================================================
     NAVIGATION — HIDE ON DOWN / SHOW ON UP
     Desktop + Mobile
   ===================================================== */

    const header =
      document.querySelector("header");

    const navbar =
       document.querySelector(".navbar");

    let lastScrollY =
        window.scrollY;

    let scrollDirectionDistance = 0;
    let lastDirection = null;

    if (header) {

       window.addEventListener("scroll", function () {

          const currentScrollY =
             window.scrollY;

          const delta =
             currentScrollY - lastScrollY;


          /* =================================================
             DESKTOP
          ================================================= */

          if (window.innerWidth > 700) {

               /* ================================
                DESKTOP — EXISTING LOGIC
               ================================= */

               if (
                  currentScrollY > lastScrollY &&
                  currentScrollY > 100
                ) {

                   header.classList.add("nav-hidden");

                }

                else if (
                    currentScrollY < lastScrollY
                ) {

                   header.classList.remove("nav-hidden");
                }

            } else {

               /* =================================================
                 MOBILE NAVIGATION
                 Navbar + open menu move together
               ================================================= */

               const menuPanel =
                 navbar.querySelector(".mobile-menu-panel");

               const menuIsOpen =
                   menuPanel &&
                   menuPanel.classList.contains("active");


               /* -----------------------------------------------
                  MOBILE REVEAL THRESHOLD
 
                  Small upward movements are ignored.
                  The user must intentionally scroll upward
                  before the navigation returns.
               ----------------------------------------------- */

                const MOBILE_REVEAL_THRESHOLD = 25;


               /* -----------------------------------------------
                   ALWAYS SHOW AT VERY TOP
               ----------------------------------------------- */

               if (currentScrollY <= 20) {

                   header.classList.remove("nav-hidden");

                    if (menuPanel) {
                      menuPanel.classList.remove("nav-hidden");
                    }
                    
                   scrollDirectionDistance = 0;
                   lastDirection = null;

                }


               /* -----------------------------------------------
                  SCROLLING DOWN
       
                  This applies even when the menu is OPEN.

                  Because the menu is inside the header,
                  hiding the header hides the menu with it.
                ----------------------------------------------- */

                else if (delta > 0) {

                   if (lastDirection !== "down") {

                       scrollDirectionDistance = 0;
                       lastDirection = "down";
 
                    }

                   scrollDirectionDistance += delta;

                  header.classList.add("nav-hidden");

                  if (menuPanel) {
                       menuPanel.classList.add("nav-hidden");
                    }
                }


              /* -----------------------------------------------
                 SCROLLING UP
 
                 Do NOT immediately reveal the navbar.
                 Accumulate upward movement first.
              ----------------------------------------------- */

              else if (delta < 0) {

                 if (lastDirection !== "up") {

                     scrollDirectionDistance = 0;
                      lastDirection = "up";

                    }

                 scrollDirectionDistance += Math.abs(delta);


                 /* Reveal only after deliberate upward movement */

                 if (
                     scrollDirectionDistance >=
                     MOBILE_REVEAL_THRESHOLD
                    ) {

                     header.classList.remove(
                         "nav-hidden"
                         );

                     if (menuPanel) {
                           menuPanel.classList.remove(
                               "nav-hidden"
                            );
                        }
                     scrollDirectionDistance = 0;

                    }
                }

            }

          lastScrollY =
             currentScrollY;

        });

    }
  
    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".why-card, .service-card, .process-card, .who-card, .problem-card, .floating-card"
        );

    const revealObserver =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "reveal-visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    revealElements.forEach(function (element) {

        element.classList.add(
            "reveal-hidden"
        );

        revealObserver.observe(
            element
        );

    });


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"], a[href*="services.html#"]'
        );

    internalLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const href =
                    this.getAttribute("href");

                if (!href || href === "#") {
                    return;
                }


                if (href.startsWith("#")) {

                    const target =
                        document.querySelector(href);

                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                    return;

                }


                if (href.includes("services.html#")) {

                    const targetId =
                        href.split("#")[1];

                    const target =
                        document.getElementById(targetId);

                    if (
                        target &&
                        window.location.pathname.endsWith("services.html")
                    ) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }

            }
        );

    });


    /* =====================================================
       HERO VISUAL MOUSE MOVEMENT
    ===================================================== */

    const heroVisual =
        document.querySelector(".hero-visual");

    if (heroVisual) {

        heroVisual.addEventListener(
            "mousemove",
            function (event) {

                const rect =
                    heroVisual.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width;

                const y =
                    (event.clientY - rect.top) /
                    rect.height;

                const moveX =
                    (x - 0.5) * 12;

                const moveY =
                    (y - 0.5) * 12;

                heroVisual.style.transform =
                    `translate(${moveX}px, ${moveY}px)`;

            }
        );


        heroVisual.addEventListener(
            "mouseleave",
            function () {

                heroVisual.style.transform = "";

            }
        );

    }


    /* =====================================================
       BUTTON FEEDBACK
    ===================================================== */

    const primaryButtons =
        document.querySelectorAll(".primary-btn");

    primaryButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                this.classList.add(
                    "button-clicked"
                );

                setTimeout(
                    function () {

                        button.classList.remove(
                            "button-clicked"
                        );

                    },
                    300
                );

            }
        );

    });

});


/* =========================================================
   XANORA AI
   SYNCHRONIZED NETWORK ANIMATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const network =
            document.querySelector(".ai-network");

        const particleContainer =
            document.querySelector(".data-particles");

        if (
            !network ||
            !particleContainer
        ) {
            return;
        }


        /* =====================================================
           ACTUAL SVG PATHS
        ===================================================== */

        const loopPaths =
            Array.from(
                document.querySelectorAll(
                    ".visible-loop"
                )
            );

        const verticalPaths =
            Array.from(
                document.querySelectorAll(
                    ".visible-vertical"
                )
            );

        if (
            loopPaths.length !== 2 ||
            verticalPaths.length !== 2
        ) {
            return;
        }


        /* =====================================================
           PARTICLE CREATION
        ===================================================== */

        function createParticle() {

            const particle =
                document.createElement("span");

            particle.className =
                "data-particle";

            particleContainer.appendChild(
                particle
            );

            return particle;

        }


        /* =====================================================
           SVG PATH POSITION
        ===================================================== */

        function getPathPosition(
            path,
            progress
        ) {

            const length =
                path.getTotalLength();

            const point =
                path.getPointAtLength(
                    progress * length
                );

            const matrix =
                path.getScreenCTM();

            if (!matrix) {

                return {
                    x: 0,
                    y: 0
                };

            }

            const screenX =
                matrix.a * point.x +
                matrix.c * point.y +
                matrix.e;

            const screenY =
                matrix.b * point.x +
                matrix.d * point.y +
                matrix.f;

            const rect =
                particleContainer.getBoundingClientRect();

            return {
                x:
                    screenX -
                    rect.left,

                y:
                    screenY -
                    rect.top
            };

        }


        /* =====================================================
           MOVE ONE PARTICLE ON ONE PATH
        ===================================================== */

        function moveParticle(
            particle,
            path,
            startProgress,
            endProgress,
            duration,
            onComplete,
            hideAtNodes = false
        ) {

            const startTime =
                performance.now();


            function animate(now) {

                let progress =
                    (now - startTime) /
                    duration;

                if (progress >= 1) {
                    progress = 1;
                }


                const currentProgress =
                    startProgress +
                    (
                        endProgress -
                        startProgress
                    ) *
                    progress;


                const position =
                    getPathPosition(
                        path,
                        currentProgress
                    );


                /* =============================================
                   NODE ABSORPTION / RELEASE
                ============================================ */

                if (hideAtNodes) {

                    particle.style.opacity =
                        "0.9";

                } else {

                    particle.style.opacity =
                        "0.9";

                }


                /* =============================================
                   FIND ACTUAL TRAVEL DIRECTION
                ============================================= */

                const lookAhead =
                    0.003;

                const nextProgress =
                    endProgress >= startProgress

                        ? Math.min(
                            1,
                            currentProgress +
                            lookAhead
                        )

                        : Math.max(
                            0,
                            currentProgress -
                            lookAhead
                        );


                const nextPosition =
                    getPathPosition(
                        path,
                        nextProgress
                    );


                const dx =
                    nextPosition.x -
                    position.x;

                const dy =
                    nextPosition.y -
                    position.y;


                const angle =
                    Math.atan2(
                        dy,
                        dx
                    ) *
                    180 /
                    Math.PI;


                /* =============================================
                   PARTICLE + TRAIL
                ============================================= */

                particle.style.transform =
                    `translate3d(
                        ${position.x}px,
                        ${position.y}px,
                        0
                    )
                    translate(-50%, -50%)
                    rotate(${angle}deg)`;


                if (
                    progress <
                    1
                ) {

                    requestAnimationFrame(
                        animate
                    );

                } else {

                    particle.style.opacity =
                        "0";

                    onComplete();

                }

            }


            requestAnimationFrame(
                animate
            );

        }


        /* =====================================================
           INFINITY LOOP TIMING
        ===================================================== */

        const LOOP_DURATION =
            4500;

        let loopCycleRunning =
            false;


        function startLoopCycle() {

            if (loopCycleRunning) {
                return;
            }

            loopCycleRunning =
                true;


            let intelligenceArrived =
                false;

            let developmentArrived =
                false;

            let coreCollisionTriggered =
                false;


            function incomingReachedCore(source) {

                if (source === "intelligence") {
                    intelligenceArrived = true;
                }

                if (source === "development") {
                    developmentArrived = true;
                }


                if (
                    !intelligenceArrived ||
                    !developmentArrived ||
                    coreCollisionTriggered
                ) {
                    return;
                }


                coreCollisionTriggered =
                    true;


                createCoreBranch(
                    verticalPaths[0],
                    0.0,
                    1.0
                );


                createCoreBranch(
                    verticalPaths[1],
                    0.0,
                    1.0
                );

            }


            /* =================================================
               1. INTELLIGENCE → CORE
            ================================================= */

            const intelligenceParticle =
                createParticle();


            moveParticle(
                intelligenceParticle,
                loopPaths[0],
                0.50,
                0.00,
                LOOP_DURATION,

                function () {

                    intelligenceParticle.remove();

                    incomingReachedCore(
                        "intelligence"
                    );

                },

                true
            );


            /* =================================================
               2. CORE → INTELLIGENCE
            ================================================= */

            const coreIntelligenceParticle =
                createParticle();


            moveParticle(
                coreIntelligenceParticle,
                loopPaths[0],
                1.00,
                0.50,
                LOOP_DURATION,

                function () {

                    coreIntelligenceParticle.remove();

                }
            );


            /* =================================================
               3. DEVELOPMENT → CORE
            ================================================= */

            const developmentParticle =
                createParticle();


            moveParticle(
                developmentParticle,
                loopPaths[1],
                0.50,
                1.00,
                LOOP_DURATION,

                function () {

                    developmentParticle.remove();

                    incomingReachedCore(
                        "development"
                    );

                },

                true
            );


            /* =================================================
               4. CORE → DEVELOPMENT
            ================================================= */

            const coreDevelopmentParticle =
                createParticle();


            moveParticle(
                coreDevelopmentParticle,
                loopPaths[1],
                0.00,
                0.50,
                LOOP_DURATION,

                function () {

                    coreDevelopmentParticle.remove();

                }
            );


            /* =================================================
               START NEXT CYCLE
            ================================================= */

            setTimeout(
                function () {

                    loopCycleRunning =
                        false;

                    startLoopCycle();

                },
                LOOP_DURATION + 120
            );

        }


        /* =====================================================
           CORE BRANCH PARTICLES
        ===================================================== */

        function createCoreBranch(
            path,
            startProgress,
            endProgress
        ) {

            const particle =
                createParticle();

            const BRANCH_DURATION =
                2200;


            moveParticle(
                particle,
                path,
                startProgress,
                endProgress,
                BRANCH_DURATION,

                function () {

                    particle.remove();

                }
            );

        }


        /* =====================================================
           START THE INFINITY SYSTEM
        ===================================================== */

        startLoopCycle();


        /* =====================================================
           OUTER CIRCULAR FLOW
        ===================================================== */

        const OUTER_SPEED =
            0.0002;


        /* =====================================================
          FIND ACTUAL NODE ICON CENTERS

          The particle path must pass through the ICON,
          not the centre of the entire node + label box.
        ===================================================== */

        function getNodeCenter(selector) {

             const node =
              document.querySelector(selector);

             if (!node) {
                 return null;
                }

             const icon =
              node.querySelector("svg");

             if (!icon) {
                 return null;
                }

             const iconRect =
               icon.getBoundingClientRect();

             const containerRect =
                particleContainer.getBoundingClientRect();

              return {
                   x:
                  iconRect.left +
                  iconRect.width / 2 -
                  containerRect.left,

                   y:
                  iconRect.top +
                  iconRect.height / 2 -
                  containerRect.top
                };
        }


        /* =====================================================
           OUTER CIRCLE GEOMETRY
        ===================================================== */

        function getOuterGeometry() {

            const automation =
                getNodeCenter(
                    ".ai-node-2"
                );

            const intelligence =
                getNodeCenter(
                    ".ai-node-1"
                );

            const development =
                getNodeCenter(
                    ".ai-node-3"
                );

            const integration =
                getNodeCenter(
                    ".ai-node-4"
                );


            if (
                !automation ||
                !intelligence ||
                !development ||
                !integration
            ) {
                return null;
            }


            const centerX =
                (
                    automation.x +
                    intelligence.x +
                    development.x +
                    integration.x
                ) / 4;


            const centerY =
                (
                    automation.y +
                    intelligence.y +
                    development.y +
                    integration.y
                ) / 4;


            const radiusX =
                Math.max(
                    Math.abs(
                        automation.x -
                        centerX
                    ),
                    Math.abs(
                        intelligence.x -
                        centerX
                    ),
                    Math.abs(
                        development.x -
                        centerX
                    ),
                    Math.abs(
                        integration.x -
                        centerX
                    )
                );


            const radiusY =
                Math.max(
                    Math.abs(
                        automation.y -
                        centerY
                    ),
                    Math.abs(
                        intelligence.y -
                        centerY
                    ),
                    Math.abs(
                        development.y -
                        centerY
                    ),
                    Math.abs(
                        integration.y -
                        centerY
                    )
                );


            return {
                centerX,
                centerY,
                radiusX,
                radiusY
            };

        }


        /* =====================================================
           OUTER PARTICLE CREATION
        ===================================================== */

        function createOuterParticle(
            startAngle
        ) {

            const particle =
                createParticle();


            let angle =
                startAngle;


            function animate() {

                const geometry =
                    getOuterGeometry();


                if (!geometry) {

                    requestAnimationFrame(
                        animate
                    );

                    return;

                }


                angle -=
                    OUTER_SPEED *
                    16;


                if (
                    angle <
                      0
                ) {

                    angle +=
                        Math.PI * 2;

                }


                const x =
                    geometry.centerX +
                    geometry.radiusX *
                    Math.cos(angle);


                const y =
                    geometry.centerY +
                    geometry.radiusY *
                    Math.sin(angle);


                const nextAngle =
                    angle -
                    0.01;


                const nextX =
                    geometry.centerX +
                    geometry.radiusX *
                    Math.cos(nextAngle);


                const nextY =
                    geometry.centerY +
                    geometry.radiusY *
                    Math.sin(nextAngle);


                const dx =
                    nextX -
                    x;


                const dy =
                    nextY -
                    y;


                const rotation =
                    Math.atan2(
                        dy,
                        dx
                    ) *
                    180 /
                    Math.PI;


                particle.style.transform =
                    `translate3d(
                        ${x}px,
                        ${y}px,
                        0
                    )
                    translate(-50%, -50%)
                    rotate(${rotation}deg)`;


                particle.style.opacity =
                    "0.9";


                requestAnimationFrame(
                    animate
                );

            }


            requestAnimationFrame(
                animate
            );

        }


        /* =====================================================
           OUTER FLOW PARTICLES
        ===================================================== */

        createOuterParticle(
            -Math.PI / 2
        );

        createOuterParticle(
            0
        );

        createOuterParticle(
            Math.PI / 2
        );

        createOuterParticle(
            Math.PI
        );

    }
);


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const submitButton =
                contactForm.querySelector(
                    ".contact-submit"
                );


            const formData = {

                name:
                    document.getElementById(
                        "name"
                    ).value.trim(),

                email:
                    document.getElementById(
                        "email"
                    ).value.trim(),

                country:
                    document.getElementById(
                        "country"
                    ).value,

                phone:
                    document.getElementById(
                        "phone"
                    ).value.trim(),

                organization:
                    document.getElementById(
                        "organization"
                    ).value.trim(),

                service:
                    document.getElementById(
                        "service"
                    ).value,

                message:
                    document.getElementById(
                        "message"
                    ).value.trim()

            };


            try {

                submitButton.disabled =
                    true;

                submitButton.textContent =
                    "Sending...";


                const response =
                    await fetch(
                        "/api/contact",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    formData
                                )
                        }
                    );


                const result =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        result.message ||
                        "Something went wrong."
                    );

                }


                alert(
                    "Your inquiry has been sent successfully."
                );


                contactForm.reset();


            } catch (error) {

                console.error(
                    "Contact form error:",
                    error
                );


                alert(
                    "Unable to send your inquiry. Please try again."
                );


            } finally {

                submitButton.disabled =
                    false;


                submitButton.innerHTML = `
                    Send Inquiry
                    <i class="fa-solid fa-arrow-right"></i>
                `;

            }

        }
    );

}


/* =========================================================
   XANORA AI — INQUIRY & CONSULTATION MODALS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const getStartedModal =
            document.getElementById(
                "getStartedModal"
            );


        const consultationModal =
            document.getElementById(
                "consultationModal"
            );


        const privacyModal =
            document.getElementById(
                "privacyModal"
            );


        const termsModal =
            document.getElementById(
                "termsModal"
            );


        /* =====================================================
           OPEN MODALS
        ===================================================== */

        function openModal(modal) {

            if (!modal) return;

            modal.classList.add(
                "active"
            );

            modal.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.classList.add(
                "modal-open"
            );

        }


        /* =====================================================
           CLOSE MODALS
        ===================================================== */

        function closeModal(modal) {

            if (!modal) return;

            modal.classList.remove(
                "active"
            );

            modal.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.classList.remove(
                "modal-open"
            );

        }


        /* =====================================================
           GET STARTED BUTTONS
        ===================================================== */

        const getStartedButtons =
            document.querySelectorAll(
                'a[href="contact.html"].primary-btn, [data-open-modal="getStartedModal"]'
            );


        getStartedButtons.forEach(
            function (button) {

                const text =
                    button.textContent
                        .trim()
                        .toLowerCase();


                if (
                    !text.includes(
                        "get started"
                    )
                ) {
                    return;
                }


                button.addEventListener(
                    "click",
                    function (event) {

                        if (getStartedModal) {

                            event.preventDefault();

                            openModal(
                                getStartedModal
                            );

                            return;

                        }

                    }
                );

            }
        );


        /* =====================================================
           BOOK CONSULTATION BUTTONS
        ===================================================== */

        const consultationButtons =
            document.querySelectorAll(
                'a[href="contact.html"], a[href="index.html#book-consultation"]'
            );


        consultationButtons.forEach(
            function (button) {

                const text =
                    button.textContent
                        .trim()
                        .toLowerCase();


                if (
                    text.includes(
                        "book a consultation"
                    )
                ) {

                    button.addEventListener(
                        "click",
                        function (event) {

                         /*
                         * IF THE CONSULTATION MODAL EXISTS
                         * ON THE CURRENT PAGE:
                         * open it here.
                         */
                         if (consultationModal) {

                             event.preventDefault();

                             openModal(
                                 consultationModal
                                );

                              return;
                            }


                         /*
                         * IF THE MODAL DOES NOT EXIST
                         * ON THE CURRENT PAGE:
                         *
                         * Go to the Index page and tell
                         * the Index page to open the
                         * consultation modal.
                         */
                         event.preventDefault();

                         window.location.href =
                           "index.html#book-consultation";
                        }
                    );

                }

            }
        );

        // ==========================================
        // LEGAL MODALS
        // ==========================================

          const legalModalButtons =
              document.querySelectorAll(
                 '[data-open-modal="privacyModal"], [data-open-modal="termsModal"]'
                );

              const privacyModalBody =
                 document.getElementById("privacyModalBody");

              const termsModalBody =
                document.getElementById("termsModalBody");


              // ==========================================
              // LOAD LEGAL CONTENT
              // ==========================================

                 async function loadLegalContent() {

                      try {

                         const [privacyResponse, termsResponse] =
                             await Promise.all([
                             fetch("privacy-policy.html"),
                             fetch("terms.html")
                            ]);


                         if (!privacyResponse.ok) {
                             throw new Error(
                                 "Unable to load Privacy Policy."
                                );
                            }


                         if (!termsResponse.ok) {
                              throw new Error(
                                 "Unable to load Terms & Conditions."
                                );
                            }


                          const privacyHTML =
                            await privacyResponse.text();

                          const termsHTML =
                            await termsResponse.text();


                         const parser =
                           new DOMParser();


                         const privacyDocument =
                            parser.parseFromString(
                               privacyHTML,
                               "text/html"
                            );


                         const termsDocument =
                             parser.parseFromString(
                              termsHTML,
                             "text/html"
                            );


                         const privacyContent =
                           privacyDocument.querySelector(
                             '[data-legal-content="privacy"]'
                            );
 

                         const termsContent =
                           termsDocument.querySelector(
                             '[data-legal-content="terms"]'
                            );


                         if (
                             privacyModalBody &&
                             privacyContent
                            ) {

                             privacyModalBody.innerHTML =
                             privacyContent.innerHTML;

                            }


                         if (
                             termsModalBody &&
                             termsContent
                            ) {

                             termsModalBody.innerHTML =
                             termsContent.innerHTML;
     
                            }


                        } catch (error) {

                          console.error(
                             "XANORA AI: Failed to load legal content.",
                              error
                            );

                        }

                    }


                // Load both documents when the page is ready
                loadLegalContent();


             // ==========================================
             // OPEN PRIVACY POLICY / TERMS MODALS
             // ==========================================

                 legalModalButtons.forEach(
                     function (button) {

                         button.addEventListener(
                            "click",
                          function (event) {

                              event.preventDefault();

                             const modalId =
                                 this.getAttribute(
                                      "data-open-modal"
                                    );


                                if (
                                     modalId === "privacyModal"
                                    ) {

                                   if (!privacyModal) {

                                      console.error(
                                         "XANORA AI: privacyModal was not found."
                                        );

                                   return;

                                }

                               openModal(
                                 privacyModal
                                );

                            return;}


                          if (
                              modalId === "termsModal"
                            ) {

                              if (!termsModal) {

                                 console.error(
                                     "XANORA AI: termsModal was not found."
                                    );

                                return;

                            }

                            openModal(
                               termsModal
                            );

                        }

                    }
                );

            }
        );

        /* =====================================================
           OPEN CONSULTATION FROM OTHER PAGES
        ===================================================== */
        function handleConsultationHash() {
          if (
               window.location.hash ===
              "#book-consultation" &&
               consultationModal
            ) {

              openModal(
                  consultationModal
                );

            }
        }

        handleConsultationHash();

        window.addEventListener(
          "hashchange",
           handleConsultationHash
        );


        /* =====================================================
           OPEN GET STARTED FROM OTHER PAGES
        ===================================================== */

        if (
            window.location.hash ===
            "#get-started" &&
            getStartedModal
        ) {

            openModal(
                getStartedModal
            );

        }


        /* =====================================================
           CLOSE BUTTONS + OVERLAY
        ===================================================== */

        const closeButtons =
            document.querySelectorAll(
                "[data-close-modal]"
            );


        closeButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const modal =
                            this.closest(
                                ".form-modal"
                            );

                        closeModal(
                            modal
                        );

                    }
                );

            }
        );


        /* =====================================================
           ESCAPE KEY
        ===================================================== */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key !==
                    "Escape"
                ) {
                    return;
                }


                if (
                    getStartedModal &&
                    getStartedModal.classList.contains(
                        "active"
                    )
                ) {

                    closeModal(
                        getStartedModal
                    );

                }


                if (
                    consultationModal &&
                    consultationModal.classList.contains(
                        "active"
                    )
                ) {

                    closeModal(
                        consultationModal
                    );

                }


                if (
                    privacyModal &&
                    privacyModal.classList.contains(
                        "active"
                    )
                ) {

                    closeModal(
                        privacyModal
                    );

                }


                if (
                    termsModal &&
                    termsModal.classList.contains(
                        "active"
                    )
                ) {

                    closeModal(
                        termsModal
                    );

                }

            }
        );

    }
);


/* =========================================================
   XANORA AI — GET STARTED FORM
========================================================= */

const getStartedForm =
    document.getElementById(
        "getStartedForm"
    );


if (getStartedForm) {

    getStartedForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const submitButton =
                getStartedForm.querySelector(
                    ".form-submit"
                );


            const formData = {

                name:
                    document.getElementById(
                        "gsName"
                    ).value.trim(),

                email:
                    document.getElementById(
                        "gsEmail"
                    ).value.trim(),

                country:
                    document.getElementById(
                        "gsCountry"
                    ).value,

                phone:
                    document.getElementById(
                        "gsPhone"
                    ).value.trim(),

                organization:
                    document.getElementById(
                        "gsOrganization"
                    ).value.trim(),

                service:
                    document.getElementById(
                        "gsService"
                    ).value,

                message:
                    document.getElementById(
                        "gsMessage"
                    ).value.trim()

            };


            try {

                submitButton.disabled =
                    true;

                submitButton.textContent =
                    "Sending...";


                const response =
                    await fetch(
                        "/api/contact",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    formData
                                )
                        }
                    );


                const result =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        result.message ||
                        "Something went wrong."
                    );

                }


                alert(
                    "Your inquiry has been sent successfully."
                );


                getStartedForm.reset();


            } catch (error) {

                console.error(
                    "Get Started form error:",
                    error
                );


                alert(
                    "Unable to send your inquiry. Please try again."
                );


            } finally {

                submitButton.disabled =
                    false;


                submitButton.innerHTML = `
                    Send Inquiry
                    <i class="fa-solid fa-arrow-right"></i>
                `;

            }

        }
    );

}


/* =========================================================
   XANORA AI — CONSULTATION FORM
========================================================= */

const consultationForm =
    document.getElementById(
        "consultationForm"
    );


if (consultationForm) {

    consultationForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const submitButton =
                consultationForm.querySelector(
                    ".form-submit"
                );


            const availability =
                document.querySelector(
                    'input[name="availability"]:checked'
                );


            const meetingPreference =
                document.querySelector(
                    'input[name="meetingPreference"]:checked'
                );


            const formData = {

                name:
                    document.getElementById(
                        "consultName"
                    ).value.trim(),

                email:
                    document.getElementById(
                        "consultEmail"
                    ).value.trim(),

                country:
                    document.getElementById(
                        "consultCountry"
                    ).value,

                phone:
                    document.getElementById(
                        "consultPhone"
                    ).value.trim(),

                reason:
                    document.getElementById(
                        "consultReason"
                    ).value,

                description:
                    document.getElementById(
                        "consultDescription"
                    ).value.trim(),

                preferredDate:
                    document.getElementById(
                        "consultDate"
                    ).value,

                preferredTime:
                    document.getElementById(
                        "consultTime"
                    ).value,

                availability:
                    availability
                        ? availability.value
                        : "",

                meetingPreference:
                    meetingPreference
                        ? meetingPreference.value
                        : "",

                additional:
                    document.getElementById(
                        "consultAdditional"
                    ).value.trim()

            };


            try {

                submitButton.disabled =
                    true;

                submitButton.textContent =
                    "Sending...";


                const response =
                    await fetch(
                        "/api/consultation",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    formData
                                )
                        }
                    );


                const result =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        result.message ||
                        "Something went wrong."
                    );

                }


                alert(
                    "Your consultation request has been received. We will contact you to confirm the details."
                );


                consultationForm.reset();


            } catch (error) {

                console.error(
                    "Consultation form error:",
                    error
                );


                alert(
                    "Unable to send your consultation request. Please try again."
                );


            } finally {

                submitButton.disabled =
                    false;


                submitButton.innerHTML = `
                    Request Consultation
                    <i class="fa-solid fa-arrow-right"></i>
                `;

            }

        }
    );

}


/* =====================================================
   SERVICE ANCHOR HIGHLIGHT
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        if (
            !window.location.pathname.endsWith(
                "services.html"
            )
        ) {
            return;
        }


        const targetId =
            window.location.hash.substring(1);


        if (!targetId) {
            return;
        }


        const target =
            document.getElementById(
                targetId
            );


        if (!target) {
            return;
        }


        setTimeout(
            function () {

                target.classList.add(
                    "service-highlight"
                );


                setTimeout(
                    function () {

                        target.classList.remove(
                            "service-highlight"
                        );

                    },
                    60000
                );

            },
            300
        );

    }
);


/* =========================================================
   XANORA AI — DARK MODE / THEME CONTROLLER
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       SETTINGS
    ===================================================== */

    const STORAGE_KEY =
        "xanora-theme";

    const root =
        document.documentElement;


    /* =====================================================
       GET SAVED THEME
    ===================================================== */

    function getStoredTheme() {

        const storedTheme =
            localStorage.getItem(
                STORAGE_KEY
            );


        if (
            storedTheme === "light" ||
            storedTheme === "dark"
        ) {

            return storedTheme;

        }


        return null;

    }


    /* =====================================================
       GET SYSTEM THEME
    ===================================================== */

    function getSystemTheme() {

        if (
            window.matchMedia &&
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches
        ) {

            return "dark";

        }


        return "light";

    }


    /* =====================================================
       GET CURRENT THEME
    ===================================================== */

    function getCurrentTheme() {

        return (
            root.getAttribute(
                "data-theme"
            ) ||
            getSystemTheme()
        );

    }


    /* =====================================================
       UPDATE TOGGLE ICON
    ===================================================== */

    function updateToggle(
        button,
        theme
    ) {

        if (!button) return;


        const isDark =
            theme === "dark";


        button.setAttribute(
            "aria-label",
            isDark
                ? "Switch to light mode"
                : "Switch to dark mode"
        );


        button.setAttribute(
            "title",
            isDark
                ? "Switch to light mode"
                : "Switch to dark mode"
        );


        button.setAttribute(
            "aria-pressed",
            String(isDark)
        );


        if (isDark) {

            button.innerHTML = `
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                >

                    <circle
                        cx="12"
                        cy="12"
                        r="4"
                    ></circle>

                    <path d="M12 2v2"></path>

                    <path d="M12 20v2"></path>

                    <path d="m4.93 4.93 1.41 1.41"></path>

                    <path d="m17.66 17.66 1.41 1.41"></path>

                    <path d="M2 12h2"></path>

                    <path d="M20 12h2"></path>

                    <path d="m6.34 17.66-1.41 1.41"></path>

                    <path d="m19.07 4.93-1.41 1.41"></path>

                </svg>
            `;

        } else {

            button.innerHTML = `
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                >

                    <path
                        d="M21 12.79A9 9 0 1 1 11.21 3
                           7 7 0 0 0 21 12.79Z"
                    ></path>

                </svg>
            `;

        }

    }


    /* =====================================================
       APPLY THEME
    ===================================================== */

    function applyTheme(
        theme,
        remember
    ) {

        if (
            theme !== "light" &&
            theme !== "dark"
        ) {

            return;

        }


        root.setAttribute(
            "data-theme",
            theme
        );


        if (remember) {

            localStorage.setItem(
                STORAGE_KEY,
                theme
            );

        }


        const button =
            document.querySelector(
                ".theme-toggle"
            );


        if (button) {

            updateToggle(
                button,
                theme
            );

        }

    }


    /* =====================================================
       CREATE THEME TOGGLE
    ===================================================== */

    function createThemeToggle() {

        const navbar =
            document.querySelector(
                ".navbar"
            );


        if (!navbar) {
            return;
        }


        if (
            navbar.querySelector(
                ".theme-toggle"
            )
        ) {
            return;
        }


        const button =
            document.createElement(
                "button"
            );


        button.type =
            "button";


        button.className =
            "theme-toggle";


        button.addEventListener(
            "click",
            function () {

                const currentTheme =
                    getCurrentTheme();


                const nextTheme =
                    currentTheme === "dark"
                        ? "light"
                        : "dark";


                root.classList.add(
                    "theme-transition"
                );


                applyTheme(
                    nextTheme,
                    true
                );


                window.setTimeout(
                    function () {

                        root.classList.remove(
                            "theme-transition"
                        );

                    },
                    300
                );

            }
        );


        const navButton =
            navbar.querySelector(
                ".nav-button"
            );


        if (navButton) {

            navButton.parentNode.insertBefore(
                button,
                navButton
            );

        } else {

            navbar.appendChild(
                button
            );

        }


        const currentTheme =
            root.getAttribute(
                "data-theme"
            ) ||
            getSystemTheme();


        updateToggle(
            button,
            currentTheme
        );

    }


    /* =====================================================
       SYSTEM PREFERENCE CHANGE
    ===================================================== */

    function syncWithSystemPreference() {

        if (
            getStoredTheme()
        ) {

            return;

        }


        root.removeAttribute(
            "data-theme"
        );


        const button =
            document.querySelector(
                ".theme-toggle"
            );


        if (button) {

            updateToggle(
                button,
                getSystemTheme()
            );

        }

    }


    /* =====================================================
       INITIAL THEME
    ===================================================== */

    const storedTheme =
        getStoredTheme();


    if (storedTheme) {

        root.setAttribute(
            "data-theme",
            storedTheme
        );

    }


    /* =====================================================
       INITIALIZE AFTER HTML LOAD
    ===================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            createThemeToggle,
            {
                once: true
            }
        );

    } else {

        createThemeToggle();

    }


    /* =====================================================
       WATCH SYSTEM PREFERENCE
    ===================================================== */

    if (
        window.matchMedia
    ) {

        const mediaQuery =
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            );


        if (
            mediaQuery.addEventListener
        ) {

            mediaQuery.addEventListener(
                "change",
                syncWithSystemPreference
            );

        } else if (
            mediaQuery.addListener
        ) {

            mediaQuery.addListener(
                syncWithSystemPreference
            );

        }

    }

})();

/* =========================================================
   MOBILE NAVIGATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const navbar =
            document.querySelector(".navbar");

        if (!navbar) return;


        const menuButton =
            navbar.querySelector(".mobile-menu-toggle");

        const menuPanel =
            navbar.querySelector(".mobile-menu-panel");


        if (
            !menuButton ||
            !menuPanel
        ) {
            return;
        }


        menuButton.addEventListener(
            "click",
            function () {

                const isOpen =
                    menuPanel.classList.toggle("active");


                menuButton.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );


                menuButton.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Close navigation"
                        : "Open navigation"
                );

            }
        );


        menuPanel
            .querySelectorAll("a")
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        menuPanel.classList.remove(
                            "active"
                        );

                        menuButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                        menuButton.setAttribute(
                            "aria-label",
                            "Open navigation"
                        );

                    }
                );

            });

    }
);

