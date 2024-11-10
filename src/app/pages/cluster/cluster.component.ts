import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TableServices } from '../../service/table.service';
import {ButtonModule} from "primeng/button";
import {TableComponent} from "../../shared/table/table.component";
import {ImageModule} from "primeng/image";
import { TabViewModule } from 'primeng/tabview';

import { CommonModule } from '@angular/common';
import { environment } from './../../../environments/environment';

@Component({
    selector: 'app-cluster',
    templateUrl: './cluster.component.html',
    styleUrl: './cluster.component.scss',
    imports: [
        ButtonModule,
        TableComponent,
        ImageModule,
        TabViewModule,
        CommonModule
    ],
    standalone: true
})
export class ClusterComponent implements OnInit {
  type_source: string = environment.typeSource;
  cluster_id: number = 0;
  constructor(private route: ActivatedRoute,
    private tableService: TableServices,) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.tableService.setInfo(this.cluster_id)
    });
  }
  setCluster(direction: boolean): void {
    if (direction){
        if (this.cluster_id === 39) {
          this.cluster_id = 0
        }else{
          this.cluster_id = this.cluster_id +1
        }

    }else{
      if (this.cluster_id === 0) {
        this.cluster_id = 39
      }else{
        this.cluster_id = this.cluster_id -1
      }
    }
    this.tableService.setInfo(this.cluster_id)

  }

  getImageUrl(): string {
    let id = this.cluster_id.toString().padStart(3, '0')
    return `https://s3.lapig.iesa.ufg.br/public/literatura/${this.type_source}/cluster/${id}_keywords.png`
  }
}
