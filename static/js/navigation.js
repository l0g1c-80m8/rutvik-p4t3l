class Navigation extends HTMLElement {
    async connectedCallback() {
        const html = await window.templateLoader.loadTemplate('static/html/navigation.html');
        if (html) {
            this.innerHTML = html;
        }
    }
}

customElements.define('portfolio-navigation', Navigation);
