import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {
  private apiUrl = 'http://localhost:5013/api/colaboradores';

  constructor(private http: HttpClient) { }

  getColaboradores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}