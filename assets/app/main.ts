/*Uncomment to use Ahead of time compilation*/
// import { platformBrowser } from '@angular/platform-browser';
// import { AppModuleNgFactory } from './aot/assets/app/app.module.ngfactory';
//
// platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { AppModule } from './app.module';

if (process.env.ENV === 'production') {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
