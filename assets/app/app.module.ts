import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';

import { MaterializeModule } from "angular2-materialize";
import { StoryCardComponent } from './components/story-card/story-card.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { AdminComponent } from './components/admin/admin.component';
import { WhenWhereComponent } from './components/when-where/when-where.component';
import { LandingComponent } from './components/landing/landing.component';
import { NewGuestComponent } from './components/new-guest/new-guest.component';
import { GuestListComponent } from './components/guest-list/guest-list.component';
import { LoginComponent } from './components/login/login.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';

import 'materialize-css';
import { NewSectionComponent } from './components/new-section/new-section.component';
import { NewWeddingComponent } from './components/new-wedding/new-wedding.component';
import { SectionListComponent } from './components/section-list/section-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMenuComponent,
    StoryCardComponent,
    ConfirmComponent,
    AdminComponent,
    WhenWhereComponent,
    LandingComponent,
    NewGuestComponent,
    GuestListComponent,
    LoginComponent,
    NewSectionComponent,
    NewWeddingComponent,
    SectionListComponent
  ],
  providers: [
    AuthGuard,
    AuthService
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      // { path: '', redirectTo: 'boda', pathMatch: 'full' },
      {
        path: '', component: LandingComponent, children: [
          { path: '', redirectTo: 'nuestra-historia', pathMatch: 'full' },
          { path: 'nuestra-historia', component: HomeComponent },
          { path: 'donde-y-cuando', component: WhenWhereComponent },
          { path: 'confirmar', component: ConfirmComponent },
        ]
      },
      {
        path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
          { path: '', redirectTo: 'lista', pathMatch: 'full' },
          { path: 'boda', component: NewWeddingComponent },
          { path: 'nueva-seccion', component: NewSectionComponent },
          { path: 'secciones', component: SectionListComponent },
          { path: 'lista', component: GuestListComponent },
          { path: 'invitar', component: NewGuestComponent },
          { path: 'editar-invitado/:guest_id', component: NewGuestComponent },
          { path: 'editar-seccion/:section_id', component: NewSectionComponent },
        ]
      },
      { path: 'login', component: LoginComponent }
    ], {useHash: true})
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
