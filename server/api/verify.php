<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Authorization, Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
    http_response_code(200);
    exit();
}

require_once(__DIR__ . '/../config/db.php');
require_once(__DIR__ . '/../vendor/autoload.php');

$dotenv = parse_ini_file(__DIR__ . '/../.env');
$secretKey = $dotenv['JWT_SECRET'];

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
if(!str_starts_with($authHeader, 'Bearer ')){
    http_response_code(401);
    echo json_encode(['error' => 'Missing or invalid Authorization header']);
    exit;
}

$jwt = trim(str_replace('Bearer', '', $authHeader));

try{
    $decoded = JWT::decode($jwt, new Key($secretKey, 'HS256'));
    echo json_encode([
        'user_id' => $decoded->sub,
        'role' => $decoded->role
    ]);
} catch (Exception $e) {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid token']);
}