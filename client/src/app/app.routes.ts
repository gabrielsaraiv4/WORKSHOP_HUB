import { Routes } from '@angular/router';
import { WorkshopListComponent } from './features/workshops/workshop-list/workshop-list.component';
import { LancamentoAtaComponent } from './features/ata/lancamento-ata/lancamento-ata.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ColaboradorListComponent } from './features/colaboradores/colaborador-list/colaborador-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'workshops', component: WorkshopListComponent },
  { path: 'colaboradores', component: ColaboradorListComponent },
  { path: 'lancamento-ata', component: LancamentoAtaComponent },
  { path: '**', redirectTo: 'dashboard' }
];