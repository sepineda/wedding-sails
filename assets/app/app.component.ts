import {Component} from '@angular/core';
@Component({
  selector: 'my-app',
  template: `
    <div >
        <div class='row'>

            <router-outlet></router-outlet>
        </div>
    </div>
    `
})
export class AppComponent { }
