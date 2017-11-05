import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Guest } from '../models/guest';

@Injectable()
export class GuestService {
  guestUpdated:EventEmitter<Guest> = new EventEmitter();
  private guest: Guest;

  hasGuest(){
    return !!this.guest || !!sessionStorage.getItem('guest');
  }

  setGuest(guest:Guest){
    this.guest = guest;
    sessionStorage.setItem('guest', JSON.stringify(this.guest));
    this.guestUpdated.emit(this.guest);
  }

  getGuest(){
    const storedGuest = JSON.parse(sessionStorage.getItem('guest'));
    this.guest = storedGuest?storedGuest:this.guest;
    return this.guest;
  }

  setAsSeen(guest:Guest){

  }

  setAsConfirmed(guest: Guest, attending: boolean){

  }

}
