<?php

require_once(__DIR__ . '/db.php');

$schema = file_get_contents(__DIR__ . '/../../db/schema.sql');

try{
    $pdo->exec($schema);
    echo "Schema created successfully";
} catch (PDOException $e){
    echo "Schema creation failed: " . $e->getMessage();
}