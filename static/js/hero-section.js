class HeroSection extends HTMLElement {
    async connectedCallback() {
        const html = await window.templateLoader.loadTemplate('static/html/hero-section.html');
        if (html) {
            if (html) {
            try {
                const response = await fetch('static/assets/data.json');
                const rawData = await response.json();

                const dataForTemplate = {
                    title: _.get(rawData, ['hero-section', 'title'], ''),
                    subtitle: _.get(rawData, ['hero-section', 'subtitle'], '')
                };

                const compiledTemplate = _.template(html);
                this.innerHTML = compiledTemplate(dataForTemplate);
            } catch (error) {
                console.error('Error loading or processing footer data:', error);
                const compiledTemplate = _.template(html);
                this.innerHTML = compiledTemplate({
                    title: '',
                    subtitle: ''
                });
            }
        }
        }
    }
}

customElements.define('hero-section', HeroSection);
