// script.js - Main JavaScript functionality

// ===================================
// Typing Animation
// ===================================
const typingText = document.getElementById('typingText');
const roles = [
    'Cybersecurity Student',
    'Ethical Hacker',
    'Red Team Enthusiast',
    'Penetration Tester',
    'CTF Player',
    'Security Researcher'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeRole() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        // Pause at end before deleting
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeRole, typingSpeed);
}

// Start typing animation
if (typingText) {
    setTimeout(typeRole, 1000);
}

// ===================================
// Smooth Scrolling
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navMenu = document.getElementById('navMenu');
            const mobileToggle = document.getElementById('mobileToggle');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        }
    });
});

// ===================================
// Navbar Scroll Effect
// ===================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===================================
// Mobile Navigation Toggle
// ===================================
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
}

// ===================================
// Theme Toggle (Dark/Light Mode)
// ===================================
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

/* Load saved theme */
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
    body.classList.add("light-theme");
}

/* Toggle theme on click */
themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-theme");

    const theme = body.classList.contains("light-theme") ? "light" : "dark";
    localStorage.setItem("theme", theme);
});


// ===================================
// Active Navigation Link
// ===================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = sectionId;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===================================
// Form Validation & Submission
// ===================================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');
    
    // Real-time validation
    nameInput.addEventListener('blur', () => validateName());
    emailInput.addEventListener('blur', () => validateEmail());
    subjectInput.addEventListener('blur', () => validateSubject());
    messageInput.addEventListener('blur', () => validateMessage());
    
    function validateName() {
        const name = nameInput.value.trim();
        if (name.length < 2) {
            nameError.textContent = 'Name must be at least 2 characters';
            return false;
        }
        nameError.textContent = '';
        return true;
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email address';
            return false;
        }
        emailError.textContent = '';
        return true;
    }
    
    function validateSubject() {
        const subject = subjectInput.value.trim();
        if (subject.length < 3) {
            subjectError.textContent = 'Subject must be at least 3 characters';
            return false;
        }
        subjectError.textContent = '';
        return true;
    }
    
    function validateMessage() {
        const message = messageInput.value.trim();
        if (message.length < 10) {
            messageError.textContent = 'Message must be at least 10 characters';
            return false;
        }
        messageError.textContent = '';
        return true;
    }
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();
        
        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            // Here you would normally send the form data to a server
            // For now, we'll just show a success message
            
            // Show success message
            formSuccess.classList.add('show');
            
            // Reset form
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.classList.remove('show');
            }, 5000);
            
            // Log form data (in production, send to backend)
            const formData = {
                name: nameInput.value,
                email: emailInput.value,
                subject: subjectInput.value,
                message: messageInput.value,
                timestamp: new Date().toISOString()
            };
            
            console.log('Form submitted:', formData);
            
            // You can integrate with services like:
            // - EmailJS: https://www.emailjs.com/
            // - Formspree: https://formspree.io/
            // - Netlify Forms: https://www.netlify.com/products/forms/
        }
    });
}

// ===================================
// Scroll Reveal Animation
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// ===================================
// Project Cards Animation on Hover
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// ===================================
// Skill Cards Stagger Animation
// ===================================
const skillCategories = document.querySelectorAll('.skill-category');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

skillCategories.forEach(category => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(30px)';
    category.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    skillObserver.observe(category);
});

// ===================================
// Stats Counter Animation
// ===================================
const stats = document.querySelectorAll('.stat h3');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const finalValue = target.textContent;
            const numericValue = parseInt(finalValue.replace(/[^0-9]/g, ''));
            const suffix = finalValue.replace(/[0-9]/g, '');
            
            let currentValue = 0;
            const increment = numericValue / 50;
            const duration = 2000;
            const stepTime = duration / 50;
            
            const counter = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    target.textContent = numericValue + suffix;
                    clearInterval(counter);
                } else {
                    target.textContent = Math.floor(currentValue) + suffix;
                }
            }, stepTime);
            
            statsObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => statsObserver.observe(stat));

// ===================================
// Parallax Effect for Hero
// ===================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroContent && window.innerWidth > 768) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    }
});

// ===================================
// Add Glow Effect to Buttons on Mouse Move
// ===================================
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        button.style.setProperty('--x', `${x}px`);
        button.style.setProperty('--y', `${y}px`);
    });
});

