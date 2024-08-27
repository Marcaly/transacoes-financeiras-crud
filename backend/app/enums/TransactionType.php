<?php

namespace App\enums;

enum TransactionType: string {
    case Expense = 'expense';
    case Revenue = 'revenue';
}
