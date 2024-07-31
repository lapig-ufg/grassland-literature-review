import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import {HomeComponent} from "./home.component";
import {TableComponent} from "../../shared/table/table.component";
import {CardModule} from "primeng/card";
import {HeadComponent} from "../../shared/head/head.component";
import { TabViewModule } from 'primeng/tabview';
import {ImageModule} from "primeng/image";
import {ButtonModule} from "primeng/button";

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        TableComponent,
        CardModule,
        HeadComponent,
        TabViewModule,
        ImageModule,
        ButtonModule
        
    ],
    declarations: [
        HomeComponent
    ]
})
export class HomeModule { }
