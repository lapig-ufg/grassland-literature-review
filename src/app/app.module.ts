import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadComponent } from './shared/head/head.component';
import { TableComponent } from './shared/table/table.component';
import { ScrollContainerComponent } from './shared/scroll-container/scroll-container.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { HomeComponent } from './pages/home/home.component';
import {MatTableModule} from '@angular/material/table';
import {CdkTableModule} from '@angular/cdk/table';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import { ImageModule } from 'primeng/image';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';

import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';


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
    DialogModule,
    MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, CommonModule,
    ButtonModule,
    ImageModule,
    MenubarModule,
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    TableComponent,
    ScrollContainerComponent,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    CdkTableModule,
    HttpClientModule,
    FontAwesomeModule,
    InputGroupAddonModule,
    InputGroupModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
