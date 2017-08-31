import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent }   from './app.component';
import { HomeComponent } from './components/home/home.component';''

@NgModule({
    declarations: [
      AppComponent,
      HomeComponent
    ],
    imports:      [
      BrowserModule,
      RouterModule.forRoot([
            { path: '', redirectTo: 'nuestra-historia', pathMatch: 'full' },
            { path: 'nuestra-historia', component: HomeComponent }
          ])
    ],
    bootstrap:    [AppComponent],
})
export class AppModule {}
