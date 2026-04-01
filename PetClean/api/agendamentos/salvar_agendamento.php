<?php
include("../../conexao.php");

$data = $_POST["data"];
$hora = $_POST["hora"];
$id_pet = $_POST["id_pet"];
$id_servico = $_POST["id_servico"];

$sql = "INSERT INTO agendamentos (data, hora, id_pet, id_servico)
        VALUES ('$data','$hora','$id_pet','$id_servico')";

echo $conn->query($sql) ? "ok" : "erro";
?>