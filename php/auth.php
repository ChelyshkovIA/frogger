<?php
    function generateCode($length = 6) {
        $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHI JKLMNOPRQSTUVWXYZ0123456789';
        $code = '';
        $clen = strlen($chars) - 1;
        while (strlen($code) < $length) {
                $code .= $chars[mt_rand(0,$clen)];
        }
        return $code;
    }

    setcookie('hash', $hash, time() - 3600, '/');
    setcookie('user', $user, time() - 3600, '/');

    require_once("salt.php");
    require_once("login.php");

    $connection_to_db = new mysqli($hn, $un, $pw, $db);

    $login = strtolower($_POST["login"]);
    $password = ($_POST["password"]);

    if(
        !isset($login) ||
        !isset($password)
    ) {
        $resp = ['status' => 'err1'];
        die(json_encode($resp));
    }

    $pwHash = md5($password . $_salt);

    $userQuery = "SELECT * FROM Users WHERE Users.Login = '$login' AND Users.Password = '$pwHash'";

    $res = $connection_to_db->query($userQuery);

    $res = $res->fetch_all(MYSQLI_ASSOC);

    if(count($res) == 1) {
        $hash = md5(generateCode(10));
        $updateUserReq = "UPDATE Users SET Users.Hash = '$hash' WHERE Users.Login = '$login'";
        if($connection_to_db->query($updateUserReq)) {
            setcookie('user', $login, time() + 3600 , '/');
            setcookie('hash', $hash, time() + 3600, '/');
            $resp = [
                'status' => 'ok',
                'login' => $login
            ];

            die(json_encode($resp));
        }else {
            $resp = ['status' => 'err2'];
            die(json_encode($resp));
        }
    }else {
        $resp = ['status' => 'err3'];
        die(json_encode($resp));
    }
?>