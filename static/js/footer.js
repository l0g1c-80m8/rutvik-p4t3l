class Footer extends HTMLElement {
    async connectedCallback() {
        const htmlTemplate = await window.templateLoader.loadTemplate('static/html/footer.html');

        if (htmlTemplate) {
            try {
                const response = await fetch('static/assets/data.json');
                const rawData = await response.json();

                const dataForTemplate = {
                    year: new Date().getFullYear(),
                    name: _.get(rawData, ['footer', 'name'], ''),
                    tagline: _.get(rawData, ['footer', 'tagline'], '')
                };

                const compiledTemplate = _.template(htmlTemplate);
                this.innerHTML = compiledTemplate(dataForTemplate);
                console.log(compiledTemplate(dataForTemplate));

            } catch (error) {
                console.error('Error loading or processing footer data:', error);
                const compiledTemplate = _.template(htmlTemplate);
                this.innerHTML = compiledTemplate({
                    year: '',
                    name: '',
                    tagline: ''
                });
            }
        }
    }
}

customElements.define('portfolio-footer', Footer);
