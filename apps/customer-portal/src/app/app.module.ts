import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AuthModule, authRoutes } from '@demo-app/auth';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
    RouterModule.forRoot(
      [{ path: 'auth', children: authRoutes }], { initialNavigation: 'enabled' }
    ), 
    AuthModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
