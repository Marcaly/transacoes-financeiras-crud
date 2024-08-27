<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Category;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Category::insert([
            ['name' => 'Aluguel'],
            ['name' => 'Pagamento'],
            ['name' => 'Prolabore'],
            ['name' => 'Investimentos'],
            ['name' => 'Educação'],
            ['name' => 'Saúde'],
            ['name' => 'Lazer'],
            ['name' => 'Transporte'],
            ['name' => 'Alimentação'],
            ['name' => 'Outros']
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
