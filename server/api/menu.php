<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

require_once(__DIR__ . '/../config/db.php');

header("Content-Type: application/json");

try{
    $stmt = $pdo->prepare("SELECT * FROM menu_items");
    $stmt->execute();

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($result);
} catch (PDOException $e){
    http_response_code(500);
    echo json_encode(['error' => 'Failed fecthing menu: ' . $e->getMessage()]);
    exit;
}