const hamMenuBtn = document.querySelector(".header__main-ham-menu-cont");
const smallMenu = document.querySelector(".header__sm-menu");
const headerHamMenuBtn = document.querySelector(".header__main-ham-menu");
const headerHamMenuCloseBtn = document.querySelector(
    ".header__main-ham-menu-close",
);
const headerSmallMenuLinks = document.querySelectorAll(".header__sm-menu-link");

if (hamMenuBtn && smallMenu && headerHamMenuBtn && headerHamMenuCloseBtn) {
    hamMenuBtn.addEventListener("click", () => {
        if (smallMenu.classList.contains("header__sm-menu--active")) {
            smallMenu.classList.remove("header__sm-menu--active");
        } else {
            smallMenu.classList.add("header__sm-menu--active");
        }
        if (headerHamMenuBtn.classList.contains("d-none")) {
            headerHamMenuBtn.classList.remove("d-none");
            headerHamMenuCloseBtn.classList.add("d-none");
        } else {
            headerHamMenuBtn.classList.add("d-none");
            headerHamMenuCloseBtn.classList.remove("d-none");
        }
    });

    for (let i = 0; i < headerSmallMenuLinks.length; i++) {
        headerSmallMenuLinks[i].addEventListener("click", () => {
            smallMenu.classList.remove("header__sm-menu--active");
            headerHamMenuBtn.classList.remove("d-none");
            headerHamMenuCloseBtn.classList.add("d-none");
        });
    }
}

const headerLogoConatiner = document.querySelector(".header__logo-container");

if (headerLogoConatiner) {
    headerLogoConatiner.addEventListener("click", () => {
        location.href = "index.html";
    });
}

const projectForm = document.getElementById("projectForm");

const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzr29ReKQdT9EByVM_Tc_6RCX-N9e5tTKi5h_9BaIlJEszwNJSkbKaT4d6QCp7JGqMC/exec";

const CALENDAR_LINK = "https://calendar.app.google/HgizaeEkEH4vDv7b6";

if (projectForm) {
    projectForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(projectForm);
        const budget = formData.get("budget");
        const submitBtn = projectForm.querySelector(".btn--submit");

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = "INITIALIZING_SYSTEM_UPLOAD...";
            submitBtn.style.cursor = "wait";
        }

        try {
            const response = await fetch(SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                body: new URLSearchParams(formData),
            });

            if (budget === "5k-10k" || budget === "10k+") {
                window.location.href = CALENDAR_LINK;
            } else {
                window.alert(
                    "SUCCESS: REQUIREMENTS_LOGGED. RETURNING_TO_BASE.",
                );
                window.location.href = "./index.html#home";
            }
        } catch (error) {
            console.error("Submission Error:", error);
            window.alert("CRITICAL_ERROR: UPLOAD_FAILED. CHECK_CONNECTION.");

            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = "RETRY_EXECUTION";
            }
        }
    });
}
