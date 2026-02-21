import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[appEmailSanitize]',
})
export class EmailSanitizeDirective {
  constructor(private readonly ngControl: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;

    const raw = input.value ?? '';
    const next = raw
  .trim()
  .replace(/\s+/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9.!#$%&'*+/=?^_`{|}~\-@]/g, '');

    if (next === raw) return;

    // обновим отображаемое значение (чтобы курсор/ввод был предсказуем)
    input.value = next;

    // если есть formControl — обновим его без повторного эмита
    const ctrl = this.ngControl.control;
    if (ctrl)
         ctrl.setValue(next, { emitEvent: false });
  }
}