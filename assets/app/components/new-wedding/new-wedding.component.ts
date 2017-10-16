import { Component, OnInit, EventEmitter } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MaterializeAction } from "angular2-materialize";

import { Status } from '../../models/status';
import { Wedding } from '../../models/wedding';
import { User } from '../../models/user';

declare var Materialize: any;

@Component({
  selector: 'wedding-new-wedding',
  templateUrl: './new-wedding.component.html',
  styleUrls: ['./new-wedding.component.css']
})
export class NewWeddingComponent implements OnInit {
  editMode: boolean;
  form: FormGroup;
  wedding: Wedding;
  user: User;
  dateParams: any[];
  timeParams: any[];

  globalActions = new EventEmitter<string | MaterializeAction>();

  constructor(private http: Http, private fb: FormBuilder) {
    this.dateParams = [{
      today: 'Hoy',
      format: 'yyyy/mm/dd',
      clear: 'Limpiar',
      monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
      weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
      closeOnSelect: true
    }];

    this.timeParams = [{
      twelvehour: 'false'
    }];
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      place: ['', Validators.required],
      fiance: ['', Validators.required],
      bridegroom: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      maxGuestNumber: [1, Validators.min(1)]
    });

    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.editMode = !!this.user._wedding;

    if (this.editMode) {
      this.http.get('Wedding/' + this.user._wedding)
        .subscribe(result => {
          this.wedding = result.json();

          this.form.setValue({
            name: this.wedding.name,
            place: this.wedding.place,
            fiance: this.wedding.fiance,
            bridegroom: this.wedding.bridegroom,
            date: new Date(this.wedding.date).toDateString(),
            time: this.wedding.time,
            maxGuestNumber: this.wedding.maxGuestNumber
          });
          Materialize.updateTextFields();
        });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const formModel = this.form.value;

      let wedding = {
        name: formModel.name as string,
        place: formModel.place as string,
        fiance: formModel.fiance as string,
        bridegroom: formModel.bridegroom as string,
        date: formModel.date as string,
        time: formModel.time as string,
        maxGuestNumber: formModel.maxGuestNumber as string
      };

      if (this.editMode) {

        let bodyString = JSON.stringify(wedding); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });

        this.http.put('wedding/' + this.wedding.id, bodyString, options)
          .map((res: Response) => res.json())
          .subscribe(data => {
            this.globalActions.emit({ action: 'toast', params: ['Actualizado correctamente', 3000, 'green'] });
          }, error => {
            this.globalActions.emit({ action: 'toast', params: [error, 3000, 'red'] });
          });
      } else {
        this.http.post('Wedding', wedding)
          .subscribe(result => {
            let newWedding: Wedding = result.json();

            this.user._wedding = newWedding.id;

            //Update user relation with the new Wedding
            let bodyString = JSON.stringify(this.user); // Stringify payload
            let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
            let options = new RequestOptions({ headers: headers });
            this.http.put('user/' + this.user.id, bodyString, options)
              .map((res: Response) => res.json())
              .subscribe(data => {
                console.log('Nueva boda agrega a usuario ' + this.user.first_name);
              }, error => {
                this.globalActions.emit({ action: 'toast', params: [error, 3000, 'red'] });
              });
            this.globalActions.emit({ action: 'toast', params: ['Nueva boda creada exitosamente', 3000, 'green'] });
          });
      }
    }
  }
}
