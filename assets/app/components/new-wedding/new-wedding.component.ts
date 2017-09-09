import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { Status } from '../../models/status';
import { Wedding } from '../../models/wedding';
import { User } from '../../models/user';

@Component({
  selector: 'wedding-new-wedding',
  templateUrl: './new-wedding.component.html',
  styleUrls: ['./new-wedding.component.css']
})
export class NewWeddingComponent implements OnInit {
  editMode: boolean;
  form: FormGroup;
  status: Status;
  wedding: Wedding;
  user: User;

  constructor(private http: Http, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      place: ['', Validators.required],
      fiance: ['', Validators.required],
      bridegroom: ['', Validators.required],
      date: ['', Validators.required],
      maxGuestNumber: [1, Validators.min(1)]
    });

    this.status = { color: 'white-text', message: '' }

    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.editMode = !!this.user._wedding;

    if (this.editMode) {
      this.http.get('Wedding/' + this.user._wedding)
        .subscribe(result => {
          this.wedding = result.json();
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
        maxGuestNumber: formModel.maxGuestNumber as string,
        users: [{ _wedding: this.user.id}]
      }

      if (this.editMode) {

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
                this.status.color = 'red-text',
                  this.status.message = error;
              });

            this.status.color = 'green-text';
            this.status.message = 'Nueva boda creada exitosamente';
          });
      }
    }
  }
}
