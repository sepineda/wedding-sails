/*Uncomment to use Ahead of time compilation*/
// import { platformBrowser } from '@angular/platform-browser';
// import { AppModuleNgFactory } from './aot/assets/app/app.module.ngfactory';

// platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule }              from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
