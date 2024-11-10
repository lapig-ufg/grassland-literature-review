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
                        label: 'Literature',
                        icon: 'pi pi-fw pi-book',
                        routerLink: ['/literature']
                    }
                ]
            },
            {
                label: 'Cluster',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Pasture Cluster',
                        icon: 'pi pi-fw pi-book',
                        routerLink: ['/literature/cluster']
                    }
                ]
            }
        ];
    }
}
