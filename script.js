// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect with hide/show functionality
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    let scrollTimeout;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Clear previous timeout
        clearTimeout(scrollTimeout);
        
        // Add scrolling class for immediate feedback
        header.classList.add('scrolling');
        
        // Remove scrolling class after scroll stops
        scrollTimeout = setTimeout(() => {
            header.classList.remove('scrolling');
        }, 150);
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            
            // Hide header when scrolling down, show when scrolling up
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelector('input[placeholder="Assunto"]').value;
            const message = this.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !phone || !email || !subject || !message) {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            
            // Create WhatsApp message
            const whatsappMessage = `Olá Dr. Vinícius!

*Nome:* ${name}
*Telefone:* ${phone}
*Email:* ${email}
*Assunto:* ${subject}

*Mensagem:*
${message}

Enviado através do site.`;
            
            const whatsappUrl = `https://wa.me/5554999999999?text=${encodeURIComponent(whatsappMessage)}`;
            
            // Show success message
            const submitBtn = this.querySelector('.btn-primary');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Mensagem Enviada!';
            submitBtn.style.background = '#10b981';
            
            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
            
            // Reset form after 2 seconds
            setTimeout(() => {
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
            }, 2000);
        });
    }

    // Phone button click
    const phoneButtons = document.querySelectorAll('.phone-btn, a[href^="tel:"]');
    
    phoneButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const whatsappUrl = 'https://wa.me/5554999999999?text=Olá Dr. Vinícius! Gostaria de agendar uma consulta.';
            window.open(whatsappUrl, '_blank');
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.specialty, .testimonial, .role, .stat');
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });

    // Counter animation for stats
    const stats = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element, target, isPercentage = false, isPlus = false) => {
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (isPlus) {
                element.textContent = Math.floor(current) + '+';
            } else if (isPercentage) {
                element.textContent = Math.floor(current) + '%';
            } else {
                element.textContent = Math.floor(current).toLocaleString() + '+';
            }
        }, 20);
    };

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                
                // Determine the type based on original content
                if (text.includes('%')) {
                    animateCounter(element, number, true, false);
                } else if (text.includes('+') && number < 100) {
                    animateCounter(element, number, false, true);
                } else {
                    animateCounter(element, number, false, false);
                }
                
                statsObserver.unobserve(element);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Floating animation for hero image
    const doctorPhoto = document.querySelector('.doctor-photo');
    
    if (doctorPhoto) {
        let mouseX = 0;
        let mouseY = 0;
        let photoX = 0;
        let photoY = 0;
        
        document.addEventListener('mousemove', function(e) {
            mouseX = (e.clientX - window.innerWidth / 2) * 0.01;
            mouseY = (e.clientY - window.innerHeight / 2) * 0.01;
        });
        
        function animatePhoto() {
            photoX += (mouseX - photoX) * 0.1;
            photoY += (mouseY - photoY) * 0.1;
            
            doctorPhoto.style.transform = `translate(${photoX}px, ${photoY}px)`;
            requestAnimationFrame(animatePhoto);
        }
        
        animatePhoto();
    }

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            hero.style.transform = `translateY(${parallax}px)`;
        });
    }

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Mobile menu toggle (if needed in future)

    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .cta-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    console.log('Site do Dr. Vinícius Lain carregado com sucesso!');
});

