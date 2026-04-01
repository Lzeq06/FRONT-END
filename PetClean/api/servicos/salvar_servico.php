<?php
include("../../conexao.php");

$nome = $_POST["nome"];
$preco = $_POST["preco"];

$sql = "INSERT INTO servicos (nome, preco)
        VALUES ('$nome','$preco')";

echo $conn->query($sql) ? "ok" : "erro";
?>