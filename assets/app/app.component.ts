import {Component} from '@angular/core';
@Component({
  selector: 'my-app',
  template: `
    <div >
        <div class='row'>
            <nav-menu></nav-menu>
            <router-outlet></router-outlet>
        </div>
    </div>
    `
})
export class AppComponent { }
