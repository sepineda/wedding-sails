import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { MaterializeAction } from "angular2-materialize";

import { Guest } from '../../models/guest';
import { Status } from '../../models/status';
import { Wedding } from '../../models/wedding';

declare var Materialize:any;

@Component({
  selector: 'app-new-guest',
  templateUrl: './new-guest.component.html',
  styleUrls: ['./new-guest.component.css']
})
export class NewGuestComponent implements OnInit, OnDestroy {
  form: FormGroup;
  editMode: boolean;
  paramsSub: Subscription;
  guest: Guest;
  wedding: Wedding;

  globalActions = new EventEmitter<string | MaterializeAction>();

  constructor(private http: Http, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: [''],
      email: [''],
      spaces: [1, [Validators.required, Validators.min(1)]],
      phone: ''
    });

    this.http.get('Wedding')
      .subscribe(result => {
        //For now just pick the first
        this.wedding = result.json()[0];

      });

    this.editMode = false;


    this.paramsSub = this.route.params
      .map(params => params['guest_id'])
      .subscribe(guest_id => {
        if (guest_id) {
          this.editMode = true;

          this.http.get('Guest/' + guest_id)
            .subscribe(result => {
              this.guest = result.json();

              this.fillFormWithGuest();
              Materialize.updateTextFields();
            })
        }
      });
  }

  fillFormWithGuest() {

    this.form.setValue({
      first_name: this.guest.first_name,
      last_name: this.guest.last_name,
      email: this.guest.email,
      phone: this.guest.phone,
      spaces: this.guest.spaces
    });

  }

  resetForm(){
    this.form.reset();
    this.form.setValue({
      spaces: 1
    });
  }

  onSubmit() {

    if (this.form.valid) {
      const formModel = this.form.value;

      let newGuest: Guest = {
        first_name: formModel.first_name as string,
        last_name: formModel.last_name as string,
        phone: formModel.phone as string,
        email: formModel.email as string,
        spaces: formModel.spaces as number,
        active: true,
        _wedding: this.wedding.id
      }

      if (this.editMode) {
        let bodyString = JSON.stringify(newGuest); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });

        this.http.put('guest/' + this.guest.id, bodyString, options)
            .map( (res:Response) => res.json() )
            .subscribe( data => {
              this.globalActions.emit({ action: 'toast', params: ['Actualizado correctamente', 3000, 'green'] });
            },error => {
                this.globalActions.emit({ action: 'toast', params: [error, 3000, 'red'] });
            } );
      } else {
        this.http.post('Guest', newGuest)
          .subscribe(result => {
            this.globalActions.emit({ action: 'toast', params: ['Nuevo invitado agregado exitosamente', 3000, 'green'] });
            this.resetForm();
          });
      }
    } else {
      this.globalActions.emit({ action: 'toast', params: ['Por favor complete los campos requeridos', 3000, 'red'] });
    }
  }

  deleteGuest(){
    this.http.delete(`guest/${this.guest.id}`)
      .map((res:Response) => res.json())
      .subscribe( data => {
        this.globalActions.emit({ action: 'toast', params: [`Invitado "${this.guest.first_name}" fue eliminado`, 3000, 'red'] });
        this.router.navigate(['/admin/lista']);
      })
  }

  isAttributeInvalid(name: string) {

    let model = this.form.get(name);
    return model.invalid && (model.dirty || model.touched);
  }

  isEmailValid() {
    return !!this.form.get('email').errors.email;
  }

  isRequiredValid(name: string) {
    return !!this.form.get(name).errors.required;
  }

  isMinimumSpaceValid() {
    return !!this.form.get('spaces').errors.min;
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }
}
