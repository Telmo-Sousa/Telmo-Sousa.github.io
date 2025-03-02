document.addEventListener("DOMContentLoaded", function () {

    const posts = document.querySelectorAll(".posts-grid .post");
    const loadMoreButton = document.querySelector(".load-more");
    const filterButtons = document.querySelectorAll(".filter-buttons button");
    const themeToggle = document.getElementById("theme-toggle");
    const contactForm = document.getElementById("contact-form");

    const state = {
        postsPerPage: window.innerWidth <= 768 ? 3 : posts.length,
        currentPage: 1,
        totalPosts: posts.length,
        activeFilter: "all"
    };

    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("light-mode");
        themeToggle.textContent = document.body.classList.contains("light-mode") ? "☀️" : "🌙";
        localStorage.setItem("theme", document.body.classList.contains("light-mode") ? "light" : "dark");
    });

    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");
        themeToggle.textContent = "☀️";
    }

    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            state.activeFilter = this.getAttribute("data-filter");
            state.currentPage = 1;
            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            filterProjects();
            showPosts();
        });
    });

    function filterProjects() {
        posts.forEach(post => {
            const categories = post.getAttribute("data-categories");
            post.classList.toggle("filtered", state.activeFilter !== "all" && !categories.includes(state.activeFilter));
        });
    }

    function showPosts() {
        state.postsPerPage = window.innerWidth <= 768 ? 3 : posts.length;
        let visibleCount = 0;

        posts.forEach((post) => {
            if (!post.classList.contains("filtered")) {
                visibleCount++;
                post.style.display = visibleCount <= state.postsPerPage * state.currentPage ? "block" : "none";
            } else {
                post.style.display = "none";
            }
        });

        const filteredPosts = Array.from(posts).filter(post => !post.classList.contains("filtered"));
        loadMoreButton.style.display = (window.innerWidth <= 768 && state.currentPage * state.postsPerPage < filteredPosts.length) ? "block" : "none";
    }

    loadMoreButton.addEventListener("click", function () {
        state.currentPage++;
        showPosts();
    });

    if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute("data-src");
                    if (src) {
                        img.src = src;
                        img.removeAttribute("data-src");
                    }
                    observer.unobserve(img);
                }
            });
        });
        document.querySelectorAll("img[loading='lazy']").forEach(img => imageObserver.observe(img));
    }

    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute("href"));
            if (targetElement) {
                const navHeight = document.querySelector(".main-nav").offsetHeight;
                window.scrollTo({
                    top: targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight,
                    behavior: "smooth"
                });
            }
        });
    });

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const formData = new FormData(this);
            const formObject = Object.fromEntries(formData);
            this.style.display = "none";
            const successMessage = document.createElement("div");
            successMessage.className = "success-message";
            successMessage.textContent = "Thank you for your message! I will get back to you soon.";
            successMessage.style.cssText = "color: var(--primary-color); padding: 15px; margin-top: 20px; text-align: center; font-weight: bold;";
            this.parentNode.appendChild(successMessage);
            this.reset();
            console.log("Form submitted:", formObject);
        });
    }

    const animateOnScroll = () => {
        const elements = document.querySelectorAll(".post, .intro, h2, .contact-section");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        elements.forEach(element => observer.observe(element));
    };

    const setupAnimations = () => {
        const style = document.createElement("style");
        style.textContent = `
            .post, .intro, h2, .contact-section {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s, transform 0.6s;
            }
            .animate {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    };

    setupAnimations();
    animateOnScroll();
    filterProjects();
    showPosts();
    window.addEventListener("resize", showPosts);
});