// ===================================
// Preloader (Optional)
// ===================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===================================
// Console Easter Egg
// ===================================
console.log(
    '%c🔐 Welcome to Suraj M.R\'s Portfolio! 🔐',
    'font-size: 20px; font-weight: bold; color: #00d9ff; text-shadow: 2px 2px 4px rgba(0, 217, 255, 0.5);'
);
console.log(
    '%cCybersecurity Student | Ethical Hacker | Red Team Enthusiast',
    'font-size: 14px; color: #00ff9f;'
);
console.log(
    '%c📧 Email: suraj777m.r@gmail.com',
    'font-size: 12px; color: #a0a0a0;'
);
console.log(
    '%c💼 LinkedIn: linkedin.com/in/surajmr01',
    'font-size: 12px; color: #a0a0a0;'
);
console.log(
    '%c💻 GitHub: github.com/jarus10',
    'font-size: 12px; color: #a0a0a0;'
);
console.log(
    '%c🎯 TryHackMe: tryhackme.com/p/suraj777m.r',
    'font-size: 12px; color: #a0a0a0;'
);

// ===================================
// Performance Optimization
// ===================================
// Lazy load images when they come into viewport
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// Accessibility Enhancements
// ===================================
// Add skip to content link functionality
const skipLink = document.querySelector('a[href="#main"]');
if (skipLink) {
    skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const main = document.getElementById('main');
        if (main) {
            main.tabIndex = -1;
            main.focus();
        }
    });
}

// Keyboard navigation for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const link = card.querySelector('.project-link');
            if (link) link.click();
        }
    });
});
// ===================================
// Load GitHub Repositories (Projects Section)
// ===================================
fetch('https://api.github.com/users/jarus10/repos?sort=updated')
    .then(response => response.json())
    .then(repos => {
        const projectsGrid = document.getElementById('projectsGrid');
        if (!projectsGrid) return;

        projectsGrid.innerHTML = ''; // clear existing content

        repos
            .filter(repo => !repo.fork) // hide forked repos
            .slice(0, 6) // show top 6 projects
            .forEach(repo => {
                const card = document.createElement('div');
                card.className = 'project-card';

                card.innerHTML = `
                    <div class="project-content">
                        <h3>${repo.name}</h3>
                        <p class="project-description">
                            ${repo.description || 'No description provided.'}
                        </p>
                        <div class="project-links">
                            <a class="project-link" href="${repo.html_url}" target="_blank">
                                View Repository
                            </a>
                        </div>
                    </div>
                `;

                projectsGrid.appendChild(card);
            });
    })
    .catch(err => console.error('GitHub repo load error:', err));


// ===================================
// Handle External Links
// ===================================
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.setAttribute('rel', 'noopener noreferrer');
});

// ===================================
// Update Copyright Year
// ===================================
const copyrightYear = document.querySelector('.footer-content p');
if (copyrightYear) {
    const currentYear = new Date().getFullYear();
    copyrightYear.textContent = copyrightYear.textContent.replace('2024', currentYear);
}
// ===================================
// Load GitHub Repositories (Featured Projects)
// ===================================
const projectsGrid = document.getElementById("projectsGrid");

if (projectsGrid) {
    fetch("https://api.github.com/users/jarus10/repos?sort=updated")
        .then(response => response.json())
        .then(repos => {
            projectsGrid.innerHTML = "";

            repos.forEach(repo => {
                if (repo.fork) return; // skip forked repos

                const card = document.createElement("div");
                card.className = "project-card";

                card.innerHTML = `
                    <h3 class="project-title">${repo.name}</h3>
                    <p class="project-description">
                        ${repo.description || "No description provided."}
                    </p>
                    <div class="project-meta">
                        <span>⭐ ${repo.stargazers_count}</span>
                        <span>🍴 ${repo.forks_count}</span>
                        <span>${repo.language || "N/A"}</span>
                    </div>
                    <a href="${repo.html_url}" 
                       target="_blank" 
                       class="project-link">
                        View on GitHub →
                    </a>
                `;

                projectsGrid.appendChild(card);
            });
        })
        .catch(error => {
            console.error("GitHub repo load failed:", error);
            projectsGrid.innerHTML = "<p>Unable to load projects.</p>";
        });
}
