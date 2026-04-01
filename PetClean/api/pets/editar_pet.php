<?php
include("../../conexao.php");

$sql = "SELECT pets.*, clientes.nome AS dono
        FROM pets
        JOIN clientes ON pets.id_cliente = clientes.id";

$result = $conn->query($sql);

$dados = [];

while ($row = $result->fetch_assoc()) {
    $dados[] = $row;
}

echo json_encode($dados);
?>