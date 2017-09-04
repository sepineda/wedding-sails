"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var home_component_1 = require("./home/home.component");
var navmenu_component_1 = require("./navmenu/navmenu.component");
var angular2_materialize_1 = require("angular2-materialize");
var story_card_component_1 = require("./story-card/story-card.component");
var confirm_component_1 = require("./confirm/confirm.component");
var admin_component_1 = require("./admin/admin.component");
var when_where_component_1 = require("./when-where/when-where.component");
var landing_component_1 = require("./landing/landing.component");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                navmenu_component_1.NavMenuComponent,
                story_card_component_1.StoryCardComponent,
                confirm_component_1.ConfirmComponent,
                admin_component_1.AdminComponent,
                when_where_component_1.WhenWhereComponent,
                landing_component_1.LandingComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                angular2_materialize_1.MaterializeModule,
                router_1.RouterModule.forRoot([
                    { path: '', component: landing_component_1.LandingComponent, children: [
                            { path: '', redirectTo: 'nuestra-historia', pathMatch: 'full' },
                            { path: 'nuestra-historia', component: home_component_1.HomeComponent },
                            { path: 'donde-y-cuando', component: when_where_component_1.WhenWhereComponent },
                            { path: 'confirmar', component: confirm_component_1.ConfirmComponent },
                        ] },
                    { path: 'boda', component: admin_component_1.AdminComponent },
                ])
            ],
            bootstrap: [app_component_1.AppComponent],
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map