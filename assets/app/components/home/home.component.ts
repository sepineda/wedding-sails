import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { Section } from '../../models/section';
import { Wedding } from '../../models/wedding';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  private sections: Section[];
  private wedding: Wedding;

  constructor(private http: Http) { }

  ngOnInit() {

    this.http.get('wedding')
      .subscribe(result => {
        //For now just take the first
        this.wedding = result.json()[0];

        this.http.get('Section')
          .subscribe(result => {
            this.sections = result.json();
            this.sections = this.sections.filter(s => s.active);
          });
      });


  }
}
