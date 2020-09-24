<?php
    require_once("login.php");
    $connection_to_db = new mysqli($hn, $un, $pw, $db);

    $user = $_COOKIE['user'];
    $hash = $_COOKIE['hash'];

    $connection_to_db->query("SET NAMES utf8");

    if(isset($_COOKIE['user']) && isset($_COOKIE['hash'])) {
        $checkUserQuery = "SELECT * FROM Users WHERE Users.Login = '$user' AND Users.Hash = '$hash'";
        $res = $connection_to_db->query($checkUserQuery);
        $res = $res->fetch_all(MYSQLI_ASSOC);
        if(count($res) == 1) {
            $getChatsQuery = 
           "SELECT Chats.Id, Users.Name, Users.Surname, Users.Login, Messages.Text, Messages.DateTime, UsersFrom.Name AS UserFromName, UsersFrom.Surname AS UserFromSurname, UsersDialogName.Name AS DialogName, UsersDialogName.Surname AS DialogSurname   
            FROM Users
            INNER JOIN ChatsUsers ON Users.Id = ChatsUsers.IdUser
            INNER JOIN Chats ON Chats.Id = ChatsUsers.IdChat
            INNER JOIN Messages ON Chats.Id = Messages.IdChat
            INNER JOIN Users as UsersFrom ON UsersFrom.Id = Messages.IdUser
            INNER JOIN ChatsUsers as ChatsUsersDialogName ON ChatsUsersDialogName.IdChat = Chats.Id
            INNER JOIN Users as UsersDialogName ON UsersDialogName.Id = ChatsUsersDialogName.IdUser
            where UsersDialogName.Login <> Users.Login AND Users.Login = '$user' AND Users.Hash = '$hash' AND Messages.Id in (
                SELECT MAX(messages.id) from Chats
                inner join ChatsUsers on Chats.Id = ChatsUsers.IdChat
                inner join Users on Users.Id = ChatsUsers.IdUser
                inner join Messages on Messages.IdChat = Chats.Id
                where Users.Login = '$user' AND Users.Hash = '$hash' group by Chats.Id
            ) group by Chats.Id";

            $res = $connection_to_db->query($getChatsQuery);
            $res = $res->fetch_all(MYSQLI_ASSOC);

            if(count($res) == 0) {
                $resp = [
                    "status" => "ok",
                    "body" => []
                ];

                die(json_encode($resp));        
            }

            $resp = [
                "status" => "ok",
                "body" => $res
            ];

            die(json_encode($resp));            
        }
    }

?>