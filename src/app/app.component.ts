import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {LoadingService} from "./shared/components/loading";
import {delay} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    loading: boolean;
    constructor(
        private readonly primengConfig: PrimeNGConfig,
        private readonly loadingService: LoadingService

    ) {
        this.loading = false;
    }

    ngOnInit(): void {
        this.primengConfig.ripple = true;
        this.loadingService.loadingSub
            .pipe(delay(0))
            .subscribe((loading) => {
                this.loading = loading;
            });
    }
}
