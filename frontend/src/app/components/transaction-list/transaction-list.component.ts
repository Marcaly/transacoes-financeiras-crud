import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  transactions: any[] = [];
  selectedTransaction: any = null;

  constructor(private http: HttpClient, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getTransactions(); 
  }

  getTransactions(type: string = ''): void {
    let url = 'http://127.0.0.1:8000/api/transactions';
    if (type) {
      url += `?transaction_type=${type}`;
    }

    this.http.get<any[]>(url).subscribe({
      next: (data: any[]) => {
        this.transactions = data;
      },
      error: err => {
        console.error('Erro ao carregar transações', err);
        this.transactions = [];
      }
    });
  }

  addTransaction(): void {
    this.selectedTransaction = null;
    this.openModal();
  }

  editTransaction(transaction: any): void {
    this.selectedTransaction = transaction;
    this.openModal();
  }

  deleteTransaction(id: number): void {
    this.http.delete(`http://127.0.0.1:8000/api/transactions/${id}`).subscribe({
      next: () => {
        this.getTransactions(); 
      },
      error: err => console.error('Erro ao excluir transação', err),
    });
  }

  openModal(): void {
    const modalRef = this.modalService.open(TransactionFormComponent);
    modalRef.componentInstance.transaction = this.selectedTransaction;

    modalRef.componentInstance.formSubmitted.subscribe(() => {
      this.getTransactions(); 
    });

    modalRef.result.then(() => {
      this.getTransactions(); 
    }).catch(() => {
    });
  }

  filterExpenses(): void {
    this.getTransactions('expense');
  }

  filterRevenues(): void {
    this.getTransactions('revenue');
  }

  filterAll(): void {
    this.getTransactions();
  }
}
