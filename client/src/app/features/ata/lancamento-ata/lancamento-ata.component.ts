import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkshopService } from '../../../core/services/workshop.service';
import { ColaboradorService } from '../../../core/services/colaborador.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Workshop } from '../../../core/models/workshop.model';
import { Colaborador } from '../../../core/models/colaborador.model';
import { forkJoin } from 'rxjs';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lancamento-ata',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule],
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
    private colaboradorService: ColaboradorService,
    private notification: NotificationService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.workshopService.getWorkshops().subscribe(dados => {
      this.ngZone.run(() => {
        this.workshops = dados;
        this.cdr.detectChanges();
      });
    });
    
    this.colaboradorService.getColaboradores().subscribe(dados => {
      this.ngZone.run(() => {
        this.colaboradores = dados;
        this.cdr.detectChanges();
      });
    });
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
    this.cdr.detectChanges();
  }

  finalizarLancamento(): void {
    if (this.workshopSelecionadoId === 0 || this.colaboradoresSelecionados.length === 0) return;
    this.carregando = true;
    
    const chamadas = this.colaboradoresSelecionados.map(colabId => 
      this.workshopService.registrarPresenca(this.workshopSelecionadoId, colabId)
    );

    forkJoin(chamadas).subscribe({
      next: () => {
        this.ngZone.run(() => {
          this.notification.exibir('Ata lançada com sucesso!');
          this.colaboradoresSelecionados = [];
          this.workshopSelecionadoId = 0;
          this.carregando = false;
          this.cdr.detectChanges();
        });
      },
      error: () => {
        this.ngZone.run(() => {
          this.notification.exibir('Erro ao lançar ata', 'erro');
          this.carregando = false;
          this.cdr.detectChanges();
        });
      }
    });
  }
}