const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger?.classList.remove('active');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = targetPosition - 80;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

const fadeInElements = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeInElements.forEach(el => {
    el.style.animationPlayState = 'paused';
    fadeObserver.observe(el);
});

const animateStats = () => {
    const stats = document.querySelectorAll('.stat-value');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target') || 0);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        };
        
        updateCounter();
    });
};

const loadGitHubStats = async () => {
    try {
        const username = '4drianC4';
        const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        
        if (!response.ok) {
            throw new Error('Error al cargar datos de GitHub');
        }
        
        const repos = await response.json();
        
        const totalRepos = repos.length;
        const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
        
        const statValues = document.querySelectorAll('.github-stats .stat-value');
        if (statValues.length >= 3) {
            statValues[0].setAttribute('data-target', totalRepos);
            statValues[1].setAttribute('data-target', totalStars);
            statValues[2].setAttribute('data-target', totalForks);
        }
        
    } catch (error) {
        console.error('Error cargando stats de GitHub:', error);
        const statValues = document.querySelectorAll('.github-stats .stat-value');
        statValues.forEach(stat => stat.textContent = '0');
    }
};

const statsSection = document.querySelector('.github-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadGitHubStats().then(() => {
                    animateStats();
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

const techItems = document.querySelectorAll('.tech-item');

techItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        item.style.transition = 'all 0.6s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    }, 100 * index);
    
    item.addEventListener('mouseenter', () => {
        const randomRotate = Math.random() * 10 - 5;
        item.style.transform = `translateY(-8px) rotate(${randomRotate}deg)`;
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) rotate(0deg)';
    });
});


const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    card.style.transition = 'all 0.8s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100 * (index % 3));
                cardObserver.unobserve(card);
            }
        });
    }, { threshold: 0.1 });
    
    cardObserver.observe(card);
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-10px)
            scale3d(1.02, 1.02, 1.02)
        `;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale3d(1, 1, 1)';
    });
});


const personalCards = document.querySelectorAll('.personal-card');

personalCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.9)';
    
    const personalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    card.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 150 * index);
                personalObserver.unobserve(card);
            }
        });
    }, { threshold: 0.1 });
    
    personalObserver.observe(card);
});

const profileImage = document.querySelector('.profile-image');
const heroInfo = document.querySelector('.hero-info');

if (profileImage && heroInfo) {
    window.addEventListener('load', () => {
        profileImage.style.opacity = '0';
        heroInfo.style.opacity = '0';
        heroInfo.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            profileImage.style.transition = 'opacity 0.8s ease';
            profileImage.style.opacity = '1';
        }, 200);
        
        setTimeout(() => {
            heroInfo.style.transition = 'all 0.8s ease';
            heroInfo.style.opacity = '1';
            heroInfo.style.transform = 'translateY(0)';
        }, 600);
    });
}


const quotes = [
    "Code is poetry.",
    "Make it work, make it right, make it fast.",
    "First, solve the problem. Then, write the code.",
    "Simplicity is the soul of efficiency.",
    "Clean code always looks like it was written by someone who cares."
];

const addEasterEgg = () => {
    let clickCount = 0;
    const logo = document.querySelector('.logo');
    
    logo?.addEventListener('click', (e) => {
        e.preventDefault();
        clickCount++;
        
        if (clickCount === 5) {
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            alert(`🎉 Easter Egg! 🎉\n\n"${randomQuote}"`);
            clickCount = 0;
        }
    });
};

addEasterEgg();


const lazyLoadImages = () => {
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
    
    images.forEach(img => imageObserver.observe(img));
};

lazyLoadImages();


document.addEventListener('DOMContentLoaded', () => {
    console.log('%c💙 Portfolio Loaded Successfully! 💙', 'color: #4a90e2; font-size: 20px; font-weight: bold;');
    console.log('%cBuilt with passion and code by Adrian.C', 'color: #5881c1; font-size: 14px;');
    
    document.body.classList.add('loaded');
});


const contactMethods = document.querySelectorAll('.contact-method');

contactMethods.forEach((method, index) => {
    method.style.opacity = '0';
    method.style.transform = 'translateX(-50px)';
    
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    method.style.transition = 'all 0.6s ease';
                    method.style.opacity = '1';
                    method.style.transform = 'translateX(0)';
                }, 100 * index);
                contactObserver.unobserve(method);
            }
        });
    }, { threshold: 0.1 });
    
    contactObserver.observe(method);
});
