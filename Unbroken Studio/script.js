// Subtle parallax effect for decorative shapes
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 10;
        const xMove = (x - 0.5) * speed;
        const yMove = (y - 0.5) * speed;
        shape.style.transform = `translate(${xMove}px, ${yMove}px)`;
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe Kintsugi section elements
document.querySelectorAll('.kintsugi-title, .kintsugi-text, .kintsugi-visual, .poll-container').forEach(el => {
    observer.observe(el);
});

// Poll functionality
let hasVoted = false;
const pollData = {
    yes: 0,
    maybe: 0,
    curious: 0
};

document.querySelectorAll('.poll-option').forEach(option => {
    option.addEventListener('click', function() {
        if (hasVoted) return;
        
        hasVoted = true;
        const choice = this.getAttribute('data-option');
        pollData[choice]++;
        
        // Calculate percentages
        const total = pollData.yes + pollData.maybe + pollData.curious;
        const percentages = {
            yes: Math.round((pollData.yes / total) * 100),
            maybe: Math.round((pollData.maybe / total) * 100),
            curious: Math.round((pollData.curious / total) * 100)
        };
        
        // Update UI
        document.querySelectorAll('.poll-option').forEach(opt => {
            opt.classList.add('voted');
            const optChoice = opt.getAttribute('data-option');
            const percentage = percentages[optChoice];
            opt.style.setProperty('--percentage', percentage + '%');
            opt.querySelector('.poll-percentage').textContent = percentage + '%';
        });
        
        // Update vote count
        document.querySelector('.poll-votes').textContent = total + (total === 1 ? ' vote' : ' votes');
        
        // Add animation to selected option
        this.style.background = 'rgba(212, 175, 55, 0.3)';
    });
});

// Console message
console.log('%c✨ Unbroken Studio', 'font-size: 20px; color: #8b7355; font-weight: bold; font-family: Caveat, cursive;');
console.log('%cHealing, one piece at a time', 'font-size: 14px; color: #c9a882; font-family: Caveat, cursive;');
