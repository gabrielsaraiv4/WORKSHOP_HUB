import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Workshop } from '../../../core/models/workshop.model';
import { WorkshopService } from '../../../core/services/workshop.service';

@Component({
  selector: 'app-workshop-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workshop-list.component.html',
  styleUrls: ['./workshop-list.component.css']
})
export class WorkshopListComponent implements OnInit {
  workshops: Workshop[] = [];
  workshopSelecionado: Workshop | null = null;

  constructor(private workshopService: WorkshopService) {}

  ngOnInit(): void {
    this.workshopService.getWorkshops().subscribe(dados => this.workshops = dados);
  }

  selecionarWorkshop(w: Workshop) {
    this.workshopSelecionado = w;
  }
}