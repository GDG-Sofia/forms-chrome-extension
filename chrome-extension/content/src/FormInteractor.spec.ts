import FormInteractor from './FormInteractor';
import { JSDOM } from 'jsdom';
import templates from '../test.templates';

const globalAny: any = global;

describe('Form interactor', () => {
  let chrome;
  let interactor;
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

  const createInteractor = (template) => {
    const dom = new JSDOM(template);
    return new FormInteractor(dom.window.document);
  };

  describe('when setListeners is called', () => {
    beforeEach(() => {
      interactor = createInteractor(templates.formWithNameField);
      interactor.setListeners();
    });
    it('sets up listeners for events from the browser action (popup)', () => {
      expect(chrome.runtime.onMessage.addListener.calls.count()).toEqual(1);
      expect(chrome.runtime.onMessage.addListener).toHaveBeenCalledWith(interactor.handler);
    });
  });

  describe('collecting forms', () => {
    // @todo:
    // - [ ] no forms
    // - [ ] form (attribute action)
    // - [ ] form (attribute id)
    // - [ ] form (attribute class)
    // - [x] form with one field (name)
    // - [ ] form with one field (id)
    // - [ ] form with one field (class)
    // - [ ] form with one field (nodeType [input, select, textarea])
    // - [ ] form with one field (inputType [text, password, hidden])
    // - [ ] form with one field (value)

    describe('no forms available', () => {
      beforeEach(() => {
        interactor = createInteractor(templates.noForms);
        interactor.handler({ action: 'collectForms' }, null, sendResponse);
      });

      it('responds back to the collectForms event', () => {
        expect(sendResponse.calls.count()).toEqual(1);
      });

      it('sends back the collected form from the page', () => {
        expect(sendResponse.calls.mostRecent().args[0])
          .toEqual({ forms: [] });
      });
    });

    describe('one form with one field with a name attribute', () => {
      beforeEach(() => {
        interactor = createInteractor(templates.formWithNameField);
        interactor.handler({ action: 'collectForms' }, null, sendResponse);
      });

      it('responds back to the collectForms event', () => {
        expect(sendResponse.calls.count()).toEqual(1);
      });

      it('sends back the collected form from the page', () => {
        expect(sendResponse.calls.mostRecent().args[0].forms[0].fields[0].name)
          .toEqual('foobar');
      });
    });
  });
});
