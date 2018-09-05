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
      const classNames = f.getAttribute('class');
      const form = {
        action: f.getAttribute('action'),
        id: f.getAttribute('id'),
        classList: !classNames ? null : classNames.split(' ').sort(),
        fields: []
      };

      f.querySelectorAll('input').forEach(input => {
        form.fields.push({
          name: input.getAttribute('name'),
          id: input.getAttribute('id')
        });
      });

      forms.push(form);
    });

    sendResponse({ forms });
  }
}

export default FormInteractor;
