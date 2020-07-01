<?php
$_POST = json_decode(file_get_contents("php://input"), true);
echo var_dump($_POST); //берет данные с клиента, преращает в строку и возвращает на клиенте