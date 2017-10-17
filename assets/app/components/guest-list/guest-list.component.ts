import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { GuestStates, Guest } from '../../models/guest';
import { Status } from '../../models/status';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.css']
})
export class GuestListComponent implements OnInit {
  guests: Guest[];
  private guestList: Guest[];
  searchValue: string;

  constructor(private http: Http) {

  }

  ngOnInit() {
    this.http.get('Guest')
      .subscribe(result => {
        this.guests = result.json();
        this.guestList = this.guests;
      });
  }

  search(event: string) {
    this.guestList = this.guests.filter(g => g.first_name.toLowerCase().includes(event.toLowerCase())
      || g.last_name && g.last_name.toLowerCase().includes(event.toLowerCase()));
  }

  getGuestSpaces() {
    return this.guests.map(guest => guest.spaces).reduce((total, num) => {
      return total + num;
    });
  }

  getGuestStatus(guest: Guest) {
    let status: Status = { icon: '', message: '', color: 'material-icons' };

    switch (guest.status) {
      case undefined:
        status = { icon: 'watch_later', color: 'material-icons lime-text' };
        break;

      case GuestStates.Seen:
        status = { icon: 'remove_red_eye', color: 'material-icons lime-text' };
        break;

      case GuestStates.Confirmed:
        status = { icon: 'thumb_up', color: 'material-icons green-text' };
        break;

      case GuestStates.Denied:
        status = { icon: 'cancel', color: 'material-icons red-text' };
        break;
    }

    return status;
  }
}
