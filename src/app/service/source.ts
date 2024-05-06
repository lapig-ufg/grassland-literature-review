import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SmallSource, Source, SortOptions } from '../interface/source'


@Injectable({
  providedIn: 'root'
})
export class SourceService {

  constructor(private http: HttpClient) { }

  // Função para obter a fonte dos dados da API com parâmetros de consulta
  getSources(typeSource: string, page: number, search?: string, cluster?: number, sortState?: SortOptions): Observable<SmallSource[]> {
    let params: any = { type_source: typeSource, page: page };
    if (search) {
      params.search = search;
    }
    if (cluster !== undefined) {
      params.cluster = cluster;
    }
    if (sortState !== undefined) {
      params.sort_active = sortState.active;
      params.sort_direction = sortState.direction
    }
    // Faz a solicitação GET com os parâmetros de consulta
    return this.http.get<SmallSource[]>(`https://download.lapig.iesa.ufg.br/api/bibio/works/list/${typeSource}`, { params: params });
  }

  getSource(sourceId: string): Observable<Source> {
    
    return this.http.get<Source>(`https://download.lapig.iesa.ufg.br/api/bibio/works/id/${sourceId}`);
  }
}
