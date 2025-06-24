class ResearchSection extends HTMLElement {
    async connectedCallback() {
        const html = await window.templateLoader.loadTemplate('static/html/research-section.html');
        if (html) {
            try {
                const response = await fetch('static/assets/data.json');
                const rawData = await response.json();

                const papers = rawData["research-section"];

                const defaultFilter = this.getAttribute('default-filter') || 'all';

                const filtered = defaultFilter === 'all'
                    ? papers
                    : papers.filter(p => p.type === defaultFilter);

                const dataForTemplate = {
                    publications: filtered
                };

                const compiledTemplate = _.template(html);
                this.innerHTML = compiledTemplate(dataForTemplate);

                this.initializeFilter(papers, defaultFilter);
            } catch (error) {
                console.error('Error loading or processing research section data:', error);
                const compiledTemplate = _.template(html);
                this.innerHTML = compiledTemplate({ publications: [] });
            } finally {
                window.dynamicComponentTracker.markLoaded();
            }
        }
    }

    initializeFilter(publications, defaultFilter = 'all') {
    const filterButtons = this.querySelectorAll('.publication-filter');
    const gridContainer = this.querySelector('#publications-grid');

    // Set up button click handlers
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Toggle active class
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filtered = filter === 'all'
                ? publications
                : publications.filter(p => p.type === filter);

            // Render cards
            gridContainer.innerHTML = filtered
                .map(pub => this.createCard(pub))
                .join('');
        });
    });

    const defaultBtn = [...filterButtons].find(btn => btn.getAttribute('data-filter') === defaultFilter);
    if (defaultBtn) {
        defaultBtn.click(); // Simulate a user click
    }
}


    createCard(paper) {
        const tagColors = {
            conference: 'robot-blue',
            journal: 'green-500',
            workshop: 'purple-500',
        };

        const bgGradient = {
            conference: 'from-robot-blue/20 to-robot-purple/20',
            journal: 'from-green-500/20 to-blue-500/20',
            workshop: 'from-purple-500/20 to-pink-500/20',
        };

        const resourceIcons = {
            paper: 'fas fa-file-pdf',
            code: 'fab fa-github',
            video: 'fas fa-video',
            demo: 'fas fa-video',
            site: 'fas fa-external-link-alt'
        };

        const resources = Object.entries(paper.resources || {}).map(([key, url]) => {
            const icon = resourceIcons[key] || 'fas fa-link';
            const label = key.charAt(0).toUpperCase() + key.slice(1);
            return `<a href="${url}" target="_blank" rel="noopener" class="text-robot-blue hover:text-robot-purple transition-colors">
                        <i class="${icon}"></i> ${label}
                    </a>`;
        }).join('');

        const tags = (paper.tags || []).map(tag =>
            `<span class="bg-dark-bg px-2 py-1 rounded text-xs text-robot-blue">${tag}</span>`
        ).join('');

        return `
        <div class="publication-card ${paper.type} bg-dark-card rounded-xl overflow-hidden border border-gray-800 hover:border-robot-blue/50 transition-all group">
            <div class="h-48 bg-gradient-to-br ${bgGradient[paper.type] || 'from-gray-700 to-gray-900'} relative overflow-hidden">
                <img src="${paper.image}" alt="${paper.title}" class="w-full h-full object-cover opacity-80">
                <div class="absolute bottom-4 right-4">
                    <span class="bg-${tagColors[paper.type] || 'gray-500'}/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium capitalize">${paper.type}</span>
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-semibold mb-3 group-hover:text-robot-blue transition-colors">${paper.title}</h3>
                <p class="text-gray-400 text-sm mb-4">${paper.venue}</p>
                <p class="text-gray-300 mb-4 line-clamp-3">${paper.description}</p>
                <div class="flex flex-wrap gap-2 mb-4">${tags}</div>
                <div class="flex space-x-3">${resources}</div>
            </div>
        </div>
        `;
    }
}

customElements.define('research-section', ResearchSection);
