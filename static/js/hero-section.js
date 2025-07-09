class HeroSection extends HTMLElement {
    constructor() {
        super();
        this.images = [];
        this.currentImageIndex = 0;
        this.rotationInterval = null;
    }

    async connectedCallback() {
        const html = await window.templateLoader.loadTemplate('static/html/hero-section.html');
        if (html) {
            try {
                const response = await fetch('static/assets/data.json');
                const rawData = await response.json();
                
                const heroData = _.get(rawData, ['hero-section'], {});
                const dataForTemplate = {
                    title: heroData.title || '',
                    subtitle: heroData.subtitle || ''
                };

                // Set image list from JSON
                this.images = heroData.avatars || [];

                const compiledTemplate = _.template(html);
                this.innerHTML = compiledTemplate(dataForTemplate);
                
                // Set the initial image
                const imageElement = this.querySelector('#hero-avatar');
                if (imageElement && this.images.length > 0) {
                    imageElement.src = this.images[0];
                }

                // Start image rotation
                setTimeout(() => {
                    this.startImageRotation();
                }, 100);

            } catch (error) {
                console.error('Error loading or processing hero data:', error);
                const compiledTemplate = _.template(html);
                this.innerHTML = compiledTemplate({
                    title: '',
                    subtitle: ''
                });
            } finally {
                window.dynamicComponentTracker.markLoaded();
            }
        }
    }

    startImageRotation() {
        if (this.images.length <= 1) return;
        this.rotationInterval = setInterval(() => {
            this.rotateToNextImage();
        }, 3000);
    }

    rotateToNextImage() {
        const imageElement = this.querySelector('#hero-avatar');
        if (!imageElement) return;

        imageElement.classList.add('fade-out');

        setTimeout(() => {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
            imageElement.src = this.images[this.currentImageIndex];
            imageElement.classList.remove('fade-out');
            imageElement.classList.add('fade-in');
        }, 250);
    }

    disconnectedCallback() {
        if (this.rotationInterval) {
            clearInterval(this.rotationInterval);
        }
    }
}

customElements.define('hero-section', HeroSection);
