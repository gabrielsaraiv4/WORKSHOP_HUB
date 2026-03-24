import { Routes } from '@angular/router';
import { WorkshopListComponent } from './components/workshop-list/workshop-list.component';
import { LancamentoAtaComponent } from './features/ata/components/lancamento-ata/lancamento-ata.component';
import { DashboardComponent } from './features/dashboard/components/dashboard/dashboard.component';
import { ColaboradorListComponent } from './features/dashboard/components/colaborador-list/colaborador-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'workshops', component: WorkshopListComponent },
  { path: 'colaboradores', component: ColaboradorListComponent },
  { path: 'lancamento', component: LancamentoAtaComponent },
  { path: '**', redirectTo: 'dashboard' }
];