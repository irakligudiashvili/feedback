<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if($_SERVER['REQUEST_METHOD'] === "OPTIONS"){
    http_response_code(200);
    exit;
}

require_once(__DIR__ . '/../../config/db.php');
require_once(__DIR__ . '/../../vendor/autoload.php');

$dotenv = parse_ini_file(__DIR__ . '/../../.env');
$secret_key = $dotenv['JWT_SECRET'];

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$headers = apache_request_headers();

if(!isset($headers['Authorization'])){
    http_response_code(401);
    echo json_encode(['error' => 'Missing token']);
    exit;
}

$token = str_replace('Bearer ', '', $headers['Authorization']);

try{
    $decoded = JWT::decode($token, new Key($secret_key, 'HS256'));
    $user_id = $decoded->sub;
} catch (Exception $e){
    http_response_code(401);
    echo json_encode(['error' => 'Invalid token']);
    exit;
}

header("Content-type: application/json");

try{
    $stmt = $pdo->prepare("
    SELECT menu_items.id, name, ingredients, price, image_url, quantity 
    FROM menu_items 
    JOIN cart_items ON menu_items.id=menu_item_id 
    WHERE user_id = :user_id
    ");
    $stmt->execute([
        ':user_id' => $user_id
    ]);

    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    error_log(print_r($data, true));
    echo json_encode($data);
} catch (PDOException $e){
    http_response_code(500);
    echo json_encode(['error' => "Couldn't retrieve cart"]);
    exit;
}