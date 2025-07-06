<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
    http_response_code(200);
    exit;
}

require_once(__DIR__ . '/../config/db.php');

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if(!$data){
    http_response_code(400);
    echo json_encode(["error" => "Invalid or empty JSON"]);
    exit;
}

if(!isset($data['firstName'], $data['lastName'], $data['email'], $data['password'])){
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

$first_name = $data['firstName'];
$last_name = $data['lastName'];
$email = $data['email'];
$password_hash = password_hash($data['password'], PASSWORD_DEFAULT);

try{
    $stmt = $pdo->prepare("INSERT INTO users (first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)");
    $stmt->execute([$first_name, $last_name, $email, $password_hash]);

    echo json_encode(['message' => 'User registered successfully']);
} catch (PDOException $e){
    http_response_code(500);
    echo json_encode(['error' => 'Registration failed: ' . $e->getMessage()]);
    exit;
}