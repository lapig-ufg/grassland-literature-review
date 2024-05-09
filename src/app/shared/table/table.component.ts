import {AfterViewInit, Component, ViewChild, Input, OnChanges, SimpleChanges, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MatSort, Sort,MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {SmallSource, SortOptions, StatusSource } from '../../interface/source';
import { SourceService } from '../../service/source';
import { Source } from '../../interface/source';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DialogSourceComponent }  from '../dialog-source/dialog-source.component';
import { noop as _noop } from 'lodash-es';

import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import {
  faNewspaper,
} from '@fortawesome/free-solid-svg-icons';
import { StatusSourceService } from '../../service/status-source';


/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, 
    MatSortModule, FontAwesomeModule, 
    MatProgressBarModule, MatDialogModule, MatButtonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TableComponent implements AfterViewInit,  OnChanges{
  displayedColumns: string[] = [
    'id', 'doi', 'title', 'keywords', 
    'cluster', 'cited_by_count', 'publication_date',
    'referenced_works_count', 'relevance_score'
  ];
  dataSource!: MatTableDataSource<SmallSource>;
  source!: Source;
  status_sources!: StatusSource
  page: number = 1;
  limit: number = 1000;
  full: boolean = true;
  
  @ViewChild(MatSort) sort!: MatSort;
  
  @Input() type_source: string = 'all';
  @Input() cluster!: number;

  private search!: string;
  private sortState!: SortOptions

  

  constructor(
    public dialog: MatDialog,
    private sourceService: SourceService, 
    private statusSourceService: StatusSourceService,
    library: FaIconLibrary,
    private _liveAnnouncer: LiveAnnouncer) {
    library.addIcons(faNewspaper);
    
  }

  ngOnInit() {
    this.getData([])  
  }
  ngAfterViewInit() {
    this.getSourcesData(1);
    
  }

  applyFilter(searchFilter: string) {
    
    console.log(searchFilter)
    this.search = searchFilter
    this.getSourcesData(1);
    this.dataSource.filter = searchFilter.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    
    this.sortState = sortState
    this.getSourcesData(1);
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }

  }


  clearSources(){
    this.dataSource = new MatTableDataSource();
    this.dataSource.sort = this.sort;
    
  }

  handleScroll = (event: Event) => {
    console.log('scroll', event)
    //scrolled = event.scrolled
    console.timeEnd('lastScrolled');
    //scrolled ? this.getSourcesData(this.page +1 ) : _noop();
    console.time('lastScrolled');
  }
  hasMore(){
    console.log(this.dataSource.data.length)
    return !this.dataSource || this.dataSource.data.length < this.limit;
  } 

  getData(dataNew: SmallSource[]) {
    const data: any = this.dataSource
      ? [...this.dataSource.data, ...dataNew] 
      : this.getSourcesData(1);
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
  }

  getSourcesData(page:number) {
    this.page = page;
    if (page === 1) {
      this.getTotal()
    }
    this.clearSources()
    this.sourceService.getSources(
      this.type_source, 
      page,this.search,
      this.cluster,
      this.sortState
    ).subscribe(
      (data) => {
        this.getData(data);
        
      },
      (error) => {
        console.error('Erro ao obter dados da fonte:', error);
        
      }
    );
  }

  getTotal() {
    
    this.clearSources()
    this.sourceService.getTotal(
      this.type_source, 
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
  openDialog(sourceID: string) {
    this.sourceService.getSource(sourceID).subscribe(
      (data) => {
        this.source =  data;
        const dialogRef = this.dialog.open(DialogSourceComponent, {
          data: data
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
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cluster'] || changes['type_source']) {
      this.getSourcesData(1)
    }
  }

}

