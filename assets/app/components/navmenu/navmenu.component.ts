import { Component, EventEmitter, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { Wedding } from '../../models/wedding';
import { GuestService } from '../../services/guest.service';

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

    constructor(private http: Http, private guestService: GuestService) {
        this.sidenavActions = new EventEmitter<any>();
        this.sidenavParams = [];
    }

    close(){
      this.sidenavActions.emit({action:'sideNav', params:['hide']});
    }

    updateMenuItems(){
      this.menuItems = [
          { name: "Nuestra historia", route: "/nuestra-historia" },
          { name: "Donde y cuando", route: "/donde-y-cuando" }
          //{ name: "RSVP", route: "/confirmar" },
      ];

      if(this.guestService.hasGuest()){
        this.menuItems.push({ name: "RSVP", route: "/confirmar" });
      }
    }

    ngOnInit() {

      this.updateMenuItems();

      this.guestService.guestUpdated.subscribe( (guest:any) => {
        this.updateMenuItems();
      })

      this.http.get('wedding')
        .subscribe(result => {
          //For now just take the first
          this.wedding = result.json()[0];
        });
    }
}

export interface MenuItem {

    name: string;
    route: string;
}
