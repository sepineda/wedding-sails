import { Component, OnInit, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { MaterializeAction } from "angular2-materialize";

import { GuestService } from '../../services/guest.service';
import { Guest, GuestStates } from '../../models/guest';
import { Wedding } from '../../models/wedding';
import { Section } from '../../models/section';
import { DateFormatService } from '../../services/date-format.service';

@Component({
  selector: 'confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  guest: Guest;
  wedding: Wedding;
  sections: Section[];

  globalActions = new EventEmitter<string | MaterializeAction>();

  constructor(private guestService: GuestService, private http: Http, private dateFormatService: DateFormatService) { }

  ngOnInit() {

    if (this.guestService.hasGuest()) {
      this.guest = this.guestService.getGuest();
    }

    this.http.get('wedding')
      .subscribe(result => {
        //For now just take the first
        this.wedding = result.json()[0];

        this.http.get('Section/confirm')
          .subscribe(result => {
            this.sections = result.json();
          });
      });

    this.guestService.guestUpdated.subscribe((guest: Guest) => {
      this.guest = guest;
    });
  }

  getFullDate() {
    return this.dateFormatService.format(this.wedding.date);
  }

  getStateText() {
    let text = '';
    if (this.guest.status) {
      switch (this.guest.status) {
        case GuestStates.Confirmed:
          text = 'Confirmado';
          break;
        case GuestStates.Denied:
          text = 'No puedo asistir';
          break;
      }
    }
    return text;
  }

  hasConfirmed() {
    return this.guest.status === GuestStates.Confirmed || this.guest.status === GuestStates.Denied;
  }

  getAknowledgement() {
    let message = '';

    switch (this.guest.status) {
      case GuestStates.Confirmed:
        message = 'Gracias por acompanarnos en esta celebracion';
        break;
      case GuestStates.Denied:
        message = 'Saludos, igual no queriamos que vinieras...';
        break;
    }

    return message;
  }

  confirm() {
    this.processConfirmation(true);
  }

  deny() {
    this.processConfirmation(false);
  }

  processConfirmation(confirmation: boolean) {
    const guestUpdated = { ...this.guest, _wedding: this.wedding.id };
    console.log(guestUpdated)

    const headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    const options = new RequestOptions({ headers: headers });

    this.guest.status = confirmation ? GuestStates.Confirmed : GuestStates.Denied;

    this.http.put(`guest/${this.guest.id}`, JSON.stringify(guestUpdated), options)
      .map((res: Response) => res.json())
      .subscribe(data => {
        if (confirmation)
          this.globalActions.emit({ action: 'toast', params: ['Muchas gracias, has confirmado tu invitacion!.', 3000, 'green'] });
        else
          this.globalActions.emit({ action: 'toast', params: ['Lamentamos no contar con tu presencia, pero gracias por hacernos saber.', 3000, 'green'] });
      }, error => {
        this.globalActions.emit({ action: 'toast', params: ['Lo sentimos, hubo un error recibiendo tu confirmacion', 3000, 'red'] });
      });
  }
}
