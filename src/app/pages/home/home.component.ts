import { Component, OnInit } from '@angular/core';
import { TableServices } from '../../service/table.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  
})


export class HomeComponent implements OnInit {

    constructor(private tableService: TableServices){}

    ngOnInit(): void {
        this.tableService.setInfo( 'all')
    }

    
        
}
