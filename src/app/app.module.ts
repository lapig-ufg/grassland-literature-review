import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadComponent } from './shared/head/head.component';
import { TableComponent } from './shared/table/table.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { HomeComponent } from './pages/home/home.component';
import {MatTableModule} from '@angular/material/table';
import {CdkTableModule} from '@angular/cdk/table';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClusterComponent } from './pages/cluster/cluster.component';
//import { DialogSourceComponent } from './shared/dialog-source/dialog-source.component';



@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    HomeComponent,
    ClusterComponent,
    
  ],
  imports: [
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    TableComponent,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    CdkTableModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
