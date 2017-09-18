import { Component, EventEmitter } from '@angular/core';

import { Wedding } from '../../models/wedding';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {

    private menuItems: MenuItem[];
    private wedding: Wedding;

    private sidenavActions: EventEmitter<any>;
    private sidenavParams: any[];

    constructor() {
        this.menuItems = [
            { name: "Nuestra historia", route: "nuestra-historia" },
            { name: "Donde y cuando", route: "donde-y-cuando" },
            { name: "Confirmar", route: "confirmar" }
        ];

        this.sidenavActions = new EventEmitter<any>();
        this.sidenavParams = [];
    }
}

export interface MenuItem {

    name: string;
    route: string;
}
