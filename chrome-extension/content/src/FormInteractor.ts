class FormInteractor {
  setListeners () {
    chrome.runtime.onMessage.addListener(this.handler);
  }

  handler (request, sender, sendResponse) {
    sendResponse();
  }
}

export default FormInteractor;
