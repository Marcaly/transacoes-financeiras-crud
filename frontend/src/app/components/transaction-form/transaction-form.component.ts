import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './transaction-form.component.html',
})
export class TransactionFormComponent implements OnInit {
  @Input() transaction: any = null;
  @Output() formSubmitted = new EventEmitter<void>();

  transactionForm: FormGroup;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient, 
    public activeModal: NgbActiveModal // Import NgbActiveModal
  ) {
    this.transactionForm = this.fb.group({
      description: ['', Validators.required],
      amount: [null, Validators.required],
      transaction_type: ['', Validators.required],
      category_id: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCategories();

    if (this.transaction) {
      this.transactionForm.patchValue(this.transaction);
    }
  }

  loadCategories(): void {
    this.http.get<Category[]>('http://127.0.0.1:8000/api/categories').subscribe({
      next: (data: Category[]) => {
        this.categories = data || []; 
      },
      error: err => {
        console.error('Erro ao carregar categorias', err);
        this.categories = []; 
      }
    });
  }

  submitForm() {
    if (this.transactionForm.valid) {
      const transactionData = this.transactionForm.value;
      transactionData.amount = transactionData.transaction_type === 'expense' ? -Math.abs(transactionData.amount) : Math.abs(transactionData.amount);

      if (this.transaction) {
        this.http.put(`http://127.0.0.1:8000/api/transactions/${this.transaction.id}`, transactionData).subscribe({
          next: () => {
            this.formSubmitted.emit();
            this.transactionForm.reset();
            this.activeModal.close(); // Close the modal
          },
          error: err => console.error('Erro ao editar transação', err),
        });
      } else {
        this.http.post('http://127.0.0.1:8000/api/transactions', transactionData).subscribe({
          next: () => {
            this.formSubmitted.emit();
            this.transactionForm.reset();
            this.activeModal.close(); // Close the modal
          },
          error: err => console.error('Erro ao salvar transação', err),
        });
      }
    } else {
      console.log('Formulário inválido!');
    }
  }
}
