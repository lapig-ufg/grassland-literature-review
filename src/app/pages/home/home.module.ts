import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import {HomeComponent} from "./home.component";
import {TableComponent} from "../../shared/table/table.component";
import {CardModule} from "primeng/card";

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        TableComponent,
        CardModule
    ],
    declarations: [
        HomeComponent
    ]
})
export class HomeModule { }
