<?php
include("../../conexao.php");

$id = $_POST["id"];
$nome = $_POST["nome"];
$preco = $_POST["preco"];

$sql = "UPDATE servicos 
        SET nome='$nome', preco='$preco'
        WHERE id=$id";

echo $conn->query($sql) ? "ok" : "erro";
?>