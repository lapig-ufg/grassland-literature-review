import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';



@Component({
  selector: 'app-cluster',
  templateUrl: './cluster.component.html',
  styleUrl: './cluster.component.scss',
})
export class ClusterComponent implements OnInit {
  type_source!: string;
  cluster_id: number = 0;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.type_source = params.get('type_source')!;
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

  }

  getImageUrl(): string {
    let id = this.cluster_id.toString().padStart(3, '0')
    return `https://s3.lapig.iesa.ufg.br/public/bibiografia/pasture/${id}_keywords.png`
  }
}