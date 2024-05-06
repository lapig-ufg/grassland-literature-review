import {AfterViewInit, Component, ViewChild, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, Sort,MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {SmallSource, SortOptions } from '../../interface/source';
import { SourceService } from '../../service/source';
import { Source } from '../../interface/source';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DialogSourceComponent }  from '../dialog-source/dialog-source.component';

import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import {
  faNewspaper,
} from '@fortawesome/free-solid-svg-icons';


/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, 
    MatSortModule, MatPaginatorModule, FontAwesomeModule, 
    MatProgressBarModule, MatDialogModule, MatButtonModule],
})
export class TableComponent implements AfterViewInit,  OnChanges{
  displayedColumns: string[] = ['id', 'doi', 'title', 'keywords', 'cluster'];
  dataSource!: MatTableDataSource<SmallSource>;
  source!: Source;

  @ViewChild(MatPaginator) paginator!: MatPaginator;  
  @ViewChild(MatSort) sort!: MatSort;
  
  @Input() type_source: string = 'all';
  @Input() cluster!: number;

  private search!: string;
  private sortState!: SortOptions
  public loading:boolean = true
  

  constructor(
    public dialog: MatDialog,
    private sourceService: SourceService, 
    library: FaIconLibrary,
    private _liveAnnouncer: LiveAnnouncer) {
    library.addIcons(faNewspaper);
    
  }

  ngAfterViewInit() {
    this.getSourcesData(1);
    
  }

  applyFilter(searchFilter: string) {
    
    console.log(searchFilter)
    this.search = searchFilter
    this.getSourcesData(1);
    this.dataSource.filter = searchFilter.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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


  getSourcesData(page:number) {
    this.loading = true;
    this.sourceService.getSources(
      this.type_source, 
      page,this.search,
      this.cluster,
      this.sortState
    ).subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false
      },
      (error) => {
        console.error('Erro ao obter dados da fonte:', error);
        this.loading = false
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
    if (changes['cluster']) {
      this.getSourcesData(1)
    }
  }

}

