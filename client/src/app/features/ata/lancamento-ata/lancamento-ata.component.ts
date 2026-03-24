import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkshopService } from '../../../core/services/workshop.service';
import { ColaboradorService } from '../../../core/services/colaborador.service';
import { Workshop } from '../../../core/models/workshop.model';
import { Colaborador } from '../../../core/models/colaborador.model';
import { forkJoin } from 'rxjs';

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
  colaboradoresSelecionados: number[] = [];
  carregando: boolean = false;

  constructor(
    private workshopService: WorkshopService,
    private colaboradorService: ColaboradorService
  ) {}

  ngOnInit(): void {
    this.workshopService.getWorkshops().subscribe(dados => this.workshops = dados);
    this.colaboradorService.getColaboradores().subscribe(dados => this.colaboradores = dados);
  }

  estaSelecionado(id: number): boolean {
    return this.colaboradoresSelecionados.includes(id);
  }

  toggleColaborador(id: number): void {
    const index = this.colaboradoresSelecionados.indexOf(id);
    if (index > -1) {
      this.colaboradoresSelecionados.splice(index, 1);
    } else {
      this.colaboradoresSelecionados.push(id);
    }
  }

  finalizarLancamento(): void {
    if (this.workshopSelecionadoId === 0 || this.colaboradoresSelecionados.length === 0) return;

    this.carregando = true;
    
    const chamadas = this.colaboradoresSelecionados.map(colabId => 
      this.workshopService.registrarPresenca(this.workshopSelecionadoId, colabId)
    );

    forkJoin(chamadas).subscribe({
      next: () => {
        alert('Ata lançada com sucesso!');
        this.colaboradoresSelecionados = [];
        this.workshopSelecionadoId = 0;
        this.carregando = false;
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao lançar ata.');
        this.carregando = false;
      }
    });
  }
}