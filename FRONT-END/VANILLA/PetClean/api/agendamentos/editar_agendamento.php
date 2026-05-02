<?php
include("../../conexao.php");

$id = $_POST["id"];
$data = $_POST["data"];
$hora = $_POST["hora"];
$id_pet = $_POST["id_pet"];
$id_servico = $_POST["id_servico"];

$sql = "UPDATE agendamentos 
        SET data='$data', hora='$hora', id_pet='$id_pet', id_servico='$id_servico'
        WHERE id=$id";

echo $conn->query($sql) ? "ok" : "erro";
?>