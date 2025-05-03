
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDisallowSymbols]'
})
export class DisallowSymbolsDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    const initialValue = inputElement.value;

    // Разрешить только числа и двоеточие (удалить все остальные символы)
    const sanitizedValue = initialValue.replace(/[^0-9:]/g, '');

    // Обновить значение элемента input с учетом очищенного значения
    inputElement.value = sanitizedValue;
  }
}

