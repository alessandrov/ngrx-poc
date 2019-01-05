import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { reducers, metaReducers } from './reducers';
import { routes } from './routes';
import { AppComponent } from './core/containers/app';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { CustomRouterStateSerializer } from './shared/utils';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { useHash: true }),

    StoreModule.forRoot(reducers, { metaReducers }),

    StoreRouterConnectingModule,

    !environment.production
      ? StoreDevtoolsModule.instrument({})
      : [],

    EffectsModule.forRoot([]),

    AuthModule.forRoot(),
    CoreModule.forRoot(),

    ToastrModule.forRoot(),
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
  ],
  bootstrap: [AppComponent],
})

export class AppModule {}
