<?php
    require_once("login.php");
    $connection_to_db = new mysqli($hn, $un, $pw, $db);

    if(!isset($_GET["user"])) {
        $resp = [
            "status" => "err1"
        ];

        die(json_encode($resp));
    }

    $user = strtolower($_GET["user"]);
    $cookieUser = strtolower($_COOKIE["user"]);
    
    $getUserInfoQuery = "SELECT Id, Country, Login, Name, Surname FROM Users WHERE Users.Login = '$user'";
    $res = $connection_to_db->query($getUserInfoQuery);
    $res = $res->fetch_all(MYSQLI_ASSOC);
    $userId = $res[0]["Id"];
    $userInfo = $res;

    $getFollowersQuery = "SELECT * FROM Followers WHERE Followers.IdFollowing = '$userId'";
    $getFollowingsQuery = "SELECT * FROM Followers WHERE Followers.IdFollower = '$userId'";
    $getPhotos = "SELECT Id FROM PostsPhotos WHERE PostsPhotos.IdUser = '$userId'";
    $getPosts = "SELECT Id FROM Posts WHERE Posts.IdUser = '$userId'";
    $getChatsWithUser = 
    "SELECT Chats.Id FROM Chats
    INNER JOIN ChatsUsers AS ChatsUsersFrom ON Chats.Id = ChatsUsersFrom.IdChat
    INNER JOIN Users AS UsersFrom ON ChatsUsersFrom.IdUser = UsersFrom.Id
    INNER JOIN ChatsUsers AS ChatsUsersTo ON Chats.Id = ChatsUsersTo.IdChat
    INNER JOIN Users AS UsersTo ON ChatsUsersTo.IdUser = UsersTo.Id
    WHERE UsersTo.Login = '$user' AND UsersFrom.Login = '$cookieUser'";

    $res = $connection_to_db->query($getFollowersQuery);
    $res = $res->fetch_all(MYSQLI_ASSOC);
    $followers = count($res);

    $res = $connection_to_db->query($getFollowingsQuery);
    $res = $res->fetch_all(MYSQLI_ASSOC);
    $followings = count($res);

    $res = $connection_to_db->query($getPhotos);
    $res = $res->fetch_all(MYSQLI_ASSOC);
    $photos = count($res);

    $res = $connection_to_db->query($getPosts);
    $res = $res->fetch_all(MYSQLI_ASSOC);
    $posts = count($res);

    $res = $connection_to_db->query($getChatsWithUser);
    $res = $res->fetch_all(MYSQLI_ASSOC);
    $chat = $res;

    $resp = [
        "status" => "ok",
        "info" => $userInfo[0],
        "followers" => $followers,
        "followings" => $followings,
        "photos" => $photos,
        "posts" => $posts,
        "chat" => $chat[0]['Id']
    ];

    if(isset($_COOKIE["hash"])) {
        $hash = $_COOKIE["hash"];
        $checkUserQuery = "SELECT * FROM Users WHERE Users.Login = '$cookieUser' AND Users.Hash = '$hash'";
        $res = $connection_to_db->query($checkUserQuery);
        $res = $res->fetch_all(MYSQLI_ASSOC);
        $personId = $res[0]["Id"];
        if(count($res) == 1) {
            $resp["state"] = "auth";
            if($cookieUser == $user) {
                $resp["page"] = "user";
            }else {
                $resp["page"] = "other";
                $checkFollowingQuery = "SELECT * FROM Followers WHERE Followers.IdFollower = '$personId' AND Followers.IdFollowing = '$userId'";
                $res = $connection_to_db->query($checkFollowingQuery);
                $res = $res->fetch_all(MYSQLI_ASSOC);

                if(count($res) == 1) {
                    $resp["subscribed"] = true;
                }else {
                    $resp["subscribed"] = false;
                }
            }
        }else {
            $resp["state"] = "not auth";
            $resp["page"] = "other";
        }
    }else {
        $resp["state"] = "not auth";
        $resp["page"] = "other";
    }

    die(json_encode($resp));
?>  