import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColaboradorService } from '../../../core/services/colaborador.service';
import { Colaborador } from '../../../core/models/colaborador.model';

@Component({
  selector: 'app-colaborador-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './colaborador-list.component.html',
  styleUrl: './colaborador-list.component.css'
})
export class ColaboradorListComponent implements OnInit {
  colaboradores: Colaborador[] = [];
  novoColaborador: Colaborador = { 
    id: 0, 
    nome: '', 
    cargo: '', 
    departamento: '' 
  };
  editando: boolean = false;
  exibirFormulario: boolean = false;

  constructor(
    private colaboradorService: ColaboradorService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarColaboradores();
  }

  carregarColaboradores(): void {
    this.colaboradorService.getColaboradores().subscribe({
      next: (dados: Colaborador[]) => {
        this.ngZone.run(() => {
          this.colaboradores = dados;
          this.cdr.detectChanges();
        });
      },
      error: (err) => console.error('Erro ao carregar colaboradores:', err)
    });
  }

  salvar(): void {
    const acao = this.editando 
      ? this.colaboradorService.updateColaborador(this.novoColaborador.id, this.novoColaborador)
      : this.colaboradorService.createColaborador(this.novoColaborador);

    acao.subscribe({
      next: () => {
        this.ngZone.run(() => {
          this.finalizarAcao();
          this.cdr.detectChanges();
        });
      }
    });
  }

  editar(c: Colaborador): void {
    this.novoColaborador = { ...c };
    this.editando = true;
    this.exibirFormulario = true;
    this.cdr.detectChanges();
  }

  excluir(id: number): void {
    if (confirm('Deseja excluir este colaborador?')) {
      this.colaboradorService.deleteColaborador(id).subscribe({
        next: () => {
          this.ngZone.run(() => {
            this.carregarColaboradores();
          });
        }
      });
    }
  }

  finalizarAcao(): void {
    this.carregarColaboradores();
    this.resetarForm();
    this.exibirFormulario = false;
  }

  resetarForm(): void {
    this.novoColaborador = { 
      id: 0, 
      nome: '', 
      cargo: '', 
      departamento: '' 
    };
    this.editando = false;
  }
}