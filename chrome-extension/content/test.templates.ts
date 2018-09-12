const noForms = `<!doctype html><head><title></title></head>
<body>
  <div>No form available in the document.</div>
</body>`;

const formWithNameField = `<!doctype html><head><title></title></head>
<body>
  <form>
    <input name="foobar" />
  </form>
</body>`;

const formWithNoAttributes = `<!doctype html><head><title></title></head>
<body>
  <form>
  </form>
</body>`;

const formWithActionAttribute = `<!doctype html><head><title></title></head>
<body>
  <form action="form/action">
  </form>
</body>`;

const formWithIdAttribute = `<!doctype html><head><title></title></head>
<body>
  <form id="form-unique-id">
  </form>
</body>`;

const formWithClassAttribute = `<!doctype html><head><title></title></head>
<body>
  <form class="foo bar">
  </form>
</body>`;

const formWithFieldWithId = `<!doctype html><head><title></title></head>
<body>
  <form>
    <input id="username" />
  </form>
</body>`;

const formWithFieldWithClassList = `<!doctype html><head><title></title></head>
<body>
  <form>
    <input class="foo bar" />
  </form>
</body>`;

const formWithFieldWithValue = `<!doctype html><head><title></title></head>
<body>
  <form>
    <input value="foobar" />
  </form>
</body>`;

const formWithNodeTypeInput = `<!doctype html><head><title></title></head>
<body>
  <form>
    <input />
  </form>
</body>`;

const formWithHiddenInput = `<!doctype html><head><title></title></head>
<body>
  <form>
    <input type="hidden" />
  </form>
</body>`;

const formWithTextInput = `<!doctype html><head><title></title></head>
<body>
  <form>
    <input type="text" />
  </form>
</body>`;

const formWithPasswordInput = `<!doctype html><head><title></title></head>
<body>
  <form>
    <input type="password" />
  </form>
</body>`;

const formWithSelectFieldNameAttribute = `<!doctype html><head><title></title></head>
<body>
  <form>
    <select name="foobar">
    </select>
  </form>
</body>`;

const formWithSelectFieldIdAttribute = `<!doctype html><head><title></title></head>
<body>
  <form>
    <select id="select-id">
    </select>
  </form>
</body>`;

const formWithSelectFieldClassAttribute = `<!doctype html><head><title></title></head>
<body>
  <form>
    <select class="foo bar">
    </select>
  </form>
</body>`;

const formWithNodeTypeSelect = `<!doctype html><head><title></title></head>
<body>
  <form>
    <select></select>
  </form>
</body>`;

const formWithSelectFieldValueAttribute = `<!doctype html><head><title></title></head>
<body>
  <form>
    <select>
      <option value="foo">show foo</option>
      <option value="bar" selected>show bar</option>
      <option value="spam">show spam</option>
    </select>
  </form>
</body>`;


const formWithTextareaFieldNameAttribute = `<!doctype html><head><title></title></head>
<body>
  <form>
    <textarea name="textarea-name"></textarea>
  </form>
</body>`;

const templates = {
  noForms,
  formWithNoAttributes,
  formWithNameField,
  formWithActionAttribute,
  formWithIdAttribute,
  formWithClassAttribute,
  formWithFieldWithId,
  formWithFieldWithClassList,
  formWithFieldWithValue,
  formWithNodeTypeInput,
  formWithHiddenInput,
  formWithTextInput,
  formWithPasswordInput,
  formWithSelectFieldNameAttribute,
  formWithSelectFieldIdAttribute,
  formWithSelectFieldClassAttribute,
  formWithNodeTypeSelect,
  formWithSelectFieldValueAttribute,
  formWithTextareaFieldNameAttribute,
};

export default templates;
