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

    const action = forms[0].getAttribute('action');

    const input = forms[0].querySelector('input');
    let name = null;
    if (input) {
      name = input.getAttribute('name');
    }
    const response = {
      forms: [
        {
          action,
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
