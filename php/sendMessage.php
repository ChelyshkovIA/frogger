<?php
    function _sendMessage($db_connection, $chat, $from, $message, $users) {
        $getUsersQuery = 
        "SELECT Users.Login AS Login FROM Users
        INNER JOIN ChatsUsers ON ChatsUsers.IdUser = Users.Id
        INNER JOIN Chats ON Chats.Id = ChatsUsers.IdChat
        WHERE Chats.Id = '$chat'";

        $res = $db_connection->query($getUsersQuery);
        $recievers = $res->fetch_all(MYSQLI_ASSOC);

        $responseObj = [
            "type" => "message",
            "chat" => $chat,
            "from" => $from,
            "message" => $message
        ];

        for ($i = 0; $i < count($recievers); $i++) {
            if (isset($users[$recievers[$i]['Login']])) {
                $users[$recievers[$i]['Login']]->send(json_encode($responseObj));
            }
        }
    }
?>