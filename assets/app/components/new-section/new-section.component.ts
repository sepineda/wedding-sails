import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import { Status } from '../../models/status';
import { Wedding } from '../../models/wedding';
import { User } from '../../models/user';
import { Section } from '../../models/section';

declare var Materialize: any;

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
  paramsSub: Subscription;
  section: Section;

  constructor(private http: Http, private fb: FormBuilder, private route: ActivatedRoute) { }

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

    this.paramsSub = this.route.params
      .map(params => params['section_id'])
      .subscribe(section_id => {
        if (section_id) {
          this.editMode = true;

          this.http.get('Section/' + section_id)
            .subscribe(result => {
              this.section = result.json();

              this.fillFormWithSection();
              Materialize.updateTextFields();
            })
        }
      });
  }

  fillFormWithSection() {

    this.form.setValue({
      name: this.section.name,
      content: this.section.content
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formModel = this.form.value;

      let section: Section = {
        name: formModel.name as string,
        content: formModel.content as string,
        _wedding: this.wedding.id
      }

      if (this.editMode) {
        let bodyString = JSON.stringify(section); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        this.http.put('section/' + this.section.id, bodyString, options)
          .map((res: Response) => res.json())
          .subscribe(data => {
            this.status.color = 'green-text';
            this.status.message = 'Actualizado correctamente'
          }, error => {
            this.status.color = 'red-text';
            this.status.message = error;
          });
      } else {
        this.http.post('Section', section)
          .subscribe(result => {
            this.status.color = 'green-text';
            this.status.message = 'Nueva seccion agregada exitosamente';
          });
      }
    } else {
      this.status.color = 'red-text';
      this.status.message = 'Por favor complete los campos requeridos';
    }
  }

}
