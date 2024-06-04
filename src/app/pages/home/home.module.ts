import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import {HomeComponent} from "./home.component";
import {TableComponent} from "../../shared/table/table.component";
import {CardModule} from "primeng/card";
import {HeadComponent} from "../../shared/head/head.component";

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        TableComponent,
        CardModule,
        HeadComponent
    ],
    declarations: [
        HomeComponent
    ]
})
export class HomeModule { }
