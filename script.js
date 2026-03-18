document.body.classList.add("loading");

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    if(loader){
        loader.classList.add("hide");
    }

    document.body.classList.remove("loading");
});

// fallback safety
setTimeout(() => {
    document.body.classList.remove("loading");
}, 3000);

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
    const galleryItems = document.querySelectorAll(".event-album");

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

const images = document.querySelectorAll(".gallery-image");
const lightboxImg = lightbox.querySelector(".lightbox-img");
const lightboxTitle = lightbox.querySelector("#lightbox-title");
const lightboxDesc = lightbox.querySelector("#lightbox-desc");
const lightboxClose = lightbox.querySelector(".lightbox-close");
const prevBtn = lightbox.querySelector(".lightbox-prev");
const nextBtn = lightbox.querySelector(".lightbox-next");

let currentIndex = 0;

function showImage(index){

const img = images[index];

lightboxImg.src = img.src;
lightboxTitle.textContent = img.dataset.title || img.alt || "";
lightboxDesc.textContent = img.dataset.description || "";

}

images.forEach((img,index)=>{

img.addEventListener("click",()=>{

currentIndex = index;

showImage(currentIndex);

lightbox.classList.add("show");

});

});

function closeLightbox(){

lightbox.classList.remove("show");
lightboxImg.src="";

}

lightboxClose?.addEventListener("click",closeLightbox);

nextBtn?.addEventListener("click",()=>{

currentIndex = (currentIndex + 1) % images.length;
showImage(currentIndex);

});

prevBtn?.addEventListener("click",()=>{

currentIndex = (currentIndex - 1 + images.length) % images.length;
showImage(currentIndex);

});

lightbox.addEventListener("click",(e)=>{

if(e.target===lightbox){
closeLightbox();
}

});

document.addEventListener("keydown",(e)=>{

if(!lightbox.classList.contains("show")) return;

if(e.key==="ArrowRight"){
currentIndex = (currentIndex + 1) % images.length;
showImage(currentIndex);
}

if(e.key==="ArrowLeft"){
currentIndex = (currentIndex - 1 + images.length) % images.length;
showImage(currentIndex);
}

if(e.key==="Escape"){
closeLightbox();
}

});
    let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener("touchstart", (e) => {
touchStartX = e.changedTouches[0].screenX;
});

lightbox.addEventListener("touchend", (e) => {

touchEndX = e.changedTouches[0].screenX;

if(touchStartX - touchEndX > 50){

// swipe left → next image
currentIndex = (currentIndex + 1) % images.length;
showImage(currentIndex);

}

if(touchEndX - touchStartX > 50){

// swipe right → previous image
currentIndex = (currentIndex - 1 + images.length) % images.length;
showImage(currentIndex);

}

});

}
    
    // ========== Theme Toggle ==========
const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {

    // Load saved theme
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        themeToggle.innerHTML = "☀️";
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            themeToggle.innerHTML = "☀️";
            localStorage.setItem("theme", "dark");
        } else {
            themeToggle.innerHTML = "🌙";
            localStorage.setItem("theme", "light");
        }
    });
}

});


