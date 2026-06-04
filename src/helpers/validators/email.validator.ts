import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Кастомный валидатор email адреса
 * Более мягкий чем стандартный Angular Validators.email
 * Принимает email с символами в начале (типа www.email@gmail.com)
 */
export function customEmailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Если поле пусто - это OK (для опциональных полей)
    if (!control.value) {
      return null;
    }

    const email = control.value.trim();

    // Проверка 1: Email не должен быть пустым
    if (email.length === 0) {
      return null;
    }

    // Проверка 2: Email должен содержать @ символ
    if (!email.includes('@')) {
      return { invalidEmail: { value: control.value } };
    }

    // Проверка 3: Email не должен начинаться или заканчиваться @
    if (email.startsWith('@') || email.endsWith('@')) {
      return { invalidEmail: { value: control.value } };
    }

    // Проверка 4: Не должно быть двойных @ символов
    if (email.includes('@@')) {
      return { invalidEmail: { value: control.value } };
    }

    // Разделяем на части: [локальная часть] @ [домен]
    const parts = email.split('@');
    if (parts.length !== 2) {
      return { invalidEmail: { value: control.value } };
    }

    const [localPart, domain] = parts;

    // Проверка 5: Локальная часть не должна быть пустой
    if (localPart.length === 0) {
      return { invalidEmail: { value: control.value } };
    }

    // Проверка 6: Домен не должен быть пустым
    if (domain.length === 0) {
      return { invalidEmail: { value: control.value } };
    }

    // Проверка 7: Домен должен содержать точку (для расширения типа .com, .ru и т.д.)
    if (!domain.includes('.')) {
      return { invalidEmail: { value: control.value } };
    }

    // Проверка 8: Домен не должен начинаться или заканчиваться точкой
    if (domain.startsWith('.') || domain.endsWith('.')) {
      return { invalidEmail: { value: control.value } };
    }

    // Проверка 9: Не должно быть двойных точек
    if (domain.includes('..')) {
      return { invalidEmail: { value: control.value } };
    }

    // Проверка 10: Расширение домена должно быть минимум 2 символа (типа .com, .ru, .io)
    const parts2 = domain.split('.');
    const extension = parts2[parts2.length - 1];
    if (extension.length < 2) {
      return { invalidEmail: { value: control.value } };
    }

    // Проверка 11: Локальная часть не должна содержать пробелы
    if (localPart.includes(' ')) {
      return { invalidEmail: { value: control.value } };
    }

    // Проверка 12: Домен не должен содержать пробелы
    if (domain.includes(' ')) {
      return { invalidEmail: { value: control.value } };
    }

    // Все проверки пройдены
    return null;
  };
}
