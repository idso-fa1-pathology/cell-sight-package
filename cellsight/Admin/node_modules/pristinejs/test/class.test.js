import Pristine from "../src/pristine";

describe('Classes', function() {

  beforeEach(() => {
    const fixture =
      `<div id="fixture">
        <form id="form" novalidate method="post">
          <div class="form-group" id="form-group1">
             <input id="input" type="text" required class="form-control" />
          </div>
          <div class="form-group"  id="form-group2">
            <textarea id="textarea" required class="form-control" ></textarea>
          </div>
     </form>
    </div>`;

    document.body.insertAdjacentHTML('afterbegin', fixture);
  });

  afterEach(() => {
      //document.body.removeChild(document.getElementById('fixture'));
  });

  it(`should have proper classes in elements`, () => {

      let form = document.getElementById("form")
      let input = document.getElementById('input')
      let pristine = new Pristine(form, {
        classTo: 'form-group',
        errorClass: 'has-danger',
        successClass: 'has-success',
        errorTextParent: 'form-group',
        errorTextTag: 'div',
        errorTextClass: 'text-help'
      });

      let formGroup = document.getElementById("form-group1")

      expect(pristine.validate(input)).toBe(false);
      expect(formGroup.classList.contains('has-danger')).toBe(true);
      expect(formGroup.classList.contains('has-success')).toBe(false);
      expect(pristine.getErrors(input).length).toBe(1);
      expect(pristine.getErrors(input)[0]).toBe("This field is required");

      pristine.reset();

      input.value = "some value";
      expect(pristine.validate(input)).toBe(true);
      expect(formGroup.classList.contains('has-danger')).toBe(false);
      expect(formGroup.classList.contains('has-success')).toBe(true);

  });

  it(`should have proper classes in elements with root specified`, () => {

      let form = document.getElementById("form")
      let input = document.getElementById('input')
      let pristine = new Pristine(form, {
        rootClass: 'form-group',
        classTo: 'form-group',
        errorClass: 'is-invalid',
        successClass: 'is-valid',
        errorTextParent: 'form-group',
        errorTextTag: 'div',
        errorTextClass: 'text-help'
      });

      let formGroup = document.getElementById("form-group1")
      input.value = "some value";
      // expect(pristine.validate(input)).toBe(true);
      // expect(input.classList.contains('is-invalid')).toBe(false);
      // expect(input.classList.contains('is-valid')).toBe(true);

      // pristine.reset();
      // input.value = '';
      // expect(pristine.validate(input)).toBe(false);
      // expect(input.classList.contains('is-invalid')).toBe(true);
      // expect(input.classList.contains('is-valid')).toBe(false);
      // expect(pristine.getErrors(input).length).toBe(1);
      // expect(pristine.getErrors(input)[0]).toBe("This field is required");

  });

});


