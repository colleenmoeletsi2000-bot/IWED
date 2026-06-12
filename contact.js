/* ============================================================
       LIVE CHARACTER COUNT FOR TEXTAREA
    ============================================================ */

const messageArea = document.getElementById("message");
const messageCount = document.getElementById("message-count");

if (messageArea && messageCount) {
    messageArea.addEventListener("input", () => {
        messageCount.textContent = `${messageArea.value.length} / 1000 characters`;
    });
}

/* ============================================================
       CONTACT FORM VALIDATION
    ============================================================ */
const form = document.getElementById("contact-form");
const successBanner = document.getElementById("form-success");
document.addEventListener("DOMContentLoaded", () => {
    // contact form code here
    /* --- Validation rules --- */
    const validators = {
        "full-name": {
            el: () => document.getElementById("full-name"),
            errEl: () => document.getElementById("full-name-error"),
            validate(val) {
                if (!val.trim()) return "Please enter your full name.";
                if (val.trim().length < 2)
                    return "Name must be at least 2 characters.";
                if (val.trim().length > 100)
                    return "Name must be under 100 characters.";
                return "";
            },
        },
        email: {
            el: () => document.getElementById("email"),
            errEl: () => document.getElementById("email-error"),
            validate(val) {
                if (!val.trim()) return "Please enter your email address.";
                /* Basic RFC-ish pattern */
                const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
                if (!pattern.test(val.trim()))
                    return "Please enter a valid email address (e.g. name@example.com).";
                return "";
            },
        },
        phone: {
            el: () => document.getElementById("phone"),
            errEl: () => document.getElementById("phone-error"),
            validate(val) {
                if (!val.trim()) return ""; /* optional field */
                /* Allow digits, spaces, +, -, () */
                const stripped = val.replace(/[\s\-\(\)\+]/g, "");
                if (!/^\d{9,15}$/.test(stripped))
                    return "Please enter a valid phone number (9–15 digits).";
                return "";
            },
        },
        subject: {
            el: () => document.getElementById("subject"),
            errEl: () => document.getElementById("subject-error"),
            validate(val) {
                if (!val) return "Please select a subject.";
                return "";
            },
        },
        message: {
            el: () => document.getElementById("message"),
            errEl: () => document.getElementById("message-error"),
            validate(val) {
                if (!val.trim()) return "Please enter a message.";
                if (val.trim().length < 10)
                    return "Message must be at least 10 characters.";
                return "";
            },
        },
        consent: {
            el: () => document.getElementById("consent"),
            errEl: () => document.getElementById("consent-error"),
            validate(val, el) {
                if (!el.checked)
                    return "You must agree to our privacy policy to send a message.";
                return "";
            },
        },
    };

    /* --- Show / clear a single field error --- */
    function setError(fieldKey, message) {
        const inputEl = validators[fieldKey].el();
        const errEl = validators[fieldKey].errEl();
        errEl.textContent = message;
        if (message) {
            inputEl.setAttribute("aria-invalid", "true");
            inputEl.classList.add("input-error");
        } else {
            inputEl.removeAttribute("aria-invalid");
            inputEl.classList.remove("input-error");
        }
    }

    /* --- Validate a single field and return true if valid --- */
    function validateField(fieldKey) {
        const inputEl = validators[fieldKey].el();
        const val = inputEl.value;
        const msg = validators[fieldKey].validate(val, inputEl);
        setError(fieldKey, msg);
        return msg === "";
    }

    /* --- Inline (on-blur) validation --- */
    Object.keys(validators).forEach((key) => {
        const inputEl = validators[key].el();
        inputEl.addEventListener("blur", () => validateField(key));
        /* Clear error as soon as user starts correcting */
        inputEl.addEventListener("input", () => {
            if (inputEl.classList.contains("input-error")) validateField(key);
        });
        if (inputEl.type === "checkbox") {
            inputEl.addEventListener("change", () => validateField(key));
        }
    });

    /* --- Submit handler --- */
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let allValid = true;
        Object.keys(validators).forEach((key) => {
            if (!validateField(key)) allValid = false;
        });

        if (!allValid) {
            /* Scroll to first error */
            const firstError = form.querySelector(".input-error");
            if (firstError) firstError.focus();
            return;
        }

        /* ---- Simulate submission (replace with real fetch/API call later) ---- */
        const submitBtn = form.querySelector(".btn-submit");
        submitBtn.textContent = "Sending…";
        submitBtn.disabled = true;

        setTimeout(() => {
            form.reset();
            messageCount.textContent = "0 / 1000 characters";
            /* Clear any remaining aria-invalid states */
            Object.keys(validators).forEach((key) => setError(key, ""));
            successBanner.hidden = false;
            successBanner.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            submitBtn.textContent = "Send Message";
            submitBtn.disabled = false;
        }, 800);
    });
});
