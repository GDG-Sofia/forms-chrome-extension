import FormInteractor from './FormInteractor';
import { JSDOM } from 'jsdom';

const globalAny: any = global;

describe('Form interactor', () => {
  let chrome;
  let interactor;
  let dom;
  let originalChrome;
  let sendResponse;

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
    sendResponse = jasmine.createSpy('sendResponse');
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

  describe('collecting forms', () => {
    beforeEach(() => {
      const template = `<!doctype html><head><title></title></head>
<body>
  <form>
    <input name="foobar" />
  </form>
</body>`;
      dom = new JSDOM(template);
      interactor = new FormInteractor(dom.window.document);
      interactor.handler({ action: 'collectForms' }, null, sendResponse);
    });

    it('responds back to the collectForms event', () => {
      expect(sendResponse.calls.count()).toEqual(1);
    });

    it('sends back the collected form from the page', () => {
      expect(sendResponse).toHaveBeenCalledWith(
        {
          forms: [
            {
              fields: [
                {
                  name: 'foobar',
                  value: null
                }
              ]
            }
          ]
        }
      );
    });
  });
});
