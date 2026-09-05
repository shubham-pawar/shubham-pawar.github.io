/* =========================================================
   SHUBHAM PAWAR PORTFOLIO
   Global JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------------------
       Theme
       ----------------------------------------------------- */

    const themeToggle =
        document.getElementById("theme-toggle");

    const savedTheme =
        localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    } else {
        document.body.classList.remove("light-mode");
    }

    updateThemeIcon();

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("light-mode");

            const isLight =
                document.body.classList.contains(
                    "light-mode"
                );

            localStorage.setItem(
                "portfolio-theme",
                isLight ? "light" : "dark"
            );

            updateThemeIcon();
        });
    }

    function updateThemeIcon() {

        if (!themeToggle) return;

        const isLight =
            document.body.classList.contains(
                "light-mode"
            );

        themeToggle.textContent =
            isLight ? "☀" : "☾";

        themeToggle.setAttribute(
            "aria-label",
            isLight
                ? "Switch to dark mode"
                : "Switch to light mode"
        );
    }


    /* -----------------------------------------------------
       Mobile menu
       ----------------------------------------------------- */

    const menuToggle =
        document.getElementById("menu-toggle");

    const navLinks =
        document.getElementById("nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                navLinks.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.textContent =
                isOpen ? "×" : "☰";
        });


        /* Close menu when a link is clicked */

        navLinks
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        navLinks.classList.remove(
                            "open"
                        );

                        menuToggle.textContent = "☰";

                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    }
                );

            });


        /* Close menu when clicking outside */

        document.addEventListener(
            "click",
            event => {

                if (
                    !navLinks.contains(event.target) &&
                    !menuToggle.contains(event.target)
                ) {

                    navLinks.classList.remove(
                        "open"
                    );

                    menuToggle.textContent = "☰";

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }

            }
        );
    }


    /* -----------------------------------------------------
       Mark current page in navbar
       ----------------------------------------------------- */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";

    document
        .querySelectorAll(".nav-links a")
        .forEach(link => {

            const href =
                link.getAttribute("href");

            if (!href) return;

            if (
                href === currentPage ||
                (
                    currentPage === "" &&
                    href === "index.html"
                )
            ) {

                link.classList.add("active");

                link.setAttribute(
                    "aria-current",
                    "page"
                );
            }

        });


    /* -----------------------------------------------------
       Scroll reveal
       ----------------------------------------------------- */

    const revealElements =
        document.querySelectorAll(".reveal");

    if (
        "IntersectionObserver" in window &&
        revealElements.length > 0
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );

        revealElements.forEach(element => {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* -----------------------------------------------------
       Current year
       ----------------------------------------------------- */

    const year =
        document.getElementById("current-year");

    if (year) {
        year.textContent =
            new Date().getFullYear();
    }


    /* -----------------------------------------------------
       Keyboard accessibility for cards
       ----------------------------------------------------- */

    document
        .querySelectorAll("[data-clickable]")
        .forEach(element => {

            element.setAttribute(
                "tabindex",
                "0"
            );

            element.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {

                        event.preventDefault();

                        element.click();
                    }

                }
            );

        });

});
