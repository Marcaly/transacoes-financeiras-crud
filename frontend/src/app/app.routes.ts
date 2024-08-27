import { Routes } from '@angular/router';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';

export const routes: Routes = [
    { path: 'transactions', component: TransactionListComponent },
    { path: 'transactions/new', component: TransactionFormComponent },
    { path: 'transactions/edit/:id', component: TransactionFormComponent },
    { path: '', redirectTo: '/transactions', pathMatch: 'full' },
  ];
