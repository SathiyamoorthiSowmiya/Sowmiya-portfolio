
/*================================= toggle icon navbar ===================================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active')
};

/*================================= certificate lightbox ===================================*/
let certCards = document.querySelectorAll('.cert-featured-card');
let certLightbox = document.querySelector('#certLightbox');
let certLightboxImg = document.querySelector('#certLightboxImg');
let certLightboxClose = document.querySelector('#certLightboxClose');

certCards.forEach(card => {
    card.onclick = (e) => {
        e.preventDefault();
        let img = card.querySelector('img');
        certLightboxImg.src = img.src;
        certLightboxImg.alt = img.alt;
        certLightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
});

let closeCertLightbox = () => {
    certLightbox.classList.remove('active');
    document.body.style.overflow = '';
};

certLightboxClose.onclick = closeCertLightbox;
certLightbox.onclick = (e) => {
    if (e.target === certLightbox) closeCertLightbox();
};
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCertLightbox();
});

/*================================= certificate filter tabs ===================================*/
let certFilterBtns = document.querySelectorAll('.cert-filter-btn');

certFilterBtns.forEach(btn => {
    btn.onclick = () => {
        certFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        let filter = btn.dataset.filter;
        certCards.forEach(card => {
            card.hidden = filter !== 'all' && card.dataset.certCategory !== filter;
        });
    };
});

/*================================= scroll section active link ===================================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    /*================================= sticky navbar ===================================*/
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /*================================= remove toggle icon and navbar ===================================*/
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
};

/*================================= scroll reveal ===================================*/
ScrollReveal({
    //reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200,
});

ScrollReveal().reveal('.home-content, heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .skills-container, .project-box', {origin:'botton' });
ScrollReveal().reveal('.home-content h1, .about-img, .resume-preview, .cert-featured-card:nth-child(1), .contact-info', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content, .resume-actions, .cert-featured-card:nth-child(2), .contact form', { origin: 'right' });


/*================================= contact form ===================================*/
let contactForm = document.querySelector('#contact-form');
let formBtn = contactForm.querySelector('.btn');
let formStatus = contactForm.querySelector('.form-status');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    formBtn.disabled = true;
    formBtn.textContent = 'Sending...';
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
            formStatus.textContent = 'Message sent! I\'ll get back to you soon.';
            formStatus.classList.add('success');
            contactForm.reset();
        } else {
            formStatus.textContent = 'Something went wrong. Please try again.';
            formStatus.classList.add('error');
        }
        formStatus.classList.add('show');
        setTimeout(() => formStatus.classList.remove('show'), 4000);
    })
    .catch(() => {
        formStatus.textContent = 'Something went wrong. Please try again.';
        formStatus.classList.add('error');
        formStatus.classList.add('show');
        setTimeout(() => formStatus.classList.remove('show'), 4000);
    })
    .finally(() => {
        formBtn.disabled = false;
        formBtn.textContent = 'Send Message';
    });
});

/*================================= typed js ===================================*/

const typed = new Typed('.multiple-text', {
    strings:['Full Stack Developer', 'Web Developer','Front End Developer',],
    typeSpeed: 70,
    backSpeed: 70,
    backDelay: 1000,
    loop: true,
});

