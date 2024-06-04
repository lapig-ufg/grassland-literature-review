import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { StatusSourceService } from '../service/status-source';
import { StatusSource } from '../shared/interface/source';
import { TableServices } from '../service/table.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopbarComponent implements OnInit {
    statisSource!: StatusSource;

    @ViewChild('menubutton') menuButton!: ElementRef;

    constructor(public layoutService: LayoutService,
        private statusSource: StatusSourceService, 
        private tableService: TableServices
    ) { }

    ngOnInit() {
        this.statusSource.statusSource$.subscribe(dados => {
          this.statisSource = dados;
        });
    }

    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    onProfileButtonClick() {
        this.layoutService.showProfileSidebar();
    }
    onConfigButtonClick() {
        this.layoutService.showConfigSidebar();
    }

    public applyFilter(query: string): void {
        console.log("CLiquei no botão")
        this.tableService.applyFilter(query);
      }
    
}