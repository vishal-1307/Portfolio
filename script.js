document.addEventListener('DOMContentLoaded', function () {

    // --- Pre-loader ---
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        setTimeout(() => preloader.classList.add('hidden'), 500);
    });

    // --- Sticky Header on Scroll ---
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Navbar Toggle for Mobile ---
    const menuBtn = document.getElementById('menu-btn');
    const navbar = document.querySelector('.navbar');
    menuBtn.addEventListener('click', () => {
        navbar.classList.toggle('active');
        menuBtn.classList.toggle('fa-times'); // Changes icon to 'X'
    });

    // --- Skills Slider (SwiperJS) for Endless Scroll ---
    const skillsSlider = new Swiper('.skills-slider', {
        loop: true,
        slidesPerView: 7, // Display around 7 slides at a time
        spaceBetween: 40, // Space between icons
        speed: 5000, // Speed of the scroll (adjust as needed)
        allowTouchMove: false, // Disable manual touch/drag
        autoplay: {
            delay: 1, // Minimal delay for continuous effect
            disableOnInteraction: false, // Keep autoplaying even after user interaction
        },
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            // when window width is >= 480px
            480: {
                slidesPerView: 4,
                spaceBetween: 30
            },
            // when window width is >= 768px
            768: {
                slidesPerView: 5,
                spaceBetween: 40
            },
            // when window width is >= 1024px
            1024: {
                slidesPerView: 7,
                spaceBetween: 40
            }
        }
    });

    // --- Scroll Reveal Animation for Sections ---
    const scrollElements = document.querySelectorAll(".animate-on-scroll");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    scrollElements.forEach(el => observer.observe(el));

    // --- Modal Logic ---
    const clickableCards = document.querySelectorAll('[data-modal-target]');
    const body = document.querySelector('body');

    clickableCards.forEach(card => {
        card.addEventListener('click', () => {
            const modal = document.querySelector(card.dataset.modalTarget);
            openModal(modal);
        });
    });

    function openModal(modal) {
        if (modal == null || !modal.querySelector('.modal-content')) return;
        modal.classList.add('active');
        body.classList.add('modal-open');
    }

    function closeModal(modal) {
        if (modal == null) return;
        modal.classList.remove('active');
        body.classList.remove('modal-open');
    }

    const modalOverlays = document.querySelectorAll('.modal-overlay');
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', (event) => {
            if (event.target === overlay || event.target.classList.contains('close-modal')) {
                closeModal(overlay);
            }
        });
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const activeModal = document.querySelector('.modal-overlay.active');
            closeModal(activeModal);
        }
    });
});
