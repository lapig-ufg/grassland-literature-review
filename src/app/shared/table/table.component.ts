import { AfterViewInit, Component, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SmallSource, StatusSource } from '../../interface/source';
import { SourceService } from '../../service/source';
import { Source } from '../../interface/source';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { DialogSourceComponent } from '../dialog-source/dialog-source.component';
import { TableServices } from '../../service/table.service';

import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Table } from 'primeng/table';
import { SortEvent } from 'primeng/api';


import {
  FontAwesomeModule,
  FaIconLibrary
} from '@fortawesome/angular-fontawesome';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: true,
  imports: [FontAwesomeModule, MatDialogModule, TableModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TableComponent implements AfterViewInit {
  
  source!: Source;
  search!: string | undefined
  status_sources!: StatusSource;
  page: number = 1;
  limit: number = 1000;
  full: boolean = true;
  isSorted: boolean | null= false;

  @ViewChild('dt') dt!: Table;

  

  public dataSource: Array<SmallSource> = [];

  constructor(
    public dialog: MatDialog,
    private sourceService: SourceService,
    private tableService: TableServices,
    library: FaIconLibrary) {
    library.addIcons(faNewspaper);

  }

  ngOnInit() {
    
    this.tableService.table$.subscribe((table) => {
      this.dataSource = []
      this.dataSource = table;
    });

    this.tableService.search$.subscribe((search) => {
      this.search = search;
    });
    
  }

  announceSortChange2(event: SortEvent): void {

    let sorteData =  {
      active: event.field,
      direction: event.order === 1 ? 'asc' : 'desc'
    }
    if (this.isSorted == null || this.isSorted === undefined) {
      this.isSorted = true;
      this.tableService.announceSortChange(sorteData) ;
  } else if (this.isSorted == true) {
      this.isSorted = false;
      
  } else if (this.isSorted == false) {
      this.isSorted = null;
      this.dataSource = [];
      
  }
    console.log(event.data = []);
    
   }


  applyFilter(filter: string): void {
    this.tableService.applyFilter(filter)
  }

  ngAfterViewInit() {
    this.tableService.getSourcesData(1)
  }

 
 
  handleScroll = (event: Event) => {
    console.log('scroll', event)
    //scrolled = event.scrolled
    console.timeEnd('lastScrolled');
    //scrolled ? this.getSourcesData(this.page +1 ) : _noop();
    console.time('lastScrolled');
  }
  hasMore(){
    console.log(this.dataSource.length)
    return !this.dataSource || this.dataSource.length < this.limit;
  } 
  openDialog(sourceID: string) {
    this.sourceService.getSource(sourceID).subscribe(
      (data) => {
        this.source = data;
        const dialogRef = this.dialog.open(DialogSourceComponent, {
          data: {source:data, visible:true}
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      },
      (error) => {
        console.error('Erro ao obter dados da fonte:', error);

      }
    );


  }
  

}
