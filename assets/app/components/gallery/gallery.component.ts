import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';

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
  wedding: Wedding;
  user: User;
  photos: Photo[];

  constructor(private http: Http) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.http.get('wedding/' + this.user._wedding)
      .subscribe(result => {
        this.wedding = result.json();
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
