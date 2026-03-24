import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
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

  constructor(
    private workshopService: WorkshopService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarWorkshops();
  }

  carregarWorkshops(): void {
    this.workshopService.getWorkshops().subscribe(dados => {
      this.ngZone.run(() => {
        this.workshops = dados;
        this.cdr.detectChanges();
      });
    });
  }

  selecionarWorkshop(w: Workshop): void {
    this.workshopService.getWorkshopById(w.id).subscribe(detalhes => {
      this.ngZone.run(() => {
        this.workshopSelecionado = detalhes;
        this.exibirFormulario = false;
        this.cdr.detectChanges();
      });
    });
  }

  salvar(): void {
    const acao = this.editando 
      ? this.workshopService.updateWorkshop(this.novoWorkshop.id, this.novoWorkshop)
      : this.workshopService.createWorkshop(this.novoWorkshop);

    acao.subscribe({
      next: () => {
        this.ngZone.run(() => {
          this.finalizarAcao();
          this.cdr.detectChanges();
        });
      }
    });
  }

  prepararEdicao(w: Workshop): void {
    this.novoWorkshop = { ...w };
    if (typeof this.novoWorkshop.dataRealizacao === 'string') {
      this.novoWorkshop.dataRealizacao = this.novoWorkshop.dataRealizacao.split('T')[0];
    }
    this.editando = true;
    this.exibirFormulario = true;
    this.workshopSelecionado = null;
    this.cdr.detectChanges();
  }

  excluir(id: number): void {
    if (confirm('Deseja excluir este workshop?')) {
      this.workshopService.deleteWorkshop(id).subscribe(() => {
        this.ngZone.run(() => {
          this.carregarWorkshops();
          if (this.workshopSelecionado?.id === id) {
            this.workshopSelecionado = null;
          }
          this.cdr.detectChanges();
        });
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