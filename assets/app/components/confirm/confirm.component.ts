import { Component, OnInit } from '@angular/core';

import { GuestService } from '../../services/guest.service';
import { Guest } from '../../models/guest';

@Component({
  selector: 'confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  guest: Guest;

  constructor(private guestService: GuestService) { }

  ngOnInit() {

    if(this.guestService.hasGuest()){
      this.guest = this.guestService.getGuest();
    }

    this.guestService.guestUpdated.subscribe((guest: Guest) => {
      this.guest = guest;
    });
  }
}
