import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AuthModule, authRoutes, AuthGuard } from '@demo-app/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@demo-app/layout';
import { ProductsModule } from '@demo-app/products';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

const storeDevModule = !environment.production? StoreDevtoolsModule.instrument(): [];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        { path: '', pathMatch: 'full', redirectTo: 'products' },
        { path: 'auth', children: authRoutes },
        {
          path: 'products',
          loadChildren: '@demo-app/products#ProductsModule',
          canActivate: [AuthGuard],
        },
      ],
      { initialNavigation: 'enabled' }
    ),
    AuthModule,
    LayoutModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    storeDevModule,
    //StoreRouterConnectingModule  
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
