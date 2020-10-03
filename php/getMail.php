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
           "SELECT Chats.Id AS ChatId, Users.Name, Users.Surname, Users.Login, Messages.Text, Messages.DateTime, Messages.Id AS MessId, UsersFrom.Name AS UserFromName, UsersFrom.Surname AS UserFromSurname, UsersDialogName.Name AS DialogName, UsersDialogName.Surname AS DialogSurname   
            FROM Users
            INNER JOIN ChatsUsers ON Users.Id = ChatsUsers.IdUser
            INNER JOIN Chats ON Chats.Id = ChatsUsers.IdChat
            INNER JOIN Messages ON Chats.Id = Messages.IdChat
            INNER JOIN Users AS UsersFrom ON UsersFrom.Id = Messages.IdUser
            INNER JOIN ChatsUsers AS ChatsUsersDialogName ON ChatsUsersDialogName.IdChat = Chats.Id
            INNER JOIN Users AS UsersDialogName ON UsersDialogName.Id = ChatsUsersDialogName.IdUser
            WHERE UsersDialogName.Login <> Users.Login AND Users.Login = '$user' AND Users.Hash = '$hash' AND Messages.Id IN (
                SELECT MAX(Messages.id) FROM Chats
                INNER JOIN ChatsUsers ON Chats.Id = ChatsUsers.IdChat
                INNER JOIN Users ON Users.Id = ChatsUsers.IdUser
                INNER JOIN Messages ON Messages.IdChat = Chats.Id
                WHERE Users.Login = '$user' AND Users.Hash = '$hash' GROUP BY Chats.Id
            ) GROUP BY Chats.Id ORDER BY MessId DESC";

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