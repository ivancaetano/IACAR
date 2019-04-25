import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'reais' })
export class ReaisPipe implements PipeTransform {

  constructor() {
  }

  transform(content) {

    return "R$ " + (content / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 1, minimumFractionDigits: 1 }) + " mil";
  }

}
