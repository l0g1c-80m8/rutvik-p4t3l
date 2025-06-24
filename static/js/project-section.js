class ProjectSection extends HTMLElement {
    async connectedCallback() {
        const html = await window.templateLoader.loadTemplate('static/html/project-section.html');

        if (html) {
            try {
                const response = await fetch('static/assets/data.json');
                const rawData = await response.json();

                const projects = _.get(rawData, ['project-section'], []);

                const compiledTemplate = _.template(html);
                this.innerHTML = compiledTemplate({ projects });
            } catch (error) {
                console.error('Error loading or rendering project section:', error);
                this.innerHTML = '<p class="text-red-500">Failed to load project data.</p>';
            } finally {
                window.dynamicComponentTracker.markLoaded();
            }
        }
    }
}

customElements.define('project-section', ProjectSection);
