import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkshopService } from '../../../core/services/workshop.service';
import { Workshop } from '../../../core/models/workshop.model';

@Component({
  selector: 'app-workshop-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './workshop-list.component.html',
  styleUrl: './workshop-list.component.css'
})
export class WorkshopListComponent implements OnInit {
  workshops: Workshop[] = [];
  workshopSelecionado: Workshop | null = null;
  
  novoWorkshop: Workshop = { 
    id: 0, 
    nome: '', 
    descricao: '', 
    dataRealizacao: new Date().toISOString().split('T')[0] 
  };
  
  editando: boolean = false;
  exibirFormulario: boolean = false;

  constructor(private workshopService: WorkshopService) {}

  ngOnInit(): void {
    this.carregarWorkshops();
  }

  carregarWorkshops(): void {
    this.workshopService.getWorkshops().subscribe(dados => {
      this.workshops = dados;
    });
  }

  selecionarWorkshop(w: Workshop): void {
    this.workshopService.getWorkshopById(w.id).subscribe(detalhes => {
      this.workshopSelecionado = detalhes;
      this.exibirFormulario = false;
    });
  }

  salvar(): void {
    if (this.editando) {
      this.workshopService.updateWorkshop(this.novoWorkshop.id, this.novoWorkshop).subscribe(() => {
        this.finalizarAcao();
      });
    } else {
      this.workshopService.createWorkshop(this.novoWorkshop).subscribe(() => {
        this.finalizarAcao();
      });
    }
  }

  prepararEdicao(w: Workshop): void {
    this.novoWorkshop = { ...w };
    if (typeof this.novoWorkshop.dataRealizacao === 'string') {
      this.novoWorkshop.dataRealizacao = this.novoWorkshop.dataRealizacao.split('T')[0];
    }
    this.editando = true;
    this.exibirFormulario = true;
    this.workshopSelecionado = null;
  }

  excluir(id: number): void {
    if (confirm('Deseja excluir este workshop?')) {
      this.workshopService.deleteWorkshop(id).subscribe(() => {
        this.carregarWorkshops();
        if (this.workshopSelecionado?.id === id) {
          this.workshopSelecionado = null;
        }
      });
    }
  }

  finalizarAcao(): void {
    this.carregarWorkshops();
    this.resetarForm();
    this.exibirFormulario = false;
  }

  resetarForm(): void {
    this.novoWorkshop = { 
      id: 0, 
      nome: '', 
      descricao: '', 
      dataRealizacao: new Date().toISOString().split('T')[0] 
    };
    this.editando = false;
  }
}