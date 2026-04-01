<?php
include("../../conexao.php");

$sql = "SELECT 
          agendamentos.*,
          pets.nome AS pet,
          clientes.nome AS cliente,
          servicos.nome AS servico
        FROM agendamentos
        LEFT JOIN pets ON agendamentos.id_pet = pets.id
        LEFT JOIN clientes ON pets.id_cliente = clientes.id
        LEFT JOIN servicos ON agendamentos.id_servico = servicos.id";

$result = $conn->query($sql);

$dados = [];

while($row = $result->fetch_assoc()) {
    $dados[] = $row;
}

echo json_encode($dados);
?>