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
        HIDE NAVIGATION ON SCROLL DOWN
      SHOW NAVIGATION ON SCROLL UP
    ===================================================== */

     const header = document.querySelector("header");

       let lastScrollY = window.scrollY;

      if (header) {

        window.addEventListener("scroll", function () {

           const currentScrollY = window.scrollY;

          if (
              currentScrollY > lastScrollY &&
              currentScrollY > 100
            ) {

             header.classList.add("nav-hidden");

             } else if (
             currentScrollY < lastScrollY
            ) {

             header.classList.remove("nav-hidden");

            }

            lastScrollY = currentScrollY;

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
            'a[href^="#"]'
        );


    internalLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");


                if (
                    targetId &&
                    targetId !== "#"
                ) {

                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (target) {

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

             /*
              * Keep the incoming particle fully visible
              * until it actually reaches the Core.
              *
              * At the final frame, moveParticle() below
              * sets opacity to 0 before onComplete().
              */

            particle.style.opacity =
              "0.9";

        }
        else {

             /*
              * All outgoing particles remain visible.
              */

            particle.style.opacity =
               " 0.9";

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

            /*
             * Make absolutely sure the particle is
             * invisible at the node before completion.
             */

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
        =====================================================

           ALL FOUR LOOP PARTICLES START TOGETHER.

           1. Intelligence → Core
           2. Development → Core
           3. Core → Development
           4. Core → Intelligence

           One synchronized cycle.
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


            let incomingCount =
                0;


            /* =================================================
               CORE COLLISION EVENT
            ================================================= */

             let intelligenceArrived = false;
             let developmentArrived = false;
             let coreCollisionTriggered = false;


             function incomingReachedCore(source) {

             if (source === "intelligence") {
                intelligenceArrived = true;
              }

            if (source === "development") {
                developmentArrived = true;
             }


    /* =============================================
       WAIT UNTIL BOTH PARTICLES HAVE ARRIVED
    ============================================= */

    if (
        !intelligenceArrived ||
        !developmentArrived ||
        coreCollisionTriggered
    ) {
        return;
    }


    /* =============================================
       BOTH PARTICLES HAVE REACHED THE CORE

       NOW — AND ONLY NOW — CREATE THE
       AUTOMATION + INTEGRATION PARTICLES.
    ============================================= */

    coreCollisionTriggered = true;


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

               LEFT LOOP
               UPPER HALF
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

                    incomingReachedCore("intelligence");

                },
                true
            );


            /* =================================================
               2. CORE → INTELLIGENCE

               LEFT LOOP
               LOWER HALF

               Starts at EXACTLY the same time.
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

               RIGHT LOOP
               LOWER HALF

               Starts simultaneously.
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

                    incomingReachedCore("development");

                },
                true
            );


            /* =================================================
               4. CORE → DEVELOPMENT

               RIGHT LOOP
               UPPER HALF

               Starts simultaneously.
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

               The next four particles launch together
               after the current four complete.
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
        =====================================================

           EXACTLY FOUR PARTICLES.

           Each particle begins at its own node.

           Automation → Intelligence
           Intelligence → Integration
           Integration → Development
           Development → Automation

           All four travel simultaneously.

           Each particle completes the entire circle
           and returns to its original starting node.

           Then the journey repeats.
        ===================================================== */

        const OUTER_SPEED =
            0.000285;


        /* =====================================================
           FIND ACTUAL NODE CENTERS
        ===================================================== */

        function getNodeCenter(
            selector
        ) {

            const node =
                document.querySelector(
                    selector
                );


            if (!node) {
                return null;
            }


            const nodeRect =
                node.getBoundingClientRect();


            const containerRect =
                particleContainer.getBoundingClientRect();


            return {

                x:
                    nodeRect.left +
                    nodeRect.width / 2 -
                    containerRect.left,

                y:
                    nodeRect.top +
                    nodeRect.height / 2 -
                    containerRect.top

            };

        }


        /* =====================================================
           OUTER CIRCLE GEOMETRY

           The ellipse is calculated from the ACTUAL
           four node positions.

           This prevents the Automation particle
           from passing above the node.
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
                    intelligence.x +
                    development.x
                ) / 2;


            const centerY =
                (
                    automation.y +
                    integration.y
                ) / 2;


            const radiusX =
                (
                    development.x -
                    intelligence.x
                ) / 2;


            const radiusY =
                (
                    integration.y -
                    automation.y
                ) / 2;


            return {

                centerX,
                centerY,
                radiusX,
                radiusY

            };

        }


        /* =====================================================
           OUTER NODE ANGLES

           Clockwise sequence:

           Automation
              ↓
           Intelligence
              ↓
           Integration
              ↓
           Development
              ↓
           Automation
        ===================================================== */

        const OUTER_START_ANGLES = {

            automation:
                -Math.PI / 2,

            intelligence:
                Math.PI,

            integration:
                Math.PI / 2,

            development:
                0

        };


        /* =====================================================
           OUTER PARTICLE
        ===================================================== */

        function createOuterParticle(
            startAngle
        ) {

            const particle =
                createParticle();


            let angle =
                startAngle;


            let lastTime =
                performance.now();


            function animate(now) {

                const delta =
                    now -
                    lastTime;


                lastTime =
                    now;


                /*
                 * NEGATIVE direction creates:

                 * Automation
                 * → Intelligence
                 * → Integration
                 * → Development
                 * → Automation
                 */

                angle -=
                    delta *
                    OUTER_SPEED;


                const geometry =
                    getOuterGeometry();


                if (geometry) {

                    const x =
                        geometry.centerX +
                        Math.cos(angle) *
                        geometry.radiusX;


                    const y =
                        geometry.centerY +
                        Math.sin(angle) *
                        geometry.radiusY;


                    const tangentX =
                        Math.sin(angle) *
                        geometry.radiusX;

                    const tangentY =
                        -Math.cos(angle) *
                        geometry.radiusY;

                    const particleAngle =
                        Math.atan2(
                        tangentY,
                        tangentX
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
                      rotate(${particleAngle}deg)`;


                    /* =============================================
                      HIDE PARTICLE INSIDE OUTER NODE
                     ============================================= */

                       const NODE_HIDE_ANGLE =
                         0.055;


                       const nodeAngles = [

                          OUTER_START_ANGLES.automation,

                          OUTER_START_ANGLES.intelligence,

                          OUTER_START_ANGLES.integration,

                          OUTER_START_ANGLES.development
                       ];


                     let outerOpacity =
                         0.8;


                     for (
                       const nodeAngle
                        of nodeAngles
                        ) {

    const angularDistance =
        Math.abs(
            Math.atan2(
                Math.sin(
                    angle -
                    nodeAngle
                ),
                Math.cos(
                    angle -
                    nodeAngle
                )
            )
        );


    if (
        angularDistance <
        NODE_HIDE_ANGLE
    ) {

        const fade =
            angularDistance /
            NODE_HIDE_ANGLE;


        outerOpacity =
            Math.min(
                outerOpacity,
                fade
            );

    }

                        }


                     particle.style.opacity =
                     Math.max(
                        0,
                     Math.min(
                       0.8,
                      outerOpacity
                    )
                 );

                }


                requestAnimationFrame(
                    animate
                );

            }


            requestAnimationFrame(
                animate
            );

        }


        /* =====================================================
           FOUR OUTER PARTICLES

           ALL FOUR START SIMULTANEOUSLY.
        ===================================================== */

        createOuterParticle(
            OUTER_START_ANGLES.automation
        );


        createOuterParticle(
            OUTER_START_ANGLES.intelligence
        );


        createOuterParticle(
            OUTER_START_ANGLES.integration
        );


        createOuterParticle(
            OUTER_START_ANGLES.development
        );


    }
);
 // ==========================================
 // CONTACT FORM
 // ==========================================

 const contactForm = document.getElementById("contactForm");

 if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const submitButton = contactForm.querySelector(".contact-submit");

        const formData = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            organization: document.getElementById("organization").value.trim(),
            service: document.getElementById("service").value,
            message: document.getElementById("message").value.trim()
        };

        try {
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";

            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Something went wrong.");
            }

            alert("Your inquiry has been sent successfully.");
            contactForm.reset();

        } catch (error) {
            console.error("Contact form error:", error);
            alert("Unable to send your inquiry. Please try again.");

        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = `
                Send Inquiry
                <i class="fa-solid fa-arrow-right"></i>
            `;
        }
    });
}
// ==========================================
// XANORA AI — INQUIRY & CONSULTATION MODALS
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const getStartedModal =
        document.getElementById("getStartedModal");

    const consultationModal =
        document.getElementById("consultationModal");


    // ==========================================
    // OPEN MODALS
    // ==========================================

    function openModal(modal) {

        if (!modal) return;

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");

        document.body.classList.add("modal-open");

    }


    // ==========================================
    // CLOSE MODALS
    // ==========================================

    function closeModal(modal) {

        if (!modal) return;

        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");

        document.body.classList.remove("modal-open");

    }


    // ==========================================
    // GET STARTED BUTTONS
    // ==========================================

    const getStartedButtons =
        document.querySelectorAll(
            'a[href="contact.html"].primary-btn'
        );


    getStartedButtons.forEach(function (button) {

        const text =
            button.textContent.trim().toLowerCase();

        if (text.includes("get started")) {

            button.addEventListener("click", function (event) {

                event.preventDefault();

                openModal(getStartedModal);

            });

        }

    });


    // ==========================================
    // BOOK CONSULTATION BUTTONS
    // ==========================================

    const consultationButtons =
        document.querySelectorAll(
            'a[href="contact.html"]'
        );


    consultationButtons.forEach(function (button) {

        const text =
            button.textContent.trim().toLowerCase();

        if (text.includes("book a consultation")) {

            button.addEventListener("click", function (event) {

                event.preventDefault();

                openModal(consultationModal);

            });

        }

    });


    // ==========================================
    // CLOSE BUTTONS + OVERLAY
    // ==========================================

    const closeButtons =
        document.querySelectorAll("[data-close-modal]");


    closeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const modal =
                this.closest(".form-modal");

            closeModal(modal);

        });

    });


    // ==========================================
    // ESCAPE KEY
    // ==========================================

    document.addEventListener("keydown", function (event) {

        if (event.key !== "Escape") return;

        if (
            getStartedModal &&
            getStartedModal.classList.contains("active")
        ) {

            closeModal(getStartedModal);

        }


        if (
            consultationModal &&
            consultationModal.classList.contains("active")
        ) {

            closeModal(consultationModal);

        }

    });

});

// ==========================================
// XANORA AI — GET STARTED FORM
// ==========================================

const getStartedForm =
    document.getElementById("getStartedForm");

if (getStartedForm) {

    getStartedForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const submitButton =
                getStartedForm.querySelector(".form-submit");

            const formData = {
                name:
                    document.getElementById("gsName").value.trim(),

                email:
                    document.getElementById("gsEmail").value.trim(),

                phone:
                    document.getElementById("gsPhone").value.trim(),

                organization:
                    document.getElementById("gsOrganization").value.trim(),

                service:
                    document.getElementById("gsService").value,

                message:
                    document.getElementById("gsMessage").value.trim()
            };


            try {

                submitButton.disabled = true;
                submitButton.textContent = "Sending...";


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
                                JSON.stringify(formData)
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

                submitButton.disabled = false;

                submitButton.innerHTML = `
                    Send Inquiry
                    <i class="fa-solid fa-arrow-right"></i>
                `;

            }

        }
    );

}



// ==========================================
// XANORA AI — CONSULTATION FORM
// ==========================================

const consultationForm =
    document.getElementById("consultationForm");

if (consultationForm) {

    consultationForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const submitButton =
                consultationForm.querySelector(".form-submit");


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

                submitButton.disabled = true;

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
                                JSON.stringify(formData)
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

                submitButton.disabled = false;

                submitButton.innerHTML = `
                    Request Consultation
                    <i class="fa-solid fa-arrow-right"></i>
                `;

            }

        }
    );

}