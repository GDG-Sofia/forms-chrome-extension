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

      const nodeTypes = ['input', 'select', 'textarea'];
      f.querySelectorAll(nodeTypes.join(',')).forEach(input => {
        const fieldClassNames = input.getAttribute('class');
        const subType = input.getAttribute('type');
        if (subType === 'password') {
          return;
        }
        const nodeType = nodeTypes.find(t => t.toUpperCase() === input.nodeName);
        if (!nodeType) {
          return;
        }
        form.fields.push({
          nodeType,
          subType,
          name: input.getAttribute('name'),
          id: input.getAttribute('id'),
          classList: !fieldClassNames ? null : fieldClassNames.split(' ').sort(),
          value: input.value
        });
      });

      forms.push(form);
    });

    sendResponse({ forms });
  }
}

export default FormInteractor;
