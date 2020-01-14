import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';
import { FormsModule } from '@angular/forms';

import { 
    MatTableModule, 
    MatDialogModule, 
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  } from '@angular/material';

  import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
  

import { BasicAuthInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { ManageStoresComponent } from './manage-stores/manage-stores.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageShelfComponent } from './manage-shelf/manage-shelf.component';
import { ManageStockComponent } from './manage-stock/manage-stock.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatTableModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatInputModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        ManageStoresComponent ,
        ManageUsersComponent ,
        ManageShelfComponent ,
        ManageStockComponent ,
        DialogBoxComponent,
        ProductDetailsComponent],
        
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        DialogBoxComponent
      ],
})
export class AppModule { }