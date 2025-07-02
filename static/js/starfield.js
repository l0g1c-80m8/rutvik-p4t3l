// Starfield Animation
class Starfield {
    constructor() {
        this.canvas = document.getElementById('starfield');
        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.numStars = 200;
        
        this.resize();
        this.createStars();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createStars() {
        this.stars = [];
        for (let i = 0; i < this.numStars; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 0.5,
                speed: Math.random() * 0.5 + 0.1,
                opacity: Math.random() * 0.8 + 0.2,
                twinkle: Math.random() * 0.02 + 0.005,
                phase: Math.random() * Math.PI * 2
            });
        }
    }
    
    updateStars() {
        this.stars.forEach(star => {
            // Slow drift movement
            star.y += star.speed;
            star.x += star.speed * 0.3;
            
            // Wrap around screen
            if (star.y > this.canvas.height + 10) {
                star.y = -10;
                star.x = Math.random() * this.canvas.width;
            }
            if (star.x > this.canvas.width + 10) {
                star.x = -10;
            }
            
            // Twinkling effect
            star.phase += star.twinkle;
            star.opacity = 0.3 + Math.sin(star.phase) * 0.4;
        });
    }
    
    drawStars() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.stars.forEach(star => {
            const gradient = this.ctx.createRadialGradient(
                star.x, star.y, 0,
                star.x, star.y, star.size * 2
            );
            
            // Color variation based on size
            let color;
            if (star.size > 1.5) {
                color = `rgba(0, 212, 255, ${star.opacity})`;
            } else if (star.size > 1) {
                color = `rgba(147, 51, 234, ${star.opacity})`;
            } else {
                color = `rgba(255, 255, 255, ${star.opacity})`;
            }
            
            gradient.addColorStop(0, color);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Add subtle glow for larger stars
            if (star.size > 1.2) {
                this.ctx.shadowBlur = star.size * 3;
                this.ctx.shadowColor = color;
                this.ctx.beginPath();
                this.ctx.arc(star.x, star.y, star.size * 0.3, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.shadowBlur = 0;
            }
        });
    }
    
    animate() {
        this.updateStars();
        this.drawStars();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize starfield when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Starfield();
});

// Add scroll-based parallax effect
let lastScrollY = 0;
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const nebula = document.querySelector('.nebula-overlay');
    
    // Subtle parallax movement
    nebula.style.transform = `translateY(${scrollY * 0.1}px)`;
    
    lastScrollY = scrollY;
});
