import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ClusterComponent } from './pages/cluster/cluster.component';

const routes: Routes = [
  {
    'path': '',
    'component': HomeComponent
  },
  {
    'path': ':type_source',
    'component': ClusterComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
