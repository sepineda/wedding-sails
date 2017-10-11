import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Guest } from '../models/guest';

@Injectable()
export class GuestService {
  guestUpdated:EventEmitter<Guest> = new EventEmitter();
  private guest: Guest;

  hasGuest(){
    return !!this.guest;
  }

  setGuest(guest:Guest){
    this.guest = guest;
    this.guestUpdated.emit(this.guest);
  }

  getGuest(guest:Guest){
    return this.guest;
  }

}
