class ContactSection extends HTMLElement {
  async connectedCallback() {
    const html = await window.templateLoader.loadTemplate('static/html/contact-section.html');
    if (!html) return;
    this.innerHTML = html;

    const form = this.querySelector('#contact-form');
    const submitBtn = this.querySelector('#form-submit-btn');
    const successMsg = this.querySelector('#form-success-msg');

    form.addEventListener('submit', e => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      //Send message
      successMsg.textContent = "Thank you for reaching out! I'll get back to you soon.";
      successMsg.classList.remove('hidden');

      form.reset();

      submitBtn.disabled = true;
      setTimeout(() => {
        submitBtn.disabled = false;
        successMsg.classList.add('hidden');
      }, 60000);
    });

    window.dynamicComponentTracker.markLoaded();
  }
}

customElements.define('contact-section', ContactSection);
