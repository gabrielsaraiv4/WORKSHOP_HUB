import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopService } from '../../core/services/workshop.service';
import { ColaboradorService } from '../../core/services/colaborador.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  totalWorkshops: number = 0;
  totalColaboradores: number = 0;
  totalAtas: number = 0;

  constructor(
    private workshopService: WorkshopService,
    private colaboradorService: ColaboradorService
  ) {}

  ngOnInit(): void {
    this.workshopService.getWorkshops().subscribe(dados => this.totalWorkshops = dados.length);
    this.colaboradorService.getColaboradores().subscribe(dados => this.totalColaboradores = dados.length);
  }
}