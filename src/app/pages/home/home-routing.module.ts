import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {HomeComponent} from "./home.component";
import {ClusterComponent} from "../cluster/cluster.component";

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '',
            data: {breadcrumb: 'GPW Literature Review'},
            component: HomeComponent },
        {
            path: ':type_source',
            data: {breadcrumb: 'Type Source'},
            component: ClusterComponent
        }
    ])],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
