import { Component, EventEmitter, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { Wedding } from '../../models/wedding';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent implements OnInit {

    private menuItems: MenuItem[];
    private wedding: Wedding;

    private sidenavActions: EventEmitter<any>;
    private sidenavParams: any[];

    constructor(private http: Http) {
        this.menuItems = [
            { name: "Nuestra historia", route: "/nuestra-historia" },
            { name: "Donde y cuando", route: "/donde-y-cuando" },
            { name: "RSVP", route: "/confirmar" }
        ];

        this.sidenavActions = new EventEmitter<any>();
        this.sidenavParams = [];
    }

    ngOnInit() {

      this.http.get('wedding')
        .subscribe(result => {
          console.log(result.json())
          //For now just take the first
          this.wedding = result.json()[0];
        });
    }
}

export interface MenuItem {

    name: string;
    route: string;
}
