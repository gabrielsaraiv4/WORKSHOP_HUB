import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkshopService } from '../../../core/services/workshop.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Workshop } from '../../../core/models/workshop.model';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-workshop-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule],
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
    private notification: NotificationService,
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
          this.notification.exibir(this.editando ? 'Workshop atualizado!' : 'Workshop criado!');
          this.cdr.detectChanges();
        });
      },
      error: () => this.notification.exibir('Erro ao salvar workshop', 'erro')
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
      this.workshopService.deleteWorkshop(id).subscribe({
        next: () => {
          this.ngZone.run(() => {
            this.carregarWorkshops();
            this.notification.exibir('Workshop excluído!');
            if (this.workshopSelecionado?.id === id) {
              this.workshopSelecionado = null;
            }
            this.cdr.detectChanges();
          });
        },
        error: () => this.notification.exibir('Erro ao excluir workshop', 'erro')
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