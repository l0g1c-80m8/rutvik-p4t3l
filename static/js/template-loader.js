class TemplateLoader {
    constructor() {
        this.cache = new Map();
    }

    async loadTemplate(path) {
        if (this.cache.has(path)) {
            return this.cache.get(path);
        }

        try {
            const response = await fetch(path);
            const html = await response.text();
            this.cache.set(path, html);
            return html;
        } catch (error) {
            console.error(`Failed to load template: ${path}`, error);
            return null;
        }
    }
}

// Global template loader instance
window.templateLoader = new TemplateLoader();