class FormInteractor {
  setListeners () {
    chrome.runtime.onMessage.addListener(this.handler);
  }

  handler () {

  }
}

export default FormInteractor;
