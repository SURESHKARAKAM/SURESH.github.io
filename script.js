// ===================================
// SCROLL ANIMATIONS - INTERSECTION OBSERVER
// ===================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(el => observer.observe(el));
});

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===================================
// ANIMATED COUNTER FOR STATS
// ===================================

function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const startTime = performance.now();
  
  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    
    const current = Math.floor(start + (target - start) * easeOutQuart);
    
    // Handle percentage or plain numbers
    if (element.dataset.type === 'percentage') {
      element.textContent = current + '%';
    } else if (element.dataset.type === 'plus') {
      element.textContent = current + '+';
    } else {
      element.textContent = current;
    }
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      // Set final value
      if (element.dataset.type === 'percentage') {
        element.textContent = target + '%';
      } else if (element.dataset.type === 'plus') {
        element.textContent = target + '+';
      } else {
        element.textContent = target;
      }
    }
  }
  
  requestAnimationFrame(updateCounter);
}

// Initialize counters when stats section becomes visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statCards = entry.target.querySelectorAll('.stat-card');
      statCards.forEach(card => {
        const valueElement = card.querySelector('.stat-value');
        if (valueElement && !valueElement.dataset.animated) {
          const text = valueElement.textContent.trim();
          let targetValue;
          let dataType = '';
          
          if (text.includes('%')) {
            targetValue = parseInt(text.replace('%', ''));
            dataType = 'percentage';
          } else if (text.includes('+')) {
            targetValue = parseInt(text.replace('+', ''));
            dataType = 'plus';
          } else {
            targetValue = parseInt(text);
          }
          
          valueElement.dataset.type = dataType;
          valueElement.dataset.animated = 'true';
          animateCounter(valueElement, targetValue);
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.addEventListener('DOMContentLoaded', () => {
  const statsGrid = document.querySelector('.stats-grid');
  if (statsGrid) {
    statsObserver.observe(statsGrid);
  }
});

// ===================================
// PARALLAX EFFECT ON SCROLL
// ===================================

let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  const backgroundAnimation = document.querySelector('.background-animation');
  
  if (backgroundAnimation) {
    // Create subtle parallax effect
    backgroundAnimation.style.transform = `translateY(${currentScrollY * 0.3}px)`;
  }
  
  lastScrollY = currentScrollY;
});

// ===================================
// DYNAMIC TYPING EFFECT FOR HERO (OPTIONAL)
// ===================================

function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// ===================================
// SKILL TAG HOVER EFFECT ENHANCEMENT
// ===================================

document.addEventListener('DOMContentLoaded', () => {
  const skillTags = document.querySelectorAll('.skill-tag');
  
  skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
  });
});

// ===================================
// PROJECT CARDS TILT EFFECT
// ===================================

document.addEventListener('DOMContentLoaded', () => {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
});

// ===================================
// GLASS CARD SHINE EFFECT
// ===================================

document.addEventListener('DOMContentLoaded', () => {
  const glassCards = document.querySelectorAll('.glass-card, .skill-category, .timeline-content');
  
  glassCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const angleX = (y - centerY) / centerY;
      const angleY = (centerX - x) / centerX;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
});

// ===================================
// LOADING PROGRESS BAR
// ===================================

window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// ===================================
// CONSOLE MESSAGE (EASTER EGG)
// ===================================

console.log('%c👋 Hello there!', 'color: #667eea; font-size: 24px; font-weight: bold;');
console.log('%c🤖 I see you\'re checking out the console!', 'color: #f5576c; font-size: 16px;');
console.log('%c💼 Interested in collaboration? Let\'s connect!', 'color: #00f2fe; font-size: 14px;');
console.log('%c📧 Email: sureshaiagentic448@gmail.com', 'color: #43e97b; font-size: 14px;');

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Debounce function for scroll events
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

// Optimize scroll listener
const optimizedScroll = debounce(() => {
  // Your scroll logic here
}, 10);

window.addEventListener('scroll', optimizedScroll);
