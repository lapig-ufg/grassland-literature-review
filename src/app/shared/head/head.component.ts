import { Component, OnInit} from '@angular/core';
import { StatusSourceService } from '../../service/status-source';
import { StatusSource } from '../../interface/source';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrl: './head.component.scss'
})
export class HeadComponent implements OnInit {
  statisSource!: StatusSource;

  constructor(private statusSource: StatusSourceService) {}

  ngOnInit() {
    this.statusSource.statusSource$.subscribe(dados => {
      this.statisSource = dados;
    });
  }

}
