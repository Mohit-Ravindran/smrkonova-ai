function setActiveLink() {
    // Get current page path
    const path = window.location.pathname;
    const currentPage = path.split('/').pop() || 'index.html';

    // Map page URLs to data-page values
    const pageMap = {
        'index.html': 'home',
        '': 'home',
        'service.html': 'service',
        'about.html': 'about',
        'blog.html': 'blog',
        'contact-us.html': 'contact',
        'ai.html': 'ai'
    };

    // Get the current page identifier
    const pageId = pageMap[currentPage] || '';

    if (pageId) {
        // Remove active class from all links first
        document.querySelectorAll('[data-page]').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to matching links
        const activeLinks = document.querySelectorAll(`[data-page="${pageId}"]`);
        activeLinks.forEach(link => link.classList.add('active'));
    }
}
// Load header and then set active link
fetch('/./shared/header.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
        setActiveLink(); // Optional: highlight the active nav item

        // Add scroll event listener AFTER header is loaded
        const header = document.getElementById('mainHeader');
        window.addEventListener('scroll', function () {
            if (window.scrollY > 0) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    })
    .catch(error => console.error('Error loading header:', error));

// Load review
fetch('./shared/review.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('review').innerHTML = data;

        // Now that the content is loaded, initialize Swiper
        new Swiper('.reviewSwiper', {
            slidesPerView: 3,
            spaceBetween: 30,
            loop: true,
            // autoplay: {
            //   delay: 3000,
            //   disableOnInteraction: false,
            // },
            navigation: {
                nextEl: '.review__right',
                prevEl: '.review__left',
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            },
        });
    });

// Load chat
fetch('/./shared/chat.html')
    .then(res => res.text())
    .then(data => document.getElementById('chat').innerHTML = data);

// Load footer
fetch('/./shared/footer.html')
    .then(res => res.text())
    .then(data => document.getElementById('footer').innerHTML = data);


// Load contact form HTML
fetch('./shared/contact.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('contact').innerHTML = data;

        // Run after HTML is injected
        initContactForm();
    });

function initContactForm() {
    const steps = document.querySelectorAll('.contact-step');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const form = document.getElementById('multiStepForm');
    const contactBtnWrapper = document.querySelector('.contact__btn'); // Add this line

    let currentStep = 0;

    function showStep(index) {
        steps.forEach((step, i) => {
            step.style.display = i === index ? 'block' : 'none';
        });

        if (index === steps.length - 1) {
            // Hide both buttons and the entire button wrapper on the last step
            contactBtnWrapper.style.display = 'none';
        } else {
            contactBtnWrapper.style.display = 'block'; // Show buttons for other steps
            prevBtn.style.display = index === 0 ? 'none' : 'inline-block';
            nextBtn.innerHTML = index === steps.length - 2
                ? '<span>Submit</span>'
                : '<span>Next</span><img src="./assets/img/icons/right-arrow.svg" alt="">';
            nextBtn.style.display = 'inline-block';
        }
    }

    prevBtn.addEventListener('click', function () {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    });

    nextBtn.addEventListener('click', function () {
        if (currentStep === steps.length - 2) {
            // Submit form data to Google Sheets
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => data[key] = value);

            fetch('https://script.google.com/macros/s/AKfycbxdyHsQbfCGLHNp1YY5l5vcKkDx9PBUL6vO7UzqBmBS1kuH3hu8igNinjcpLygh_wbOOw/exec', {
                method: 'POST',
                body: JSON.stringify(data),
            })
                .then(res => res.json())
                .then(result => {
                    console.log("Form submitted:", result);
                    currentStep++;
                    showStep(currentStep); // Show Thank You step
                })
                .catch(err => {
                    alert("Submission failed. Try again.");
                    console.error(err);
                });
        } else if (currentStep < steps.length - 2) {
            currentStep++;
            showStep(currentStep);
        }
    });

    showStep(currentStep); // Initialize step 0
}


// Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

