<?php
include("../../conexao.php");

$id = $_POST["id"];

$sql = "DELETE FROM agendamentos WHERE id=$id";

echo $conn->query($sql) ? "ok" : "erro";
?>