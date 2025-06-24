class AboutSection extends HTMLElement {
    async connectedCallback() {
        const html = await window.templateLoader.loadTemplate('static/html/about-section.html');
        if (html) {
            if (html) {
            try {
                const response = await fetch('static/assets/data.json');
                const rawData = await response.json();

                const dataForTemplate = {
                    about_lead: _.get(rawData, ['about-section', 'about_lead'], ''),
                    about_conclude: _.get(rawData, ['about-section', 'about_conclude'], ''),
                    skills: _.get(rawData, ['about-section', 'skills'], []),
                    education: _.get(rawData, ['about-section', 'education'], []),
                    experience: _.get(rawData, ['about-section', 'experience'], []),
                    research: _.get(rawData, ['about-section', 'research'], []),
                };

                const compiledTemplate = _.template(html);
                this.innerHTML = compiledTemplate(dataForTemplate);
            } catch (error) {
                console.error('Error loading or processing footer data:', error);
                const compiledTemplate = _.template(html);
                this.innerHTML = compiledTemplate({
                    about_lead: '',
                    about_conclude: '',
                    skills: [],
                    experience:'',
                    research: '',
                });
            }
        }
        }
    }
}

customElements.define('about-section', AboutSection);
