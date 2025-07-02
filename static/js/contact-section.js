class ContactSection extends HTMLElement {
  async connectedCallback() {
    const html = await window.templateLoader.loadTemplate('static/html/contact-section.html');
    if (html) {
      try {
        const response = await fetch('static/assets/data.json');
        const rawData = await response.json();
        const data = _.get(rawData, ['contact-section'], {});
        
        // Replace template variables in HTML
        let processedHtml = html
          .replace('${title}', data.title || '')
          .replace('${subtitle}', data.subtitle || '');
        
        // Replace form field values
        const form = data.form || {};
        const fields = form.fields || {};
        
        processedHtml = processedHtml
          .replace('Send Me a Message', form.heading || 'Send Me a Message')
          .replace('Your full name', fields.name?.placeholder || 'Your full name')
          .replace('you@example.com', fields.email?.placeholder || 'you@example.com')
          .replace('Subject of your message', fields.subject?.placeholder || 'Subject of your message')
          .replace('Write your message here', fields.message?.placeholder || 'Write your message here')
          .replace('Send Message', form.submitText || 'Send Message');
        
        this.innerHTML = processedHtml;
        
        // Populate contact links
        this.populateContactLinks(data.contacts || []);
        
        // Initialize form handling after DOM is populated
        this.initializeForm(data);
        
      } catch (error) {
        console.error('Error loading or processing contact data:', error);
        let processedHtml = html
          .replace('${title}', 'Let\'s Connect')
          .replace('${subtitle}', 'Get in touch with me!');
        
        this.innerHTML = processedHtml;
        this.populateContactLinks([]);
        this.initializeForm({});
        
      } finally {
        window.dynamicComponentTracker.markLoaded();
      }
    }
  }
  
  populateContactLinks(contacts) {
    const linksContainer = this.querySelector('#contact-links');
    if (!linksContainer) return;
    
    linksContainer.innerHTML = contacts.map(contact => `
      <a href="${contact.link}" target="_blank" rel="noopener noreferrer" class="bg-dark-card p-6 rounded-xl border border-gray-800 hover:border-robot-blue/50 transition-all group">
        <i class="${contact.icon} text-3xl text-robot-blue mb-4 group-hover:scale-110 transition-transform"></i>
        <h3 class="font-semibold mb-2">${contact.label}</h3>
        <p class="text-gray-400 text-sm">${contact.text}</p>
      </a>
    `).join('');
  }

  initializeForm(data) {
    const form = this.querySelector('#contact-form');
    const submitBtn = this.querySelector('#form-submit-btn');
    const successMsg = this.querySelector('#form-success-msg');
    
    if (!form || !submitBtn || !successMsg) {
      console.warn('Contact form elements not found');
      return;
    }
    
    const formData = data.form || {};
    // const successMessage = formData.successMessage || 'Thank you for reaching out! I\'ll get back to you soon.';
    const successMessage = 'This form is not yet active. Please email me directly. I\'ll get back to you soon!';
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      
      // Show success message
      successMsg.textContent = successMessage;
      successMsg.classList.remove('hidden');
      form.reset();
      submitBtn.disabled = true;
      
      // Re-enable form after 60 seconds
      setTimeout(() => {
        submitBtn.disabled = false;
        successMsg.classList.add('hidden');
      }, 60000);
    });
  }
}

customElements.define('contact-section', ContactSection);