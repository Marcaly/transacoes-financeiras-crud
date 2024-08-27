<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller; 

class CategoryController extends Controller
{
    public function index()
{
    $categories = Category::all();

    if ($categories->isEmpty()) {
        return response()->json(['message' => 'Nenhuma categoria encontrada'], 404);
    }

    return response()->json($categories);
}

}
