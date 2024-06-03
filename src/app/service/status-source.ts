// shared-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {StatusSource} from "../shared/interface/source";

@Injectable({
  providedIn: 'root',
})
export class StatusSourceService {
  private statusSource = new BehaviorSubject<StatusSource>({total:0,pages:0});
  statusSource$ = this.statusSource.asObservable();

  setStatus(dados: StatusSource) {
    this.statusSource.next(dados);
  }
}
