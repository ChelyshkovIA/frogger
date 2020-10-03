<?php
    function _updateUserState ($db_connection, $user, $state) {
        $query = 
        "UPDATE Users SET Users.State = '$state' WHERE Users.Login = '$user'";
        return $db_connection->query($query);
    }
?>