/**
 * WUFPA-069 (foundation) — Form enhancement.
 *
 * The form already works without this file: it is a native <form> with a real
 * action. Everything here is additive.
 *
 * Validation fires on BLUR and SUBMIT, never on keystroke — validating as
 * someone types tells them they are wrong before they have finished being
 * right.
 */

interface FieldState {
  input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
  wrapper: HTMLElement | null;
}

function describe(input: FieldState['input']): string {
  const label = document.querySelector<HTMLLabelElement>(`label[for="${input.id}"]`);
  const name = label?.textContent?.replace(/\(Required\)/i, '').trim() ?? 'This field';

  if (input.validity.valueMissing) return `${name} is required`;
  if (input.validity.typeMismatch && input.type === 'email') {
    return `${name} must be a valid email address, for example name@example.com`;
  }
  if (input.validity.tooShort) return `${name} is too short`;
  return `${name} is not valid`;
}

function setError(state: FieldState, message: string | null): void {
  const { input, wrapper } = state;
  const errorId = `${input.id}-error`;
  let node = document.getElementById(errorId);

  if (message === null) {
    input.removeAttribute('aria-invalid');
    wrapper?.classList.remove('field--error');
    node?.remove();
    return;
  }

  input.setAttribute('aria-invalid', 'true');
  wrapper?.classList.add('field--error');

  if (!node) {
    node = document.createElement('p');
    node.id = errorId;
    node.className = 'field__error';
    input.insertAdjacentElement('afterend', node);
    const described = input.getAttribute('aria-describedby');
    input.setAttribute('aria-describedby', described ? `${described} ${errorId}` : errorId);
  }
  node.textContent = message;
}

function enhance(form: HTMLFormElement): void {
  const fields: FieldState[] = Array.from(
    form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
      'input:not([type="hidden"]):not([tabindex="-1"]), textarea, select',
    ),
  ).map((input) => ({ input, wrapper: input.closest<HTMLElement>('.field') }));

  for (const state of fields) {
    state.input.addEventListener('blur', () => {
      if (state.input.value === '' && !state.input.required) {
        setError(state, null);
        return;
      }
      setError(state, state.input.checkValidity() ? null : describe(state.input));
    });
  }

  form.addEventListener('submit', (event) => {
    const invalid = fields.filter((s) => !s.input.checkValidity());
    if (invalid.length === 0) return;

    event.preventDefault();
    for (const state of invalid) setError(state, describe(state.input));

    // Focus the first invalid control so the user is taken to the problem
    // rather than left to hunt for it.
    invalid[0]?.input.focus();

    const status = form.querySelector<HTMLElement>('[data-form-status]');
    if (status) {
      status.textContent = `There ${invalid.length === 1 ? 'is 1 problem' : `are ${invalid.length} problems`} with this form.`;
    }
  });
}

export function initForms(): void {
  document.querySelectorAll<HTMLFormElement>('form[data-form]').forEach(enhance);
}

/* Fires on the initial load and after every view transition — see the note in
   reveal.ts. No teardown is needed here: every listener is bound to an element
   inside the form itself, and the incoming page brings its own. */
document.addEventListener('astro:page-load', initForms);
