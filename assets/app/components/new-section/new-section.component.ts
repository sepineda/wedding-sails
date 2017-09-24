import { Component, OnInit, ElementRef, EventEmitter } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

import { Status } from '../../models/status';
import { Wedding } from '../../models/wedding';
import { User } from '../../models/user';
import { Section, SectionCategories } from '../../models/section';
import { Option } from '../../models/option';

declare var Materialize: any;

@Component({
  selector: 'wedding-new-section',
  templateUrl: './new-section.component.html',
  styleUrls: ['./new-section.component.css']
})
export class NewSectionComponent implements OnInit {
  editMode: boolean;
  form: FormGroup;
  wedding: Wedding;
  user: User;
  paramsSub: Subscription;
  section: Section;
  filePath: string;

  categories: Option[] = [];

  globalActions = new EventEmitter<string | MaterializeAction>();

  constructor(private http: Http,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private el: ElementRef,
    private router: Router) {
    this.categories.push({ value: SectionCategories.Historia, content: 'Historia' });
    this.categories.push({ value: SectionCategories.LugarFecha, content: 'Lugar y Fecha' });
    this.categories.push({ value: SectionCategories.Confirmar, content: 'Confirmar' });
  }

  ngOnInit() {

    this.form = this.fb.group({
      name: ['', Validators.required],
      header: [''],
      content: [''],
      category: [0, Validators.required],
      index: [0]
    });

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

          this.http.get('section/' + section_id)
          .map( result => result.json() )
            .subscribe( result => {
              this.section = result;

              this.fillFormWithSection();
              Materialize.updateTextFields();
            })
        }
      });
  }

  fillFormWithSection() {
    this.form.setValue({
      name: this.section.name,
      header: this.section.header,
      content: this.section.content,
      category: this.section.category,
      index: this.section.index
    });
  }

  fileChange(event: any) {
    this.filePath = event.target.value;
  }

  deleteSection() {
    if (this.section) {
      let delSection: Section = {
        name: this.section.name,
        header: this.section.header,
        content: this.section.content,
        category: this.section.category,
        index: this.section.index,
        isActive: false,
        _wedding: this.wedding.id
      };

      let bodyString = JSON.stringify(delSection); // Stringify payload
      let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options = new RequestOptions({ headers: headers });
      this.http.put('Section/' + this.section.id, bodyString, options)
        .map((res: Response) => res.json())
        .subscribe(result => {

          this.globalActions.emit({ action: 'toast', params: ['Seccion eliminada.', 3000, 'green'] });

          this.router.navigate(['/admin/secciones']);

        }, error => {
          this.globalActions.emit({ action: 'toast', params: [error, 3000, 'red'] });
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
        (error) => {
          console.log(error);
          //this.globalActions.emit({ action: 'toast', params: [error, 3000, 'red'] });
        });
    }
  }

  resetForm() {
    this.form.reset();
    this.editMode = false;
  }

  diplayToast(message: string, color: string) {
    this.globalActions.emit({ action: 'toast', params: [message, 3000, color] });
  }

  onSubmit() {
    if (this.form.valid) {
      const formModel = this.form.value;

      let section: Section = {
        name: formModel.name as string,
        header: formModel.header as string,
        content: formModel.content as string,
        category: formModel.category as number,
        index: formModel.index as number,
        isActive: true,
        _wedding: this.wedding.id
      }

      if (this.editMode) {
        let bodyString = JSON.stringify(section); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        this.http.put('section/' + this.section.id, bodyString, options)
          .map((res: Response) => res.json())
          .subscribe(data => {

            this.uploadImage(this.section);
            this.diplayToast('Actualizado correctamente', 'green');

          }, error => {
            this.globalActions.emit({ action: 'toast', params: [error, 3000, 'red'] });
          });
      } else {
        this.http.post('Section', section)
          .map((res: Response) => res.json())
          .subscribe(result => {
            let newSection = result;
            this.uploadImage(newSection);
            this.resetForm();
            this.diplayToast('Nueva seccion agregada', 'green');
          },
          error => {
            this.globalActions.emit({ action: 'toast', params: [error, 3000, 'red'] });
          });
      }
    } else {
      this.globalActions.emit({ action: 'toast', params: ['Por favor complete los campos requeridos', 3000, 'red'] });
    }
  }

}
