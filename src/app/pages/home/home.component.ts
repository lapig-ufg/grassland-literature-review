import { Component, OnInit } from '@angular/core';
import { TableServices } from '../../service/table.service';
import { environment } from './../../../environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',

})

export class HomeComponent implements OnInit {
    type_source: string = environment.typeSource;
    constructor(private tableService: TableServices){}

    ngOnInit(): void {
        this.tableService.setInfo( )
    }
}
