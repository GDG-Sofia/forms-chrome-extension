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

const templates = {
  noForms,
  formWithNoAttributes,
  formWithNameField,
  formWithActionAttribute,
  formWithIdAttribute,
  formWithClassAttribute,
};

export default templates;
