import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { StatusSourceService } from '../../service/status-source';
import { TableServices } from '../../service/table.service';
import { InputGroupModule } from "primeng/inputgroup";
import { BadgeModule } from "primeng/badge";
import { MenubarModule } from "primeng/menubar";
import { InputTextModule } from "primeng/inputtext";
import { NgClass, NgIf } from "@angular/common";
import { RippleModule } from "primeng/ripple";
import {ButtonModule} from "primeng/button";

@Component({
    selector: 'app-head',
    templateUrl: './head.component.html',
    styleUrls: ['./head.component.scss'],
    imports: [
        InputGroupModule,
        BadgeModule,
        MenubarModule,
        InputTextModule,
        NgClass,
        RippleModule,
        NgIf,
        ButtonModule
    ],
    standalone: true
})
export class HeadComponent implements OnInit {
    statisSource: any;  // Explicitly declare the type of statisSource
    items!: MenuItem[];

    constructor(private statusSource: StatusSourceService,
                private tableService: TableServices) {}

    ngOnInit() {
        this.statusSource.statusSource$.subscribe(dados => {
            this.statisSource = dados;
        });

       
    }

    public applyFilter(query: string): void {
        this.tableService.applyFilter(query);
    }
}
