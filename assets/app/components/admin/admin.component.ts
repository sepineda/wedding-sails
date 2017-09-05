import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { Wedding } from '../../models/wedding';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  private wedding: Wedding;

  constructor(private http: Http) { }

  ngOnInit() {
    this.http.get( 'Wedding' )
      .subscribe(result => {
        //For now just pick the first
        this.wedding = result.json()[0];

      });
  }

}
