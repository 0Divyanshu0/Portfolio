'use strict';

// toggle helper
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// Sidebar toggle
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
if (sidebarBtn) sidebarBtn.addEventListener("click", function() { elementToggleFunc(sidebar); });

// Modal testimonials
const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');

const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const testimonialsModalFunc = function () {
    if (modalContainer) modalContainer.classList.toggle('active');
    if (overlay) overlay.classList.toggle('active');
}

if (testimonialsItem) {
    for (let i = 0; i < testimonialsItem.length; i++) {
        testimonialsItem[i].addEventListener('click', function () {
            const avatar = this.querySelector('[data-testimonials-avatar]');
            const title = this.querySelector('[data-testimonials-title]');
            const text = this.querySelector('[data-testimonials-text]');

            if (modalImg && avatar) {
                modalImg.src = avatar.src;
                modalImg.alt = avatar.alt || '';
            }
            if (modalTitle && title) modalTitle.innerHTML = title.innerHTML;
            if (modalText && text) modalText.innerHTML = text.innerHTML;

            testimonialsModalFunc();
        });
    }
}
if (modalCloseBtn) modalCloseBtn.addEventListener('click', testimonialsModalFunc);
if (overlay) overlay.addEventListener('click', testimonialsModalFunc);

// Filter select
const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');

if (select) select.addEventListener('click', function () { elementToggleFunc(this); });

if (selectItems) {
    for (let i = 0; i < selectItems.length; i++) {
        selectItems[i].addEventListener('click', function () {
            let selectedValue = this.innerText.toLowerCase();
            if (selectValue) selectValue.innerText = this.innerText;
            elementToggleFunc(select);
            filterFunc(selectedValue);
        });
    }
}

const filterItems = document.querySelectorAll('[data-filter-item]');

const filterFunc = function (selectedValue) {
    for (let i = 0; i < filterItems.length; i++) {
        if (selectedValue === "all") {
            filterItems[i].classList.add('active');
        } else if (selectedValue === filterItems[i].dataset.category) {
            filterItems[i].classList.add('active');
        } else {
            filterItems[i].classList.remove('active');
        }
    }
}

// Filter buttons (desktop)
let lastClickedBtn = filterBtn[0];
for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener('click', function () {
        let selectedValue = this.innerText.toLowerCase();
        if (selectValue) selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        if (lastClickedBtn) lastClickedBtn.classList.remove('active');
        this.classList.add('active');
        lastClickedBtn = this;
    });
}

// Contact Form enabling
const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

if (formInputs) {
    for (let i = 0; i < formInputs.length; i++) {
        formInputs[i].addEventListener('input', function () {
            if (form && form.checkValidity()) {
                if (formBtn) formBtn.removeAttribute('disabled');
            } else {
                if (formBtn) formBtn.setAttribute('disabled', '');
            }
        });
    }
}

// Page Navigation (fixed variable scoping)
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

for (let navIndex = 0; navIndex < navigationLinks.length; navIndex++) {
    navigationLinks[navIndex].addEventListener('click', function () {
        const targetPageName = this.innerHTML.toLowerCase().trim();

        for (let pageIndex = 0; pageIndex < pages.length; pageIndex++) {
            const page = pages[pageIndex];
            const navLink = navigationLinks[pageIndex];

            if (page.dataset.page === targetPageName) {
                page.classList.add('active');
                if (navLink) navLink.classList.add('active');
                window.scrollTo(0, 0);
            } else {
                page.classList.remove('active');
                if (navLink) navLink.classList.remove('active');
            }
        }
    });
}
// PRELOADER
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
