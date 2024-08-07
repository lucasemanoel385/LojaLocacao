
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { window } from 'rxjs';

var global = window;
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
