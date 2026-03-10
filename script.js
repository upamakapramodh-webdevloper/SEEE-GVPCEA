document.addEventListener("DOMContentLoaded", () => {

    // ========== Mobile nav toggle ==========
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });
    }

    // ========== Popup (only on home page) ==========
    const popupBackdrop = document.querySelector(".popup-backdrop");
    const popupClose = document.querySelector(".popup-close");
    const popupPrimary = document.querySelector(".popup-primary");

    if (popupBackdrop) {
        setTimeout(() => {
            popupBackdrop.classList.add("show");
        }, 1200);

        const closePopup = () => {
            popupBackdrop.classList.remove("show");
        };

        popupClose?.addEventListener("click", closePopup);
        popupPrimary?.addEventListener("click", closePopup);

        popupBackdrop.addEventListener("click", (e) => {
            if (e.target === popupBackdrop) closePopup();
        });
    }

    // ========== Scroll reveal ==========
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, obs) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        obs.unobserve(entry.target);
                    }

                });

            },
            { threshold: 0.18 }
        );

        revealElements.forEach((el) => observer.observe(el));

    } else {

        revealElements.forEach((el) => el.classList.add("active"));

    }

    // ========== Auto slideshow (homepage banners) ==========
    const slideshow = document.querySelector(".slideshow");

    if (slideshow) {

        const slides = slideshow.querySelectorAll(".slide");

        if (slides.length > 1) {

            let currentIndex = 0;

            const showSlide = (index) => {
                slides.forEach((s, i) => {
                    s.classList.toggle("active", i === index);
                });
            };

            showSlide(currentIndex);

            setInterval(() => {
                currentIndex = (currentIndex + 1) % slides.length;
                showSlide(currentIndex);
            }, 5000);

        }

    }

    // ========== HERO BACKGROUND SLIDER ==========
    const bgSlides = document.querySelectorAll(".bg-slide");

    if (bgSlides.length > 1) {

        let currentSlide = 0;

        function changeSlide(){

            bgSlides[currentSlide].classList.remove("active");

            currentSlide = (currentSlide + 1) % bgSlides.length;

            bgSlides[currentSlide].classList.add("active");

        }

        setInterval(changeSlide, 5000);

    }

    // ========== Gallery tabs ==========
    const tabButtons = document.querySelectorAll(".gallery-tab");
    const galleryItems = document.querySelectorAll(".gallery-item");

    if (tabButtons.length && galleryItems.length) {

        tabButtons.forEach((btn) => {

            btn.addEventListener("click", () => {

                const filter = btn.dataset.filter;

                tabButtons.forEach((b) => b.classList.remove("active"));
                btn.classList.add("active");

                galleryItems.forEach((item) => {

                    const category = item.dataset.category;

                    if (filter === "all" || category === filter) {
                        item.style.display = "";
                    } else {
                        item.style.display = "none";
                    }

                });

            });

        });

    }

    // ========== Lightbox for gallery ==========
    const lightbox = document.querySelector(".lightbox");

    if (lightbox) {

        const lightboxImg = lightbox.querySelector(".lightbox-img");
        const lightboxTitle = lightbox.querySelector("#lightbox-title");
        const lightboxDesc = lightbox.querySelector("#lightbox-desc");
        const lightboxClose = lightbox.querySelector(".lightbox-close");

        const openLightbox = (src, title, desc) => {

            lightboxImg.src = src;
            lightboxTitle.textContent = title || "";
            lightboxDesc.textContent = desc || "";

            lightbox.classList.add("show");

        };

        const closeLightbox = () => {

            lightbox.classList.remove("show");
            lightboxImg.src = "";

        };

        document.querySelectorAll(".gallery-image").forEach((img) => {

            img.addEventListener("click", () => {

                const src = img.getAttribute("src");
                const title = img.dataset.title || img.alt || "";
                const desc = img.dataset.description || "";

                openLightbox(src, title, desc);

            });

        });

        lightboxClose?.addEventListener("click", closeLightbox);

        lightbox.addEventListener("click", (e) => {

            if (e.target === lightbox) closeLightbox();

        });

        document.addEventListener("keydown", (e) => {

            if (e.key === "Escape" && lightbox.classList.contains("show")) {
                closeLightbox();
            }

        });

    }

    // ========== Theme Toggle ==========
    const themeToggle = document.getElementById("theme-toggle");

    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("dark-mode");

            if(document.body.classList.contains("dark-mode")){
                themeToggle.innerHTML = "☀️";
            }else{
                themeToggle.innerHTML = "🌙";
            }

        });

    }

});
