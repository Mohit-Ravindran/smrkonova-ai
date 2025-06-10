// Load header
fetch('./shared/header.html')
    .then(res => res.text())
    .then(data => document.getElementById('header').innerHTML = data);


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
fetch('./shared/chat.html')
    .then(res => res.text())
    .then(data => document.getElementById('chat').innerHTML = data);

// Load footer
fetch('./shared/footer.html')
    .then(res => res.text())
    .then(data => document.getElementById('footer').innerHTML = data);


fetch('./shared/contact.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('contact').innerHTML = data;

        // Run the script AFTER content is injected
        initContactForm();
    });

function initContactForm() {
    const steps = document.querySelectorAll('.contact-step');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentStep = 0;

    function showStep(index) {
        steps.forEach((step, i) => {
            step.style.display = i === index ? 'block' : 'none';
        });

        prevBtn.style.display = index === 0 ? 'none' : 'inline-block';
        nextBtn.innerHTML = index === steps.length - 1
            ? '<span>Submit</span>'
            : '<span>Next</span><img src="./assets/img/icons/right-arrow.svg" alt="">';
    }

    prevBtn.addEventListener('click', function () {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    });

    nextBtn.addEventListener('click', function () {
        if (currentStep < steps.length - 1) {
            currentStep++;
            showStep(currentStep);
        } else {
            document.getElementById('contactForm').submit(); // or handle final submission
        }
    });

    showStep(currentStep); // Show the first step initially
}



