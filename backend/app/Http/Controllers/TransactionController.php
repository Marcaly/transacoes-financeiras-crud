<?php

namespace App\Http\Controllers;

use App\Enums\TransactionType;
use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $query = Transaction::with('category');
    
        if ($request->has('transaction_type')) {
            $query->where('transaction_type', $request->transaction_type);
        }
    
        $transactions = $query->get();
        return response()->json($transactions);
    }
    public function store(Request $request)
    {
        $request->validate([
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric',
            'transaction_type' => ['required', function ($attribute, $value, $fail) {
                if (!TransactionType::tryFrom($value)) {
                    $fail('Invalid transaction type.');
                }
            }],
            'category_id' => 'required|exists:categories,id',
        ]);

        $transaction = Transaction::create([
            'description' => $request->description,
            'amount' => $request->amount,
            'transaction_type' => TransactionType::from($request->transaction_type),
            'category_id' => $request->category_id,
        ]);

        return response()->json($transaction, 201);
    }

    public function show($id)
    {
        // Carrega a transação junto com a categoria associada
        $transaction = Transaction::with('category')->find($id);

        if (!$transaction) {
            return response()->json(['message' => 'Transaction not found'], 404);
        }

        return response()->json($transaction);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'description' => 'string|max:255',
            'amount' => 'numeric',
            'transaction_type' => ['sometimes', function ($attribute, $value, $fail) {
                if (!TransactionType::tryFrom($value)) {
                    $fail('Invalid transaction type.');
                }
            }],
            'category_id' => 'exists:categories,id',
        ]);

        $transaction = Transaction::find($id);

        if (!$transaction) {
            return response()->json(['message' => 'Transaction not found'], 404);
        }

        $transaction->update([
            'description' => $request->description ?? $transaction->description,
            'amount' => $request->amount ?? $transaction->amount,
            'transaction_type' => $request->transaction_type 
                ? TransactionType::from($request->transaction_type) 
                : $transaction->transaction_type,
            'category_id' => $request->category_id ?? $transaction->category_id,
        ]);

        return response()->json($transaction);
    }

    public function destroy($id)
    {
        $transaction = Transaction::find($id);

        if (!$transaction) {
            return response()->json(['message' => 'Transaction not found'], 404);
        }

        $transaction->delete();
        return response()->json(['message' => 'Transaction deleted successfully']);
    }
}
