import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { Section } from '../../models/section';
import { Wedding } from '../../models/wedding';

@Component({
  selector: 'when-where',
  templateUrl: './when-where.component.html',
  styleUrls: ['./when-where.component.css'],
})
export class WhenWhereComponent implements OnInit {
  sections: Section[];
  private wedding: Wedding;

  constructor(private http: Http) { }

  ngOnInit() {
    this.http.get('wedding')
      .subscribe(result => {
        //For now just take the first
        this.wedding = result.json()[0];

        this.http.get('Section/confirm')
          .subscribe(result => {
            this.sections = result.json();
          });
      });
  }

}
