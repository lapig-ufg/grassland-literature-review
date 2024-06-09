import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoadingService} from './loading.service';
import {ignoreLoadingRoutes} from '../../config/routes.config';
import {finalize} from 'rxjs/operators';
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    constructor(
        private loadingService: LoadingService
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const ignoreRoute = ignoreLoadingRoutes.some(route => request.url.toLowerCase().includes(route.toLowerCase()));
        if (ignoreRoute) {
            return next.handle(request);
        } else {
            this.loadingService.setLoading(true, request.url);
            return next.handle(request)
                .pipe(
                    finalize(() => {
                        this.loadingService.setLoading(false, request.url);
                    })
                );
        }
    }
}
