import FormInteractor from './FormInteractor';

const globalAny: any = global;

describe('Form interactor', () => {
  let chrome;
  let interactor;
  let originalChrome;

  beforeEach(() => {
    originalChrome = globalAny.chrome;
    chrome = {
      runtime: {
        onMessage: {
          addListener: function () {
          }
        }
      }
    };
    globalAny.chrome = chrome;
    spyOn(chrome.runtime.onMessage, 'addListener').and.stub();
  });

  afterEach(() => {
    globalAny.chrome = originalChrome;
  });

  describe('when setListeners is called', () => {
    beforeEach(() => {
      interactor = new FormInteractor();
      interactor.setListeners();
    });
    it('sets up listeners for events from the browser action (popup)', () => {
      expect(chrome.runtime.onMessage.addListener.calls.count()).toEqual(1);
      expect(chrome.runtime.onMessage.addListener).toHaveBeenCalledWith(interactor.handler);
    });
  });
});
