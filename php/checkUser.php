<?php
    function _checkUser ($db_connection, $user, $hash) {
        $query = 
        "SELECT Users.Id FROM Users WHERE Users.Login = '$user' AND Users.Hash = '$hash'";
        $res = $db_connection->query($query);
        if ($res) {
            $res = $res->fetch_all(MYSQLI_ASSOC);
            if (count($res) == 1) 
                return true;
            else
                return false;    
        }
        return false;
    }
?>