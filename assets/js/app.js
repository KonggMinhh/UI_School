"use strict";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
//  ==== Call Element =====
const backToTopBtn = $(".back-to-top");
const headerEl = $("#header");
const shapeDivider = $("#shape-divider");
const navEl = $(".navbar");
const navbarPc = $("#navbar-pc");
const navbarMobile = $("#navbar-mobile");
const menuBtn = $(".header__bar");
const overLay = $(".overlay");
const overlayPopup = $(".overlay-popup");
const headerDrawer = $(".header__mobile-drawer");
const closeBtn = $(".header__mobile-close");
const navLink = $$(".navbar-link");
const eventLinkVideo = $$(".event__video-icons");
const videoPopup = $(".video-popup iframe");
const heroBtnVideo = $(".hero__btn-video");
console.log(videoPopup);
// ============ Start Back to top =========
function calcBackToTop() {
    let pos = document.documentElement.scrollTop;
    let calcHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);
    if (pos >= 100) {
        backToTopBtn.style.display = "inline-block";
    } else {
        backToTopBtn.style.display = "none";
    }
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
    backToTopBtn.style.background = `conic-gradient( var(--primary-color) ${scrollValue}%, var(--gray-color) ${scrollValue}%)`;
}

window.onscroll = calcBackToTop;
window.onload = calcBackToTop;
// ============ End Back to top ===========

// ========= Start Swiper =====
// Introduce
const introduceLearnSwiper = new Swiper(".introduce-learning__swiper", {
    loop: true,
    spaceBetween: 10,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});
// FeedBack
var feedbackSwiper = new Swiper(".feedback__swiper", {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
// Teacher
var teacherSwiper = new Swiper(".teacher__swiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 1,
        },
        // when window width is >= 480px
        480: {
            slidesPerView: 2,
            spaceBetween: 15,
        },
        // when window width is >= 640px
        640: {
            slidesPerView: 2,
            spaceBetween: 15,
        },
        // when window width is >= 1024px
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    },
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
// Event Img
var eventImgSwiper = new Swiper(".event-img__swiper", {
    effect: "fade",
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
});
// Event video
var eventVideoSwiper = new Swiper(".event-video__swiper", {
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
// ========= End Swiper =====

// ==== Start Menu Toggle ====
function toggleHeaderOverlay() {
    overLay.classList.toggle("active");
    headerDrawer.classList.toggle("active");
    document.body.style.overflow =
        document.body.style.overflow === "hidden" ? "auto" : "hidden";
}

menuBtn.addEventListener("click", toggleHeaderOverlay);

overLay.addEventListener("click", () => {
    toggleHeaderOverlay();
});

closeBtn.addEventListener("click", () => {
    toggleHeaderOverlay();
});

// ==== End Menu Toggle ====

// ============ Start Copy Navigation from PC -> Mobile ===========
navbarMobile.innerHTML = navbarPc.innerHTML;
// ============ End Copy Navigation from PC -> Mobile ===========

// ============ Start Scroll Smooth Link ===========
navEl.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("navbar-link")) {
        const id = e.target.getAttribute("href");
        $(id).scrollIntoView({ behavior: "smooth" });
    }
});
// ============ End Scroll Smooth Link ===========

// ==== Start Close Menu ====
//Tu dong khi chon menu
const menuItems = $$(".navbar-link");
for (var i = 0; i < menuItems.length; i++) {
    var menuItem = menuItems[i];
    // lang nghe su kien click o menu
    menuItem.onclick = function (event) {
        // ktra thẻ anh em liền có phải class = subnav, nếu đúng thì click k bị đóng còn k ngược lại
        var isParent =
            this.nextElementSibling &&
            this.nextElementSibling.classList.contains("navbar");
        if (isParent) {
            event.preventDefault();
        } else {
            overLay.classList.remove("active");
            headerDrawer.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    };
}
// ==== End Close Menu ====

// ============ Start Sticky Navigation ===========
function stickyNav(entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
        headerEl.classList.add("fixed");
    } else {
        headerEl.classList.remove("fixed");
    }
}

const headerObserve = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0.9,
});

headerObserve.observe(headerEl);
// ============ End Sticky Navigation ===========

// ============ Start Change Line Nav link ==========
navLink.forEach((t) => {
    t.onclick = () => {
        navLink.forEach((link) => {
            link.classList.remove("navbar-link-active");
        });
        t.classList.add("navbar-link-active");
    };
});
// ============ End Change Line Nav link =============

// ============ Start PopUp Video ====================
function showVideoPopup(videoLink) {
    if (videoLink) {
        overlayPopup.innerHTML = `
            <div class="video-popup">
                <iframe src="https://www.youtube.com/embed/${videoLink}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
            <button class="video-btn-close">
                <img src="./assets/icons/close.svg" alt="Close">
            </button>    
        `;
        overlayPopup.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

eventLinkVideo.forEach((link) => {
    link.addEventListener("click", () => {
        const videoLink = link.dataset.link;
        showVideoPopup(videoLink);
    });
});

heroBtnVideo.addEventListener("click", () => {
    const videoLink = heroBtnVideo.dataset.link;
    showVideoPopup(videoLink);
});

overlayPopup.addEventListener("click", () => {
    overlayPopup.innerHTML = "";
    overlayPopup.classList.remove("active");
    document.body.style.overflow = "auto";
});
// ============ End PopUp Video ====================
// ===== Start Popup Load Web ====
document.addEventListener("DOMContentLoaded", function () {
    overlayPopup.innerHTML = `
        <a href="#!">
            <img class="popup-img" src="./assets/img/popup.jpg" alt="Popup">
            <button class="video-btn-close">
                <img src="./assets/icons/close.svg" alt="Close">
            </button>  
        </a>
    `;

    overlayPopup.classList.add("active");
    document.body.style.overflow = "hidden";
});
// ===== End Popup Load Web ====
