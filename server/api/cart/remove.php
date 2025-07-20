<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
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

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$menu_item_id = $data['menu_item_id'];

if(!$data){
    http_response_code(400);
    echo json_encode(['error' => 'Invalid or empty JSON']);
    exit;
}

try{
    $stmt = $pdo->prepare("DELETE FROM cart_items WHERE menu_item_id = :menu_item_id AND user_id = :user_id");
    $stmt->execute([
        ':menu_item_id' => $menu_item_id,
        ':user_id' => $user_id
    ]);
    
    echo json_encode(['message' => 'Removed item from cart']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => "Couldn't add to art"]);
    exit;
}