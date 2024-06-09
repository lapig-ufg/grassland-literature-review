import { NgModule } from '@angular/core';
import {LoadingCompComponent} from "./loading.component";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [
        LoadingCompComponent
    ],
    imports: [
        CommonModule,
    ],
    exports: [LoadingCompComponent]
})
export class LoadingModule { }
