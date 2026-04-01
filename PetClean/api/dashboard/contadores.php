<?php
include("../../conexao.php");

$clientes = $conn->query("SELECT COUNT(*) as total FROM clientes")->fetch_assoc()["total"];
$pets = $conn->query("SELECT COUNT(*) as total FROM pets")->fetch_assoc()["total"];
$servicos = $conn->query("SELECT COUNT(*) as total FROM servicos")->fetch_assoc()["total"];
$agendamentos = $conn->query("SELECT COUNT(*) as total FROM agendamentos")->fetch_assoc()["total"];

echo json_encode([
    "clientes" => $clientes,
    "pets" => $pets,
    "servicos" => $servicos,
    "agendamentos" => $agendamentos
]);
?>