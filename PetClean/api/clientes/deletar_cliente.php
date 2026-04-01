<?php
include("../../conexao.php");

$id = $_POST["id"];

$sql = "DELETE FROM clientes WHERE id=$id";

if ($conn->query($sql)) {
    echo "ok";
} else {
    echo "erro";
}
?>