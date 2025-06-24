// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars';
            } else {
                icon.className = 'fas fa-times';
            }
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu) {
                    mobileMenu.classList.add('hidden');
                    const menuIcon = mobileMenuBtn?.querySelector('i');
                    if (menuIcon) {
                        menuIcon.className = 'fas fa-bars';
                    }
                }
            }
        });
    });

    // Publication filter functionality
    const publicationFilters = document.querySelectorAll('.publication-filter');
    const publicationCards = document.querySelectorAll('.publication-card');

    publicationFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            publicationFilters.forEach(f => {
                f.classList.remove('active', 'bg-robot-blue', 'text-dark-bg');
                f.classList.add('text-gray-300');
            });
            
            // Add active class to clicked filter
            this.classList.add('active', 'bg-robot-blue', 'text-dark-bg');
            this.classList.remove('text-gray-300');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter cards
            publicationCards.forEach(card => {
                if (filterValue === 'all' || card.classList.contains(filterValue)) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down - hide navbar
            if (navbar) {
                navbar.style.transform = 'translateY(-100%)';
            }
        } else {
            // Scrolling up - show navbar
            if (navbar) {
                navbar.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop;
        
        // Add background blur when scrolled
        if (navbar) {
            if (scrollTop > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }
    });

    // Intersection Observer for section highlighting in navbar
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        rootMargin: '-100px 0px -66% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const navLink = document.querySelector(`a[href="#${entry.target.id}"]`);
            if (entry.isIntersecting) {
                // Remove active class from all nav links
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('text-robot-blue', 'nav-active');
                    link.classList.add('text-gray-300');
                });
                
                // Add active class to current section link
                if (navLink) {
                    navLink.classList.add('text-robot-blue', 'nav-active');
                    navLink.classList.remove('text-gray-300');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Animated counters for statistics
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            element.textContent = Math.floor(start);
            
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }

    // Initialize counters when they come into view
    const counters = document.querySelectorAll('[data-counter]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.counter);
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // Parallax effect for hero section
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('#home');
        if (hero) {
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
        }
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // Enhanced card hover effects
    const cards = document.querySelectorAll('.publication-card, .project-card, .bg-dark-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('card-hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('card-hover');
        });
        
        // Add mouse move effect for 3D tilt
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // Typewriter effect for hero text
    function typeWriter(element, text, speed = 100) {
        if (!element) return;
        
        let i = 0;
        element.innerHTML = '';
        element.style.borderRight = '2px solid #00d4ff';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        type();
    }

    // Initialize typewriter effect for hero subtitle
    const heroSubtitle = document.querySelector('.hero-typewriter');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        setTimeout(() => {
            typeWriter(heroSubtitle, text, 80);
        }, 1000);
    }

    // Form submission handling
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            const formData = new FormData(this);
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual implementation)
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Message Sent!';
                submitBtn.classList.remove('btn-primary');
                submitBtn.classList.add('btn-success');
                
                // Reset form
                this.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.add('btn-primary');
                    submitBtn.classList.remove('btn-success');
                }, 3000);
            }, 1500);
        });
    }

    // Loading animation for project media buttons
    const mediaButtons = document.querySelectorAll('.media-btn');
    mediaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const icon = this.querySelector('i');
            const originalClass = icon.className;
            
            // Show loading spinner
            icon.className = 'fas fa-spinner fa-spin';
            button.disabled = true;
            
            // Simulate loading
            setTimeout(() => {
                icon.className = originalClass;
                button.disabled = false;
                
                // Here you would typically open a modal or navigate to the content
                console.log('Opening:', this.textContent.trim());
                
                // Show a simple notification
                showNotification('Opening media content...', 'info');
            }, 1000);
        });
    });

    // Search functionality
    function initializeSearch() {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', debounce(function() {
                const query = this.value.toLowerCase();
                const searchableElements = document.querySelectorAll('[data-searchable]');
                
                searchableElements.forEach(element => {
                    const text = element.textContent.toLowerCase();
                    const parent = element.closest('.publication-card, .project-card, .bg-dark-card');
                    
                    if (text.includes(query) || query === '') {
                        parent.style.display = 'block';
                        parent.classList.add('search-visible');
                    } else {
                        parent.style.display = 'none';
                        parent.classList.remove('search-visible');
                    }
                });
            }, 300));
        }
    }

    // Debounce function for search
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    initializeSearch();

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('opacity-0');
                img.classList.add('opacity-100');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${getNotificationIcon(type)} mr-2"></i>
                <span>${message}</span>
                <button class="notification-close ml-auto">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('notification-hide');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.classList.add('notification-hide');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
    }

    function getNotificationIcon(type) {
        switch(type) {
            case 'success': return 'check-circle';
            case 'error': return 'exclamation-circle';
            case 'warning': return 'exclamation-triangle';
            default: return 'info-circle';
        }
    }

    // Back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Initialize AOS (Animate On Scroll) if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });
    }

    // Skills animation
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const percentage = skillBar.dataset.percentage;
                const progressBar = skillBar.querySelector('.skill-progress');
                
                if (progressBar) {
                    setTimeout(() => {
                        progressBar.style.width = percentage + '%';
                    }, 200);
                }
                
                skillObserver.unobserve(skillBar);
            }
        });
    });

    skillBars.forEach(skill => {
        skillObserver.observe(skill);
    });

    // Dark mode toggle (if implemented)
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            const isDark = document.documentElement.classList.contains('dark');
            localStorage.setItem('darkMode', isDark);
            
            const icon = darkModeToggle.querySelector('i');
            icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        });
        
        // Check for saved dark mode preference
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'true') {
            document.documentElement.classList.add('dark');
            const icon = darkModeToggle.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-sun';
            }
        }
    }

    console.log('Portfolio JavaScript initialized successfully!');
});