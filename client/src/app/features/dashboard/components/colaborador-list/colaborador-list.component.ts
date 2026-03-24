import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColaboradorService } from '../../../../services/colaborador.service';

@Component({
  selector: 'app-colaborador-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './colaborador-list.component.html',
  styleUrl: './colaborador-list.component.css'
})
export class ColaboradorListComponent implements OnInit {
  colaboradores: any[] = [];
  loading: boolean = true;

  constructor(private colaboradorService: ColaboradorService) {}

  ngOnInit(): void {
    this.colaboradorService.getColaboradores().subscribe({
      next: (dados) => {
        this.colaboradores = dados;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar colaboradores:', err);
        this.loading = false;
      }
    });
  }
}