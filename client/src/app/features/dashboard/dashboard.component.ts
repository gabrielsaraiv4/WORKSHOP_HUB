import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, DashboardStats } from '../../core/services/dashboard.service';
import { NotificationService } from '../../core/services/notification.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, MatSnackBarModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  stats: DashboardStats = { totalWorkshops: 0, totalColaboradores: 0, totalAtas: 0 };

  public doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { usePointStyle: true } }
    }
  };

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [{ 
      data: [], 
      backgroundColor: ['#4C51BF', '#38A169', '#ECC94B', '#E53E3E', '#805AD5'],
      borderWidth: 0
    }]
  };

  public doughnutChartType: ChartType = 'doughnut';

  constructor(
    private dashboardService: DashboardService,
    private notification: NotificationService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef 
  ) {}

  get porcentagemAdesao(): number {
    const totalIdeal = this.stats.totalWorkshops * this.stats.totalColaboradores;
    if (totalIdeal === 0) return 0;
    
    const adesao = (this.stats.totalAtas / totalIdeal) * 100;
    return Math.round(adesao > 100 ? 100 : adesao);
  }

  ngOnInit(): void {
    this.carregarTudo();
  }

  carregarTudo(): void {
    this.dashboardService.getStats().subscribe({
      next: (dados) => {
        this.ngZone.run(() => {
          this.stats = dados;
          this.cdr.detectChanges();
        });
      },
      error: () => this.notification.exibir('Erro ao carregar estatísticas', 'erro')
    });

    setTimeout(() => {
      this.dashboardService.getStatsPorDepartamento().subscribe({
        next: (dados) => {
          this.ngZone.run(() => {
            this.doughnutChartData.labels = dados.map(d => d.departamento);
            this.doughnutChartData.datasets[0].data = dados.map(d => d.quantidade);
            this.doughnutChartData = { ...this.doughnutChartData }; 
            this.cdr.detectChanges();
          });
        }
      });
    }, 150);
  }

  gerarRelatorio(): void {
    const cabecalho = 'Indicador;Valor\n';
    const dados = [
      'RESUMO GERAL',
      `Total de Workshops;${this.stats.totalWorkshops}`,
      `Total de Colaboradores;${this.stats.totalColaboradores}`,
      `Total de Atas Lancadas;${this.stats.totalAtas}`,
      '',
      'INSIGHTS DE GESTAO',
      `Taxa de Adesao;${this.porcentagemAdesao}%`,
      `Media de participacao;${(this.stats.totalColaboradores / (this.stats.totalWorkshops || 1)).toFixed(1)} por evento`,
      'Status do Sistema;Online',
      '',
      'DADOS DE CONTROLE',
      `Data de Emissao;${new Date().toLocaleDateString()}`,
      `Hora de Emissao;${new Date().toLocaleTimeString()}`,
      `Gerado por;Gabriel Saraiva`
    ].join('\n');

    const conteudoFinal = cabecalho + dados;
    const blob = new Blob([conteudoFinal], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `relatorio_workshop_${new Date().getTime()}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.notification.exibir('Relatório detalhado gerado com sucesso!');
  }
}