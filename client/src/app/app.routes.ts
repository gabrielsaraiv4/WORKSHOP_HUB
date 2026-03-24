import { Routes } from '@angular/router';
import { WorkshopListComponent } from './components/workshop-list/workshop-list.component';

export const routes: Routes = [
    { path: '', component: WorkshopListComponent },
    { path: 'workshops', component: WorkshopListComponent }
];