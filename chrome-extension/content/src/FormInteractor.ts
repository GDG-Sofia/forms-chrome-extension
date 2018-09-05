class FormInteractor {
  private doc;

  constructor (doc) {
    this.doc = doc;
  }

  setListeners () {
    chrome.runtime.onMessage.addListener(this.handler);
  }

  handler (request, sender, sendResponse) {
    const forms = this.doc.querySelectorAll('form');

    if (!forms.length) {
      return sendResponse({ forms: [] });
    }

    const name = this.doc.querySelector('form').querySelector('input').getAttribute('name');
    const response = {
      forms: [
        {
          fields: [
            {
              name: name,
              value: null
            }
          ]
        }
      ]
    };
    sendResponse(response);
  }
}

export default FormInteractor;
