import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { Guest } from '../../models/guest';

@Component({
  selector: 'app-new-guest',
  templateUrl: './new-guest.component.html',
  styleUrls: ['./new-guest.component.css']
})
export class NewGuestComponent implements OnInit {

  constructor(private http:Http) { }

  ngOnInit() {
  }

}
