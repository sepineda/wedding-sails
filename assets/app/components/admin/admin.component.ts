import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { MaterializeDirective } from "angular2-materialize";
import { Subscription } from 'rxjs/Subscription';

import { Wedding } from '../../models/wedding';
import { User } from '../../models/user';
import { Category } from '../../models/category';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  private wedding: Wedding;
  private user: User;
  private paramsSub: Subscription;
  private category: string = 'Invitados';
  private categories: Category[] = [];

  constructor(private http: Http) {
    this.categories.push({ name: 'Nueva Seccion', route: '/admin/nueva-seccion', icon: 'add' });
    this.categories.push({ name: 'Nuevo Invitado', route: '/admin/invitar', icon: 'person_add' });
    this.categories.push({ name: 'Invitados', route: '/admin//lista', icon: 'list' });
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    this.http.get('Wedding')
      .subscribe(result => {
        //For now just pick the first
        this.wedding = result.json()[0];

      });
  }

  changeCategory(cat: Category){
    
    this.category = cat.name;
  }
}
