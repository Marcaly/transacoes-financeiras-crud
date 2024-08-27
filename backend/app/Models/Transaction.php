<?php

namespace App\Models;

use App\Enums\TransactionType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = ['description', 'amount', 'transaction_type', 'category_id'];

    protected $casts = [
        'transaction_type' => TransactionType::class,
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
