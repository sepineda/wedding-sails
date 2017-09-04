import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent }   from './app.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './navmenu/navmenu.component';

import { MaterializeModule } from "angular2-materialize";
import { StoryCardComponent } from './story-card/story-card.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { AdminComponent } from './admin/admin.component';
import { WhenWhereComponent } from './when-where/when-where.component';
import { LandingComponent } from './landing/landing.component';

@NgModule({
    declarations: [
      AppComponent,
      HomeComponent,
      NavMenuComponent,
      StoryCardComponent,
      ConfirmComponent,
      AdminComponent,
      WhenWhereComponent,
      LandingComponent
    ],
    imports:      [
      BrowserModule,
      MaterializeModule,
      RouterModule.forRoot([
            { path: '', component: LandingComponent, children: [
              { path: '', redirectTo: 'nuestra-historia', pathMatch: 'full' },
              { path: 'nuestra-historia', component: HomeComponent },
              { path: 'donde-y-cuando', component: WhenWhereComponent },
              { path: 'confirmar', component: ConfirmComponent },
            ]},
            { path: 'boda', component: AdminComponent },
            // { path: '**', redirectTo: 'home' }
          ])
    ],
    bootstrap:    [AppComponent],
})
export class AppModule {}
