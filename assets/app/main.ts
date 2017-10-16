import { platformBrowser } from '@angular/platform-browser';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModuleNgFactory } from './aot/assets/app/app.module.ngfactory';
// import { AppModule }              from './app.module';

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
// platformBrowserDynamic().bootstrapModule(AppModule);
