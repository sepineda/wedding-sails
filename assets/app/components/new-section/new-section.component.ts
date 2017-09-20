import { Component, OnInit, ElementRef } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import { Status } from '../../models/status';
import { Wedding } from '../../models/wedding';
import { User } from '../../models/user';
import { Section } from '../../models/section';

declare var Materialize: any;
const URL = "http://localhost:1337/section/uploadImage";

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
  filePath: string;

  categories: string[] = [];

  constructor(private http: Http,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private el: ElementRef,
    private router: Router) {
      this.categories.push('Historia');
      this.categories.push('Lugar');
      this.categories.push('Confirmar');
    }

  ngOnInit() {

    this.form = this.fb.group({
      name: ['', Validators.required],
      content: ['', Validators.required],
      category: ['', Validators.required]
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
    console.log(this.form.controls['image'])
    this.form.setValue({
      name: this.section.name,
      content: this.section.content,
      category: this.section.category
    });
  }

  fileChange(event: any) {
    this.filePath = event.target.value;
  }

  deleteSection() {
    if (this.section) {


      let delSection: Section = {
        name: this.section.name,
        content: this.section.content,
        category: this.section.category,
        active: false,
        _wedding: this.wedding.id
      };

      let bodyString = JSON.stringify(delSection); // Stringify payload
      let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options = new RequestOptions({ headers: headers });
      this.http.put('section/' + this.section.id, bodyString, options)
        .map((res: Response) => res.json())
        .subscribe(result => {
          this.router.navigate(['/admin/secciones']);
        }, error => {
          console.log(error);
        })
    }
  }

  uploadImage(newSection: Section) {
    //locate the file element meant for the file upload.
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#image');
    //get the total amount of files attached to the file input.
    let fileCount: number = inputEl.files.length;
    //create a new fromdata instance
    let formData = new FormData();
    //check if the filecount is greater than zero, to be sure a file was selected.
    if (fileCount > 0) { // a file was selected
      //append the key name 'photo' with the first file in the element
      formData.append('image', inputEl.files.item(0));
      //call the angular http method
      this.http
        //post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
        .post('section/uploadImage/' + newSection.id, formData).map((res: Response) => res.json()).subscribe(
        //map the success function and alert the response
        (success) => {
          console.log(success._body);
        },
        (error) => console.log(error))
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const formModel = this.form.value;

      let section: Section = {
        name: formModel.name as string,
        content: formModel.content as string,
        category: formModel.category as string,
        active: true,
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
            this.status.message = 'Actualizado correctamente';

            this.uploadImage(this.section);

          }, error => {
            this.status.color = 'red-text';
            this.status.message = error;
          });
      } else {
        this.http.post('Section', section)
          .subscribe(result => {
            this.status.color = 'green-text';
            this.status.message = 'Nueva seccion agregada exitosamente';
            let newSection = result.json();

            this.uploadImage(newSection);
          });
      }
    } else {
      this.status.color = 'red-text';
      this.status.message = 'Por favor complete los campos requeridos';
    }
  }

}
