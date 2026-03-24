import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkshopService } from '../../../../services/workshop.service';
import { ColaboradorService } from '../../../../services/colaborador.service';

@Component({
  selector: 'app-lancamento-ata',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lancamento-ata.component.html',
  styleUrl: './lancamento-ata.component.css'
})
export class LancamentoAtaComponent implements OnInit {
  workshops: any[] = [];
  colaboradores: any[] = [];
  
  workshopSelecionadoId: number = 0;
  colaboradoresSelecionados: number[] = [];

  constructor(
    private workshopService: WorkshopService,
    private colaboradorService: ColaboradorService
  ) {}

  ngOnInit() {
    this.workshopService.getWorkshops().subscribe(dados => this.workshops = dados);
    this.colaboradorService.getColaboradores().subscribe(dados => this.colaboradores = dados);
  }

  toggleColaborador(id: number) {
    const index = this.colaboradoresSelecionados.indexOf(id);
    if (index > -1) {
      this.colaboradoresSelecionados.splice(index, 1);
    } else {
      this.colaboradoresSelecionados.push(id);
    }
  }

  finalizarLancamento() {
    if (this.workshopSelecionadoId === 0 || this.colaboradoresSelecionados.length === 0) {
      alert('Selecione um workshop e pelo menos um colaborador!');
      return;
    }

    const payload = {
      workshopId: this.workshopSelecionadoId,
      colaboradoresIds: this.colaboradoresSelecionados
    };

    console.log('Enviando para o servidor:', payload);
  }
}