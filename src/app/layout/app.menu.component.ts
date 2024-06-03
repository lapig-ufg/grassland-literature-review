import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'HOME',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'GPW Literature',
                        icon: 'pi pi-fw pi-book',
                        routerLink: ['/']
                    }
                ]
            }
        ];
    }
}
