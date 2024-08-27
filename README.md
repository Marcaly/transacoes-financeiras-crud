# Transações financeiras

## Visão Geral

Este projeto é uma aplicação para gerenciamento de transações financeiras, desenvolvida com Laravel para o backend e Angular para o frontend. 

## Versões utilizadas: 

* PHP 8.3.10 
* Laravel 11.21.0
* Angular 17.3.8 
* MySQL

## Configuração do projeto

Criar o Banco de Dados

Abra o cmd e navegue até o diretorio "banco", em seguida execute o seguinte comando SQL para criar o banco de dados e as tabelas (troque root pelo seu usuário mysql):

`` mysql -u root -p < scripts_database.sql ``

Ou crie um banco de dados e utilize o seguinte comando para rodar as migrations (necessita configurar o ambiente backend primeiro)

`` php artisan migrate ``

### 2. Configuração do Backend PHP (Laravel)

Configurar o Ambiente

Instalar Dependências: Navegue até o diretório do projeto backend e execute:

`` composer install `` 

Edite o arquivo .env e configure as variáveis de ambiente para conectar ao seu banco de dados: (troque root e sua senha por seu usuario e senha mysql)
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=cruduitec
DB_USERNAME=root
DB_PASSWORD=sua_senha
```

Após isso, o backend estará pronto para ser executado com o comando: 

`` php artisan serve ``

### 3. Configuração do Frontend Angular

Instalar dependências do projeto frontend e execute: 

`` npm install `` 

Rodar a aplicação angular com o comando:

`` ng serve ``

O servidor estará disponível em http://localhost:4200.
