<?php

    /*
        err1 - пароли
        err2 - пустые значения
        err3 - логин существует
        err4 - емэйл существует
        err5 - ошибка бд
    */

    require_once("salt.php");
    require_once("login.php");
    $connection_to_db = new mysqli($hn, $un, $pw, $db);

    $name            = strtolower($_POST["name"]);
    $surname         = strtolower($_POST["surname"]);
    $login           = strtolower($_POST["login"]);
    $email           = strtolower($_POST["email"]);
    $country         = strtolower($_POST["country"]);
    $password        = $_POST["password"];
    $confirmPassword = $_POST["confirmPassword"];

    if($password != $confirmPassword) {
        die('err1');
    }

    if(
        !isset($name) ||
        !isset($surname) ||
        !isset($login) ||
        !isset($email) ||
        !isset($country) ||
        !isset($password) ||
        !isset($confirmPassword)
    ) {
        die('err2');
    }

    
    $findLoginQuery = "SELECT * FROM Users WHERE Users.Login = '$login'";
    $res = $connection_to_db->query($findLoginQuery);
    $res = $res->fetch_all(MYSQLI_ASSOC);
    if(count($res) > 0) {
        die('err3');
    }

    $findEmailQuery = "SELECT * FROM Users WHERE Users.Email = '$email'";
    $res = $connection_to_db->query($findEmailQuery);
    $res = $res->fetch_all(MYSQLI_ASSOC);
    if(count($res) > 0) {
        die('err4');
    }

    $pwHash = md5($password . $_salt);

    $regUserQuery = "INSERT INTO Users (Login, Password, Email, Name, Surname, Country) VALUES ('$login', '$pwHash', '$email', '$name', '$surname', '$country')";

    if($connection_to_db->query($regUserQuery)) {
        die('ok');
    }else {
        die('err5');
    }
?>