import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ProductService } from './services/product.service';
import { CartComponent } from './cart/cart.component';
// Import BrowserAnimationsModule
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
// Import your library
import { AlertModule } from 'ngx-alerts';
import { CheckoutComponent } from './checkout/checkout.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
 
    // Specify your library as an import (set timeout to -1 for unlimited timeout, the message can only be closed by the user clicking on it)
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'right'})
 
  ],
  providers: [ProductService ,Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }