import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workshop } from '../models/workshop.model';

@Injectable({
    providedIn: 'root'
})
export class WorkshopService {
    private apiUrl = 'http://localhost:5013/api/workshops';

    constructor(private http: HttpClient) { }

    getWorkshops(): Observable<Workshop[]> {
        return this.http.get<Workshop[]>(this.apiUrl);
    }

    getWorkshopById(id: number): Observable<Workshop> {
        return this.http.get<Workshop>(`${this.apiUrl}/${id}`);
    }

    registrarPresenca(workshopId: number, colaboradorId: number): Observable<any> {
        return this.http.post(`${this.apiUrl}/${workshopId}/registrar-presenca/${colaboradorId}`, {});
    }
}