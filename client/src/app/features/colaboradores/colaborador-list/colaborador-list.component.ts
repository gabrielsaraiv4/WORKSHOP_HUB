import { Component, OnInit } from '@angular/core';
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

  constructor(private colaboradorService: ColaboradorService) {}

  ngOnInit(): void {
    this.carregarColaboradores();
  }

  carregarColaboradores(): void {
    this.colaboradorService.getColaboradores().subscribe((dados: Colaborador[]) => {
      this.colaboradores = dados;
    });
  }

  salvar(): void {
    if (this.editando) {
      this.colaboradorService.updateColaborador(this.novoColaborador.id, this.novoColaborador).subscribe(() => {
        this.finalizarAcao();
      });
    } else {
      this.colaboradorService.createColaborador(this.novoColaborador).subscribe(() => {
        this.finalizarAcao();
      });
    }
  }

  editar(c: Colaborador): void {
    this.novoColaborador = { ...c };
    this.editando = true;
    this.exibirFormulario = true;
  }

  excluir(id: number): void {
    if (confirm('Deseja excluir este colaborador?')) {
      this.colaboradorService.deleteColaborador(id).subscribe(() => {
        this.carregarColaboradores();
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