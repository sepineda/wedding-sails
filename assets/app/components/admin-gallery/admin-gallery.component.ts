import { Component, OnInit, ElementRef, EventEmitter } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { MaterializeAction } from "angular2-materialize";

import { Wedding } from '../../models/wedding';
import { User } from '../../models/user';
import { Photo } from '../../models/photo';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'wedding-admin-gallery',
  templateUrl: './admin-gallery.component.html',
  styleUrls: ['./admin-gallery.component.css']
})
export class AdminGalleryComponent implements OnInit {
  filePath: string;
  wedding: Wedding;
  user: User;
  photos: Photo[];

  globalActions = new EventEmitter<string | MaterializeAction>();

  constructor(private http: Http, private el: ElementRef) { }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.http.get('wedding/' + this.user._wedding)
      .subscribe(result => {
        this.wedding = result.json();
      });

    this.fetchPhotos();
  }

  deletePhoto(photo:Photo){
    this.http.delete(`photo/${photo.id}`)
      .map(res => res.json())
      .subscribe( result => {
        this.fetchPhotos();
      })
  }

  fetchPhotos() {
    this.http.get('photo')
      .map((res: Response) => res.json())
      .subscribe((result: Photo[]) => {
        this.photos = result;
      });
  }

  fileChange(event: any) {
    this.filePath = event.target.value;

    let photo: Photo = {
      _wedding: this.wedding.id
    }

    this.http.post('photo', photo)
      .map((res: Response) => res.json())
      .subscribe(result => {
        this.uploadImage(result);
      });
  }

  uploadImage(newPhoto: Photo) {
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
        .post(`photo/uploadImage/${newPhoto.id}`, formData)
        .subscribe( (result:any) => {
            this.fetchPhotos();
        });
    }
  }

}
