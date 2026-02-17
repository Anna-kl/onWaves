import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'nl2br' })
export class Nl2BrPipe implements PipeTransform {
  transform(v: string | null | undefined): string {
    return (v ?? '').replace(/\n/g, '<br>');
  }
}