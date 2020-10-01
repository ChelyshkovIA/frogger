<?php
    require_once("login.php");
    $connection_to_db = new mysqli($hn, $un, $pw, $db);

    $user = $_COOKIE['user'];
    $hash = $_COOKIE['hash'];

    if(
        !isset($user) ||
        !isset($hash)
    ) {
        $resp = [
            "status" => "err1"
        ];
        die(json_encode($resp));
    }

    $chat = '';
    $loadChatQuery = '';
    $companionLogin = '';

    if($_GET['chat'] != 'null') {
        $chat = $_GET['chat'];
        
    }else {
        $userToLogin = $_GET['companion'];
        $getChatQuery = 
        "SELECT Chats.Id FROM Chats
        INNER JOIN ChatsUsers AS ChatsUsersFrom ON Chats.Id = ChatsUsersFrom.IdChat
        INNER JOIN ChatsUsers AS ChatsUsersTo ON Chats.Id = ChatsUsersTo.IdChat
        INNER JOIN Users AS UsersFrom ON UsersFrom.Id = ChatsUsersFrom.IdUser
        INNER JOIN Users AS UsersTo ON UsersTo.Id = ChatsUsersTo.IdUser
        WHERE UsersFrom.Login = '$user' AND UsersFrom.hash = '$hash' AND UsersTo.Login = '$userToLogin'";

        $res = $connection_to_db->query($getChatQuery);
        $res = $res->fetch_all(MYSQLI_ASSOC);
        $chat = $res[0]['Id'];

        if(count($res) == 0) {
            $resp = [
                "status" => 'no chat',
                "body" => []
            ];

            die(json_encode($resp));
        }
    }
    
    $loadChatQuery = 
    "SELECT 
    Companion.Login AS Companion,
    Messages.Text as MessText,
    Messages.DateTime as DateTime,
    Chats.Id AS ChatId
        FROM Messages 
        INNER JOIN Users AS Companion ON Companion.Id = Messages.IdUser
        INNER JOIN Chats ON Messages.IdChat = Chats.Id
        INNER JOIN ChatsUsers ON Chats.Id = ChatsUsers.IdChat
        INNER JOIN Users AS UserAcc ON UserAcc.Id = ChatsUsers.IdUser
        WHERE UserAcc.Login = '$user' AND UserAcc.Hash = '$hash' AND Chats.Id = '$chat'"
    ;

    $res = $connection_to_db->query($loadChatQuery);
    $res = $res->fetch_all(MYSQLI_ASSOC);
    if($res) {
        $resp = [
            "status" => "ok",
            "body" => $res,
            "user" => $user,
            "chat" => $chat
        ];
        die(json_encode($resp));
    }
    
    $resp = [
        "status" => "err2",
        "body" => $res,
        "str" => $loadChatQuery 
    ];

    die(json_encode($resp));
?>