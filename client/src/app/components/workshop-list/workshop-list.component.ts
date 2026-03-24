import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopService } from '../../services/workshop.service';
import { Workshop } from '../../models/workshop.model';

@Component({
    selector: 'app-workshop-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './workshop-list.component.html'
})
export class WorkshopListComponent implements OnInit {
    workshops: Workshop[] = [];

    constructor(private workshopService: WorkshopService) { }

    ngOnInit() {
        this.carregarWorkshops();
    }

    carregarWorkshops() {
        this.workshopService.getWorkshops().subscribe({
            next: (dados) => {
                this.workshops = dados;
            },
            error: (erro) => {
                console.error('Erro ao buscar workshops', erro);
            }
        });
    }
}