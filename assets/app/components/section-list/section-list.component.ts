import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { Section } from '../../models/section';

@Component({
  selector: 'wedding-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent implements OnInit {
  private sections: Section[];

  constructor(private http: Http) { }

  ngOnInit() {

    this.http.get('Section')
      .subscribe(result => {
        this.sections = result.json();
        this.sections = this.sections.filter(s => s.active);
      });
  }

}
