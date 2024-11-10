import { Injectable, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { SourceService } from './source';
import { StatusSourceService } from './status-source';
import {SmallSource, SortOptions, Source, StatusSource} from "../shared/interface/source";
import { environment } from './../../environments/environment';


const INITIAL_PAGE = 1;

@Injectable({
    providedIn: 'root',
})
export class TableServices {

    private table = new BehaviorSubject<Array<SmallSource>>([]);
    private _search = new BehaviorSubject<string|undefined>(undefined);

    search$ = this._search.asObservable();
    table$ = this.table.asObservable();

    type_source: string = environment.typeSource
    cluster!: number | undefined


    source!: Source;
    status_sources!: StatusSource
    page: number = 1;
    limit: number = 1000;
    full: boolean = true;


    private search!: string;
    private pageIndex!: number;
    private sortState!: SortOptions

    public constructor(
        private sourceService: SourceService,
        private statusSourceService: StatusSourceService

    ) { }

    setInfo(cluster?: number): void {
        this.cluster = cluster;
        this.getSourcesData(INITIAL_PAGE);
    }

    public applyFilter(searchFilter: string): void {
        this.search = searchFilter;
        this._search.next(searchFilter);

        this.getSourcesData(INITIAL_PAGE);

    }

    public getSourcesData(pageIndex: number): void {
        this.pageIndex = pageIndex;

        if (pageIndex === INITIAL_PAGE) {
            this.getTotal()
        }


        this.sourceService.getSources(
            pageIndex,
            this.search,
            this.cluster,
            this.sortState
        ).subscribe(
            (data: Array<SmallSource>) => {

                this.setData(data);

            },
            (error: any) => {
                console.error('Erro ao obter dados da fonte:', error);

            }
        );
    }

    public getTotal(): void {
        this.sourceService.getTotal(
            this.search,
            this.cluster,
            this.sortState
        ).subscribe(
            (data) => {
                this.statusSourceService.setStatus(data)
                this.limit = data.total
            },
            (error) => {
                console.error('Erro ao obter dados da fonte:', error);

            }
        );
    }

    public setData(dataNew: SmallSource[]): void {
        this.table.next(dataNew);
    }


    announceSortChange(sortState: any) {
        // This example uses English messages. If your application supports
        // multiple language, you would internationalize these strings.
        // Furthermore, you can customize the message to add additional
        // details about the values being sorted.

        this.sortState = sortState
        this.getSourcesData(1);


      }
}
