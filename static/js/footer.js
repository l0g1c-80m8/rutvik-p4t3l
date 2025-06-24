class Footer extends HTMLElement {
    async connectedCallback() {
        const html = await window.templateLoader.loadTemplate('static/html/footer.html');
        if (html) {
            const name = this.getAttribute('name') || '';
            const tagline = this.getAttribute('tagline') || '';
            const year = new Date().getFullYear();

            const rendered = html
                .replace('{{year}}', year)
                .replace('{{name}}', name)
                .replace('{{tagline}}', tagline);

            this.innerHTML = rendered;
        }
    }
}

customElements.define('portfolio-footer', Footer);
