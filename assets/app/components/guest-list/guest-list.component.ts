import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { Guest } from '../../models/guest';

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

  search(event:string){
    this.guestList = this.guests.filter(g => g.first_name.toLowerCase().includes(event.toLowerCase())
                                          || g.last_name && g.last_name.toLowerCase().includes(event.toLowerCase()) );
  }

  getGuestSpaces() {
    return this.guests.map(guest => guest.spaces).reduce((total, num) => {
      return total + num;
    });
  }
}
