<?php
include("../../conexao.php");

$nome = $_POST["nome"];
$telefone = $_POST["telefone"];
$email = $_POST["email"];

$sql = "INSERT INTO clientes (nome, telefone, email)
        VALUES ('$nome', '$telefone', '$email')";

echo $conn->query($sql) ? "ok" : "erro";