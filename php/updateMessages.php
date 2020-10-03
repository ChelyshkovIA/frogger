<?php 
    function _updateMessages($db_connection, $message, $chat, $from, $to) {
        if ($chat != null) {
            $query = 
            "INSERT INTO Messages (IdChat, IdUser, Text) VALUES (
                '$chat', 
                (SELECT Users.Id FROM Users WHERE Users.Login = '$from'), 
                '$message'
            )";

            if ($db_connection->query($query)) {
                return $chat;
            }

            return false;
        } else {
            $query = 
            "SELECT Users.Id FROM Users WHERE Users.Login = '$from'";
            $res = $db_connection->query($query);
            $res = $res->fetch_all(MYSQLI_ASSOC);
            $idFrom = $res[0]['Id'];

            $query = 
            "SELECT Users.Id FROM Users WHERE Users.Login = '$to'";
            $res = $db_connection->query($query);
            $res = $res->fetch_all(MYSQLI_ASSOC);
            $idTo = $res[0]['Id'];

            $query = 
            "INSERT INTO Chats (Creater) VALUES ('$idFrom')";

            $db_connection->query($query);

            $query = 
            "SELECT MAX(Chats.Id) AS Id FROM Chats WHERE Chats.Creater = '$idFrom'";

            $res = $db_connection->query($query);
            $res = $res->fetch_all(MYSQLI_ASSOC);
            $chatId = $res[0]['Id'];

            if ($chatId) {
                $query = 
                "INSERT INTO ChatsUsers (IdChat, IdUser) VALUES 
                ('$chatId','$idFrom'),
                ('$chatId', '$idTo')";

                $db_connection->query($query);

                $query = 
                "INSERT INTO Messages (idChat, idUser, Text) VALUES 
                ('$chatId', '$idFrom', '$message')";

                if ($db_connection->query($query)) return $chatId;
                return false;
            }

            return false;
        }
    }
?>