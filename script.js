
// A parte abaixo faz com que a nav desapareça sempre que o scroll tiver a direção vertical para baixo
// E quando para cima, ele aparece novamente
const nav = document.querySelector("nav");

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 50) {
        nav.classList.add("hidden");
    } else {
        nav.classList.remove("hidden");
    }

    lastScrollY = currentScrollY;
});


// A parte abaixo cuida dos slides

const slides = document.querySelector(".slides");

let currentSlide = 0;
const totalSlides = document.querySelectorAll(".slides img").length;

function goToSlide(index) {
    slides.style.transform = `translateX(-${index * 100}%)`;
}

setInterval(() => {
    currentSlide++;

    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }

    goToSlide(currentSlide);
}, 8000);
