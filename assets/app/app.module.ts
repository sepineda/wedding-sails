import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent }   from './app.component';
import { HomeComponent } from './components/home/home.component';

//import 'materialize-css';
import { MaterializeModule } from "angular2-materialize";

@NgModule({
    declarations: [
      AppComponent,
      HomeComponent
    ],
    imports:      [
      BrowserModule,
      MaterializeModule,
      RouterModule.forRoot([
            { path: '', redirectTo: 'nuestra-historia', pathMatch: 'full' },
            { path: 'nuestra-historia', component: HomeComponent }
          ])
    ],
    bootstrap:    [AppComponent],
})
export class AppModule {}
