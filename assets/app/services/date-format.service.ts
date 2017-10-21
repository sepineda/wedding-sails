import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DateFormatService {

  format(dateString: string) {
    let mes: string = '';
    let dia: string = '';

    const date = new Date(dateString);

    switch (date.getMonth()) {
      case 0:
        mes = 'Enero';
        break;
      case 1:
        mes = 'Febrero';
        break;
      case 2:
        mes = 'Marzo';
        break;
      case 3:
        mes = 'Abril';
        break;
      case 4:
        mes = 'Mayo';
        break;
      case 5:
        mes = 'Junio';
        break;
      case 6:
        mes = 'Julio';
        break;
      case 7:
        mes = 'Agosto';
        break;
      case 8:
        mes = 'Semptiembre';
        break;
      case 9:
        mes = 'Octubre';
        break;
      case 10:
        mes = 'Noviembre';
        break;
      case 11:
        mes = 'Diciembre';
        break;
    }

    switch (date.getDay()) {
      case 0:
        dia = "Domingo";
        break;
      case 1:
        dia = "Lunes";
        break;
      case 2:
        dia = "Martes";
        break;
      case 3:
        dia = "Miércoles";
        break;
      case 4:
        dia = "Jueves";
        break;
      case 5:
        dia = "Viernes";
        break;
      case 6:
        dia = "Sábado";
        break;
    }

    return `${dia} ${date.getDate()} de ${mes} de ${date.getFullYear()}`;
  }
}
