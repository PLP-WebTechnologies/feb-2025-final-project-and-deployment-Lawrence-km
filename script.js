// script.js
document.addEventListener('DOMContentLoaded', function() {
    // ========== Animated Text Typing Effect ==========
    const animatedText = document.querySelector('.animated-text');
    const textToType = "Web Developer & UI Designer";
    let charIndex = 0;
    
    function typeText() {
        if (charIndex < textToType.length) {
            animatedText.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 100); // Adjust typing speed here
        }
    }
    
    // Start typing animation after a short delay
    setTimeout(typeText, 1000);

    // ========== Mobile Navigation Toggle ==========
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.classList.add('mobile-menu-btn');
    document.querySelector('.navbar').appendChild(mobileMenuBtn);
    
    mobileMenuBtn.addEventListener('click', function() {
        document.querySelector('.nav-links').classList.toggle('active');
    });

    // ========== Progress Bar Animation ==========
    const progressBars = document.querySelectorAll('.progress-bar');
    
    function animateProgressBars() {
        progressBars.forEach(bar => {
            const percent = bar.getAttribute('data-percent');
            bar.style.setProperty('--percent', `${percent}%`);
        });
    }
    
    // Animate when skills section comes into view
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillsObserver.observe(document.querySelector('.skills'));

    // ========== Form Validation ==========
    const contactForm = document.createElement('form');
    contactForm.innerHTML = `
        <div class="form-group">
            <input type="text" placeholder="Your Name" required>
        </div>
        <div class="form-group">
            <input type="email" placeholder="Your Email" required>
        </div>
        <div class="form-group">
            <textarea placeholder="Your Message" required></textarea>
        </div>
        <button type="submit" class="btn hire-me">Send Message</button>
    `;
    
    document.querySelector('.contact-info').appendChild(contactForm);
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const inputs = this.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = 'red';
                isValid = false;
            } else {
                input.style.borderColor = '#ddd';
            }
        });
        
        if (isValid) {
            alert('Message sent successfully!');
            this.reset();
        }
    });

    // ========== Smooth Scrolling ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                document.querySelector('.nav-links').classList.remove('active');
            }
        });
    });

    // ========== Portfolio Filtering (Optional) ==========
    const filterButtons = document.createElement('div');
    filterButtons.classList.add('portfolio-filters');
    filterButtons.innerHTML = `
        <button class="filter-btn active" data-filter="all">All</button>
        <button class="filter-btn" data-filter="design">Design</button>
        <button class="filter-btn" data-filter="development">Development</button>
    `;
    
    document.querySelector('.portfolio').insertBefore(filterButtons, document.querySelector('.portfolio-grid'));
    
    filterButtons.addEventListener('click', function(e) {
        if (e.target.classList.contains('filter-btn')) {
            // Update active button
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
            
            // Filter portfolio items
            const filter = e.target.getAttribute('data-filter');
            const portfolioItems = document.querySelectorAll('.portfolio-item');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }
    });

    // ========== Scroll Animation ==========
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-item, .portfolio-item, .stat-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load

    // ========== Current Year in Footer ==========
    document.querySelector('.copyright').textContent = 
        document.querySelector('.copyright').textContent.replace('2022', new Date().getFullYear());
});
