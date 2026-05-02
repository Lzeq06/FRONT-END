<?php
include("../../conexao.php");

$nome = $_POST["nome"];
$raca = $_POST["raca"];
$idade = $_POST["idade"];
$id_cliente = $_POST["id_cliente"];

$sql = "INSERT INTO pets (nome, raca, idade, id_cliente)
        VALUES ('$nome','$raca','$idade','$id_cliente')";

echo $conn->query($sql) ? "ok" : "erro";
?>