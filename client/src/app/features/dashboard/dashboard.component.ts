import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, DashboardStats } from '../../core/services/dashboard.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
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
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.carregarTudo();
  }

  carregarTudo(): void {
    this.dashboardService.getStats().subscribe({
      next: (dados) => {
        this.stats = dados;
        this.cdr.detectChanges();
      }
    });

    setTimeout(() => {
      this.dashboardService.getStatsPorDepartamento().subscribe({
        next: (dados) => {
          this.doughnutChartData.labels = dados.map(d => d.departamento);
          this.doughnutChartData.datasets[0].data = dados.map(d => d.quantidade);
          this.doughnutChartData = { ...this.doughnutChartData }; 
          this.cdr.detectChanges();
        }
      });
    }, 100);
  }
}