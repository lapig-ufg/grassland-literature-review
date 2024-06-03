import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TableServices } from '../../service/table.service';
import {ButtonModule} from "primeng/button";
import {TableComponent} from "../../shared/table/table.component";
import {ImageModule} from "primeng/image";

@Component({
    selector: 'app-cluster',
    templateUrl: './cluster.component.html',
    styleUrl: './cluster.component.scss',
    imports: [
        ButtonModule,
        TableComponent,
        ImageModule
    ],
    standalone: true
})
export class ClusterComponent implements OnInit {
  type_source!: string;
  cluster_id: number = 0;
  constructor(private route: ActivatedRoute,
    private tableService: TableServices,) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.type_source = params.get('type_source')!;
      this.tableService.setInfo(this.type_source, this.cluster_id)
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
    this.tableService.setInfo(this.type_source, this.cluster_id)

  }

  getImageUrl(): string {
    let id = this.cluster_id.toString().padStart(3, '0')
    let path = this.type_source
    if (path === 'medicine'){
      path = 'med'
    }
    return `https://s3.lapig.iesa.ufg.br/public/bibiografia/${path}/${id}_keywords.png`
  }
}
