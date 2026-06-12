/* ============================================================
       RESPONSIVE NAV TOGGLE
    ============================================================ */
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.getElementById("main-nav");

if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("nav-open");
        navToggle.setAttribute("aria-expanded", isOpen);
    });

    /* Close nav when a link is clicked (mobile UX) */
    mainNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            mainNav.classList.remove("nav-open");
            navToggle.setAttribute("aria-expanded", "false");
        });
    });
}

/* ============================================================
       DYNAMIC YEAR IN FOOTER
    ============================================================ */
const year = document.getElementById("year");
if (year) {
    year.textContent = new Date().getFullYear();
}
