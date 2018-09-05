class FormInteractor {
  private doc;

  constructor (doc) {
    this.doc = doc;
  }

  setListeners () {
    chrome.runtime.onMessage.addListener(this.handler);
  }

  handler (request, sender, sendResponse) {
    const forms = [];

    this.doc.querySelectorAll('form').forEach(f => {
      const form = {
        action: f.getAttribute('action'),
        fields: []
      };

      f.querySelectorAll('input').forEach(input => {
        form.fields.push({
          name: input.getAttribute('name')
        });
      });

      forms.push(form);
    });

    sendResponse({ forms });
  }
}

export default FormInteractor;
