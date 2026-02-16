import { RouterModule, Routes } from '@angular/router';
import { AddPart } from './pages/add-part/add-part';
import { Inventory } from './pages/inventory/inventory';

export const routes: Routes = [
  { path: '', redirectTo: 'inventory', pathMatch: 'full' },
  { path: 'add-part', component: AddPart },
  { path: 'inventory', component: Inventory },
];



