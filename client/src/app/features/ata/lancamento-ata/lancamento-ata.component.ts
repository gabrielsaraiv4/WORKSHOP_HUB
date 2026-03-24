import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkshopService } from '../../../core/services/workshop.service';
import { ColaboradorService } from '../../../core/services/colaborador.service';
import { Workshop } from '../../../core/models/workshop.model';
import { Colaborador } from '../../../core/models/colaborador.model';

@Component({
  selector: 'app-lancamento-ata',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lancamento-ata.component.html',
  styleUrl: './lancamento-ata.component.css'
})
export class LancamentoAtaComponent implements OnInit {
  workshops: Workshop[] = [];
  colaboradores: Colaborador[] = [];
  
  workshopSelecionadoId: number = 0;
  colaboradorSelecionadoId: number = 0;

  constructor(
    private workshopService: WorkshopService,
    private colaboradorService: ColaboradorService
  ) {}

  ngOnInit(): void {
    this.workshopService.getWorkshops().subscribe(dados => this.workshops = dados);
    this.colaboradorService.getColaboradores().subscribe(dados => this.colaboradores = dados);
  }

  registrar(): void {
    if (this.workshopSelecionadoId && this.colaboradorSelecionadoId) {
      this.workshopService.registrarPresenca(this.workshopSelecionadoId, this.colaboradorSelecionadoId)
        .subscribe(() => {
          alert('Presença registrada com sucesso!');
          this.colaboradorSelecionadoId = 0;
        });
    }
  }
}