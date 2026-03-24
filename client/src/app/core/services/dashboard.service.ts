import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DashboardStats {
  totalWorkshops: number;
  totalColaboradores: number;
  totalAtas: number;
}

export interface DeptStats {
  departamento: string;
  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:5013/api/dashboard';

  constructor(private http: HttpClient) { }

  getStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/stats`);
  }

  getStatsPorDepartamento(): Observable<DeptStats[]> {
    return this.http.get<DeptStats[]>(`${this.apiUrl}/por-departamento`);
  }
}