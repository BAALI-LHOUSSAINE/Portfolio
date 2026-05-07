// ===== CLASSE CARROUSEL PHOTO =====
class PhotoCarousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.carousel-slide');
        this.indicators = document.querySelectorAll('.carousel-indicator');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.autoSlideInterval = null;
        
        this.init();
    }
    
    init() {
        // Vérifier que les éléments existent
        if (!this.slides.length || !this.indicators.length || !this.prevBtn || !this.nextBtn) {
            console.error('Éléments du carrousel introuvables');
            return;
        }
        
        // Event listeners
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Indicator click events
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Start auto-slide
        this.startAutoSlide();
        
        // Pause auto-slide on hover
        const carousel = document.querySelector('.photo-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => this.stopAutoSlide());
            carousel.addEventListener('mouseleave', () => this.startAutoSlide());
        }
    }
    
    goToSlide(slideIndex) {
        // Remove active class from current slide and indicator
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide].classList.remove('active');
        
        // Update current slide
        this.currentSlide = slideIndex;
        
        // Add active class to new slide and indicator
        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
    
    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 4000); // Change slide every 4 seconds
    }
    
    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }
}

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== INITIALISER LE CARROUSEL =====
    const carousel = new PhotoCarousel();
    
    // ===== NAVIGATION MOBILE =====
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu mobile
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fermer le menu mobile quand on clique sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Fermer le menu mobile quand on clique ailleurs
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // ===== SCROLL INDICATOR =====
    function createScrollIndicator() {
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        document.body.appendChild(scrollIndicator);
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollIndicator.style.transform = `scaleX(${scrollPercent / 100})`;
        });
    }
    
    createScrollIndicator();

    // ===== NAVIGATION ACTIVE LINK =====
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }
    
    updateActiveNavLink();

    // ===== SMOOTH SCROLLING =====
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== ANIMATION AU SCROLL =====
    function animateOnScroll() {
        const elements = document.querySelectorAll('.project-card, .article-card, .skill-category');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(element => {
            observer.observe(element);
        });
    }
    
    animateOnScroll();

    // ===== GESTION DU FORMULAIRE DE CONTACT =====
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les données du formulaire
            const formData = new FormData(this);
            const formDataObj = {};
            
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // Validation basique
            if (!validateForm(formDataObj)) {
                return;
            }
            
            // Afficher le loading
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Envoi en cours...';
            submitButton.disabled = true;
            
            // Simuler l'envoi (remplacer par votre logique d'envoi)
            setTimeout(() => {
                // Afficher le message de succès
                showMessage('Votre message a été envoyé avec succès !', 'success');
                
                // Réinitialiser le formulaire
                this.reset();
                
                // Restaurer le bouton
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // ===== VALIDATION DU FORMULAIRE =====
    function validateForm(data) {
        const errors = [];
        
        if (!data.name || data.name.trim().length < 2) {
            errors.push('Le nom doit contenir au moins 2 caractères');
        }
        
        if (!data.email || !isValidEmail(data.email)) {
            errors.push('Veuillez entrer une adresse email valide');
        }
        
        if (!data.subject || data.subject.trim().length < 3) {
            errors.push('Le sujet doit contenir au moins 3 caractères');
        }
        
        if (!data.message || data.message.trim().length < 10) {
            errors.push('Le message doit contenir au moins 10 caractères');
        }
        
        if (errors.length > 0) {
            showMessage(errors.join('<br>'), 'error');
            return false;
        }
        
        return true;
    }

    // ===== VALIDATION EMAIL =====
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // ===== AFFICHAGE DES MESSAGES POPUP =====
    function showMessage(message, type) {
        // Supprimer les anciens popups
        const existingPopups = document.querySelectorAll('.popup-overlay');
        existingPopups.forEach(popup => popup.remove());
        
        // Créer l'overlay
        const overlay = document.createElement('div');
        overlay.className = 'popup-overlay';
        
        // Créer le popup
        const popup = document.createElement('div');
        popup.className = `popup popup-${type}`;
        
        // Icône selon le type
        const icon = type === 'success' ? '✓' : '⚠';
        const iconColor = type === 'success' ? '#10b981' : '#ef4444';
        
        popup.innerHTML = `
            <div class="popup-header">
                <div class="popup-icon" style="color: ${iconColor}; background: ${iconColor}20;">
                    ${icon}
                </div>
                <button class="popup-close" aria-label="Fermer">×</button>
            </div>
            <div class="popup-content">
                <h3>${type === 'success' ? 'Succès' : 'Erreur'}</h3>
                <p>${message}</p>
            </div>
            <div class="popup-actions">
                <button class="popup-btn popup-btn-primary">OK</button>
            </div>
        `;
        
        overlay.appendChild(popup);
        document.body.appendChild(overlay);
        
        // Animation d'entrée
        requestAnimationFrame(() => {
            overlay.classList.add('show');
            popup.classList.add('show');
        });
        
        // Fonction pour fermer le popup
        function closePopup() {
            overlay.classList.remove('show');
            popup.classList.remove('show');
            setTimeout(() => {
                overlay.remove();
            }, 300);
        }
        
        // Événements de fermeture
        popup.querySelector('.popup-close').addEventListener('click', closePopup);
        popup.querySelector('.popup-btn-primary').addEventListener('click', closePopup);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closePopup();
        });
        
        // Fermer avec Escape
        document.addEventListener('keydown', function escapeHandler(e) {
            if (e.key === 'Escape') {
                closePopup();
                document.removeEventListener('keydown', escapeHandler);
            }
        });
        
        // Auto-fermeture après 5 secondes pour les messages de succès
        if (type === 'success') {
            setTimeout(closePopup, 5000);
        }
    }

    // ===== TYPING ANIMATION POUR LE HERO =====
    function initTypingAnimation() {
        const codeLines = document.querySelectorAll('.code-line');
        
        codeLines.forEach((line, index) => {
            line.style.setProperty('--width', line.style.width || '80%');
            
            // Redémarrer l'animation en boucle
            setInterval(() => {
                line.style.animation = 'none';
                line.offsetHeight; // Trigger reflow
                line.style.animation = null;
            }, 8000 + (index * 500));
        });
    }
    
    initTypingAnimation();

    // ===== EFFET PARALLAX LÉGER =====
    function initParallax() {
        const hero = document.querySelector('.hero');
        const codeAnimation = document.querySelector('.code-animation');
        
        if (hero && codeAnimation) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                codeAnimation.style.transform = `translateY(${rate}px)`;
            });
        }
    }
    
    initParallax();

    // ===== GESTION DES LIENS EXTERNES =====
    function handleExternalLinks() {
        const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="https"]');
        
        externalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Ajouter target="_blank" aux liens externes
                if (!this.hasAttribute('target')) {
                    this.setAttribute('target', '_blank');
                    this.setAttribute('rel', 'noopener noreferrer');
                }
            });
        });
    }
    
    handleExternalLinks();

    // ===== LAZY LOADING POUR LES IMAGES =====
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    initLazyLoading();

    // ===== GESTION DU DARK MODE (OPTIONNEL) =====
    function initDarkMode() {
        const darkModeToggle = document.querySelector('.dark-mode-toggle');
        
        if (darkModeToggle) {
            // Vérifier la préférence sauvegardée
            const isDarkMode = localStorage.getItem('darkMode') === 'true';
            if (isDarkMode) {
                document.body.classList.add('dark-mode');
            }
            
            darkModeToggle.addEventListener('click', function() {
                document.body.classList.toggle('dark-mode');
                localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
            });
        }
    }
    
    initDarkMode();

    // ===== PERFORMANCE: DEBOUNCE POUR LES EVENTS =====
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

    // ===== GESTION DES ERREURS =====
    window.addEventListener('error', function(e) {
        console.error('Erreur JavaScript:', e.error);
        // Optionnel: envoyer l'erreur à un service de monitoring
    });

    // ===== OPTIMISATION DU SCROLL =====
    let ticking = false;
    
    function updateOnScroll() {
        // Toute logique liée au scroll peut être mise ici
        if (!ticking) {
            requestAnimationFrame(function() {
                // Logique de scroll optimisée
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', debounce(updateOnScroll, 16));

    // ===== ACCESSIBILITÉ =====
    function initAccessibility() {
        // Gestion du focus au clavier
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', function() {
            document.body.classList.remove('keyboard-navigation');
        });
        
        // Escape pour fermer le menu mobile
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    }
    
    initAccessibility();

    // ===== ANALYTICS (OPTIONNEL) =====
    function trackEvent(eventName, properties = {}) {
        // Intégration avec Google Analytics ou autre
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, properties);
        }
        
        console.log('Event tracked:', eventName, properties);
    }
    
    // Tracker les clics sur les projets
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            const projectName = this.querySelector('h3').textContent;
            trackEvent('project_click', { project_name: projectName });
        });
    });

    // ===== INITIALISATION FINALE =====
    console.log('🚀 Portfolio JavaScript initialisé avec succès !');
    
    // Marquer le chargement comme terminé
    document.body.classList.add('loaded');
});

// ===== UTILITAIRES GLOBAUX =====
window.portfolioUtils = {
    showMessage: function(message, type = 'success') {
        // Fonction utilitaire accessible globalement
        const messageDiv = document.createElement('div');
        messageDiv.className = `${type}-message show`;
        messageDiv.textContent = message;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
};

// ===== SERVICE WORKER POUR LA PERFORMANCE (OPTIONNEL) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}