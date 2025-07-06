<?php

$dotenv = parse_ini_file(__DIR__ . '/../.env');

if(!$dotenv){
    error_log(".env counld not be loaded");
    http_response_code(500);
    echo json_encode(['error' => '.env could not be loaded']);
    exit;
}

$host = $dotenv['DB_HOST'];
$name = $dotenv['DB_NAME'];
$user = $dotenv['DB_USER'];
$pass = $dotenv['DB_PASS'];

try{
    $pdo = new PDO("pgsql:host=$host;port=5432;dbname=$name", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e){
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
    exit;
}