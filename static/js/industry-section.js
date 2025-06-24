class IndustrySection extends HTMLElement {
    async connectedCallback() {
        const html = await window.templateLoader.loadTemplate('static/html/industry-section.html');

        if (html) {
            try {
                const response = await fetch('static/assets/data.json');
                const rawData = await response.json();

                const industryProjects = _.get(rawData, ['industry-section'], []);
                const compiledTemplate = _.template(html);
                this.innerHTML = compiledTemplate({ industryProjects });
            } catch (error) {
                console.error('Error loading industry data:', error);
                this.innerHTML = '<p class="text-red-500">Failed to load industry work.</p>';
            } finally {
                window.dynamicComponentTracker.markLoaded();
            }
        }
    }
}

customElements.define('industry-section', IndustrySection);
