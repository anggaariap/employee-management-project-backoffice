import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'rupiah', standalone: true })
export class RupiahPipe implements PipeTransform {
  transform(value: number | string | null | undefined): string {
    if (value === null || value === undefined || value === '') return 'Rp. 0,00';
    const num = typeof value === 'number' ? value : parseFloat(value);
    if (isNaN(num)) return 'Rp. 0,00';
    const formatted = new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
    return `Rp. ${formatted}`;
  }
}
