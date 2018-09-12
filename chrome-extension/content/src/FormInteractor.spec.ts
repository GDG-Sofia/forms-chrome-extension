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
    // - [x] form (attribute action)
    // - [x] form (attribute id)
    // - [x] form (attribute class)
    //    - [ ] input field
    //       - [x] form with one field (name)
    //       - [x] form with one field (id)
    //       - [x] form with one field (class)
    //       - [x] form with one field (value)
    //       - [x] form with one field (nodeType input)
    //          - [x] field with subType hidden
    //          - [x] field with subType text
    //          - [x] field with subType password (does not get collected)
    //    - [ ] select
    //       - [ ] form with one field (value)
    //       - [ ] form with one field (name)
    //       - [ ] form with one field (id)
    //       - [ ] form with one field (class)
    //       - [ ] form with one field (nodeType select)
    //          - [ ] subType is null
    //    - [ ] textarea
    //       - [ ] form with one field (value)
    //       - [ ] form with one field (name)
    //       - [ ] form with one field (id)
    //       - [ ] form with one field (class)
    //       - [ ] form with one field (nodeType textarea)
    //          - [ ] subType is null
    // - [ ] integration test, all fields missing (null values)
    // - [ ] integration test, all fields present
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
      {
        test: 'one form with an action attribute',
        document: templates.formWithActionAttribute,
        result: arg => arg.forms[0].action,
        expected: 'form/action'
      },
      {
        test: 'one form with an id attribute',
        document: templates.formWithIdAttribute,
        result: arg => arg.forms[0].id,
        expected: 'form-unique-id'
      },
      {
        test: 'one form with a classList attribute',
        document: templates.formWithClassAttribute,
        result: arg => arg.forms[0].classList,
        expected: ['bar', 'foo']
      },
      {
        test: 'one form with one field with an id attribute',
        document: templates.formWithFieldWithId,
        result: arg => arg.forms[0].fields[0].id,
        expected: 'username'
      },
      {
        test: 'one form with one field with a classList attribute',
        document: templates.formWithFieldWithClassList,
        result: arg => arg.forms[0].fields[0].classList,
        expected: ['bar', 'foo']
      },
      {
        test: 'one form with one field with a value attribute',
        document: templates.formWithFieldWithValue,
        result: arg => arg.forms[0].fields[0].value,
        expected: 'foobar'
      },
      {
        test: 'one form with one field which is an input nodeType',
        document: templates.formWithNodeTypeInput,
        result: arg => arg.forms[0].fields[0].nodeType,
        expected: 'input'
      },
      {
        test: 'one form with hidden input',
        document: templates.formWithHiddenInput,
        result: arg => arg.forms[0].fields[0].subType,
        expected: 'hidden'
      },
      {
        test: 'one form with text input',
        document: templates.formWithTextInput,
        result: arg => arg.forms[0].fields[0].subType,
        expected: 'text'
      },
      {
        test: 'one form with password input',
        document: templates.formWithPasswordInput,
        result: arg => arg.forms[0].fields.length,
        expected: 0
      },
      {
        test: 'can fetch select attribute',
        document: templates.formWithSelectFieldNameAttribute,
        result: arg => arg.forms[0].fields[0].name,
        expected: 'foobar'
      },
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
