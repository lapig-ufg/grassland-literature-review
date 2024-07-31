import { AfterViewInit, Component, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SourceService } from '../../service/source';
import { TableServices } from '../../service/table.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Table } from 'primeng/table';
import { SortEvent } from 'primeng/api';
import { Source, StatusSource } from '../interface/source';
import { DialogModule } from 'primeng/dialog';
import { ImageModule } from 'primeng/image';
import {ButtonModule} from "primeng/button";
import {TooltipModule} from "primeng/tooltip";
import {RouterOutlet} from "@angular/router";
import {HeadComponent} from "../head/head.component";
import { StatusSourceService } from '../../service/status-source';


@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    standalone: true,
    imports: [TableModule, CommonModule, DialogModule, ImageModule, ButtonModule, TooltipModule, RouterOutlet, HeadComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TableComponent implements AfterViewInit {
    source: Source | null = null;
    search: string | undefined;
    page: number = 1;
    rows:number = 10;
    limit: number = 1000;
    full: boolean = true;
    isSorted: boolean | null = false;
    showDialog: boolean = false;

    @ViewChild('dt') dt!: Table;

    public dataSource: any[] = [];

    statisSource!: StatusSource;

    constructor(
        private statusSource: StatusSourceService, 
        private sourceService: SourceService,
        private tableService: TableServices,
    ) {}

    ngOnInit() {
        this.tableService.table$.subscribe((table) => {
            this.dataSource = [];
            this.dataSource = table;
        });

        this.tableService.search$.subscribe((search) => {
            this.search = search;
        });
        this.statusSource.statusSource$.subscribe(dados => {
            this.statisSource = dados;
          });
    }

    announceSortChange2(event: SortEvent): void {
        let sortedData = {
            active: event.field,
            direction: event.order === 1 ? 'asc' : 'desc'
        };
        if (this.isSorted === null || this.isSorted === undefined) {
            this.isSorted = true;
            this.tableService.announceSortChange(sortedData);
        } else if (this.isSorted) {
            this.isSorted = false;
        } else if (!this.isSorted) {
            this.isSorted = null;
            this.dataSource = [];
        }
        console.log(event.data = []);
    }

    applyFilter(filter: string): void {
        this.tableService.applyFilter(filter);
    }

    ngAfterViewInit() {
        this.tableService.getSourcesData(1);
    }

    handleScroll = (event: Event) => {
        console.log('scroll', event);
        console.timeEnd('lastScrolled');
        console.time('lastScrolled');
    }

    hasMore() {
        console.log(this.dataSource.length);
        return !this.dataSource || this.dataSource.length < this.limit;
    }

    openDialog(sourceID: string) {
        this.showDialog = false;
        this.sourceService.getSource(sourceID).subscribe(
            (data) => {
                this.showDialog = false;
                this.source = data;
                this.showDialog = true;
            },
            (error) => {
                this.showDialog = false;
                console.error('Erro ao obter dados da fonte:', error);
            }
        );
    }
    openDoi(doi: string): void{
        window.open(doi, '_blanck')
    }
}
