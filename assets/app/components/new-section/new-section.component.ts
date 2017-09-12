import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { Status } from '../../models/status';
import { Wedding } from '../../models/wedding';
import { User } from '../../models/user';
import { Section } from '../../models/section';

declare var Materialize:any;

@Component({
  selector: 'wedding-new-section',
  templateUrl: './new-section.component.html',
  styleUrls: ['./new-section.component.css']
})
export class NewSectionComponent implements OnInit {
  editMode: boolean;
  form: FormGroup;
  status: Status;
  wedding: Wedding;
  user: User;

  constructor(private http: Http, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      content: ['', Validators.required]
    });

    this.status = { color: 'white-text', message: '' }

    this.user = JSON.parse(localStorage.getItem('currentUser'));
    //this.editMode = !!this.user._wedding;
    Materialize.updateTextFields();

    //Get current wedding
    this.http.get('wedding/' + this.user._wedding)
      .subscribe(result => {
        this.wedding = result.json();
      });
  }

  onSubmit(){
    if (this.form.valid) {
      const formModel = this.form.value;

      let section: Section = {
        name: formModel.name as string,
        content: formModel.content as string,
        _wedding: this.wedding.id
      }

      this.http.post('Section', section)
        .subscribe(result => {
          let newSection = result.json();
          console.log(newSection);
        });
    }
  }

}
