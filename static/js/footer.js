class Footer extends HTMLElement {
    async connectedCallback() {
        const html = await window.templateLoader.loadTemplate('static/html/footer.html');

        if (html) {
            try {
                const response = await fetch('static/assets/data.json');
                const rawData = await response.json();

                const dataForTemplate = {
                    year: new Date().getFullYear(),
                    name: _.get(rawData, ['footer', 'name'], ''),
                    tagline: _.get(rawData, ['footer', 'tagline'], '')
                };

                const compiledTemplate = _.template(html);
                this.innerHTML = compiledTemplate(dataForTemplate);
            } catch (error) {
                console.error('Error loading or processing footer data:', error);
                const compiledTemplate = _.template(html);
                this.innerHTML = compiledTemplate({
                    year: '',
                    name: '',
                    tagline: ''
                });
            }
            finally {
                window.dynamicComponentTracker.markLoaded();
            }
        }
    }
}

customElements.define('portfolio-footer', Footer);
