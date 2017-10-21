import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { MaterializeAction } from "angular2-materialize"

import { Wedding } from '../../models/wedding';
import { User } from '../../models/user';
import { Photo } from '../../models/photo';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'wedding-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  @ViewChild('carousel') carouselElement:any;
  wedding: Wedding;
  user: User;
  photos: Photo[];
  actions = new EventEmitter<string>();

  showInitialized = false;

  constructor(private http: Http) {
    // window.setTimeout(() => {
    //   this.carouselElement.nativeElement.classList.toggle("initialized")
    //   this.actions.emit("carousel");
    // }, 1000);
  }

  ngOnInit() {
    this.http.get('wedding')
      .subscribe(result => {
        //For now just take the first
        this.wedding = result.json()[0];
      });

    this.fetchPhotos();
  }

  fetchPhotos() {
    this.http.get('photo')
      .map((res: Response) => res.json())
      .subscribe((result: Photo[]) => {
        this.photos = result;
      });
  }

}
