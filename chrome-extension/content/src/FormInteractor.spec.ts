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
    // - [x] no forms
    // - [x] form with no attributes
    //    - [x] has null action
    //    - [x] has null id attribute
    //    - [x] has null classList attribute
    // - [ ] form (attribute action)
    // - [ ] form (attribute id)
    // - [ ] form (attribute class)
    // - [x] form with one field (name)
    // - [ ] form with one field (id)
    // - [ ] form with one field (class)
    // - [ ] form with one field (nodeType [input, select, textarea])
    // - [ ] form with one field (inputType [text, password, hidden])
    // - [ ] form with one field (value)
    // - [ ] integration test, all fields
    // - [ ] multiple forms, all fields
    const tests = [
      {
        test: 'no forms available',
        document: templates.noForms,
        result: arg => arg,
        expected: {
          forms: []
        }
      },
      {
        test: 'one form with one field with a name attribute',
        document: templates.formWithNameField,
        result: arg => arg.forms[0].fields[0].name,
        expected: 'foobar'
      },
      {
        test: 'one form with no attributes, has a null action attribute',
        document: templates.formWithNoAttributes,
        result: arg => arg.forms[0].action,
        expected: null
      },
      {
        test: 'one form with no attributes, has a null id attribute',
        document: templates.formWithNoAttributes,
        result: arg => arg.forms[0].id,
        expected: null
      },
      {
        test: 'one form with no attributes, has a null classList attribute',
        document: templates.formWithNoAttributes,
        result: arg => arg.forms[0].classList,
        expected: null
      },
      // {
      //   test: 'one form with an action attribute',
      //   document: templates.formWithActionAttribute,
      //   result: arg => arg.forms[0].action,
      //   expected: 'form/action'
      // }
    ];

    tests.forEach(t => {
      describe(t.test, () => {
        beforeEach(() => {
          interactor = createInteractor(t.document);
          interactor.handler({ action: 'collectForms' }, null, sendResponse);
        });

        it('responds back to the collectForms event', () => {
          expect(sendResponse.calls.count()).toEqual(1);
        });

        it('sends back the collected form from the page', () => {
          expect(t.result(sendResponse.calls.mostRecent().args[0]))
            .toEqual(t.expected);
        });
      });
    });
  });
});
