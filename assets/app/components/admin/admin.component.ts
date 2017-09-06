import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import {MaterializeDirective} from "angular2-materialize";

import { Wedding } from '../../models/wedding';
import { User } from '../../models/user';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  private wedding: Wedding;
  private user: User;

  constructor(private http: Http) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user);

    this.http.get('Wedding')
      .subscribe(result => {
        //For now just pick the first
        this.wedding = result.json()[0];

      });
  }
}
