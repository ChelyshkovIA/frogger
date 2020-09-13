<?php
    require_once("login.php");
    $connection_to_db = new mysqli($hn, $un, $pw, $db);

    $hash      = $_COOKIE["hash"];
    $follower  = strtolower($_COOKIE["user"]);
    $following = strtolower($_POST["user"]);

    $checkUserQuery = "SELECT * FROM Users WHERE Users.Login = '$follower' AND Users.Hash = '$hash'";
    $res = $connection_to_db->query($checkUserQuery);
    $res = $res->fetch_all(MYSQLI_ASSOC);

    if(count($res) == 1) {
        $idFollower = $res[0]["Id"];

        $getFollowingId = "SELECT Id FROM Users WHERE Users.Login = '$following'";
        $res = $connection_to_db->query($getFollowingId);
        $res = $res->fetch_all(MYSQLI_ASSOC);

        $idFollowing = $res[0]["Id"];

        $checkFollowingQuery = "SELECT * FROM Followers WHERE Followers.IdFollower = '$idFollower' AND Followers.IdFollowing = '$idFollowing'";
        $res = $connection_to_db->query($checkFollowingQuery);
        $res = $res->fetch_all(MYSQLI_ASSOC);
        if(count($res) == 1) {
            $unFollowQuery = "DELETE FROM Followers WHERE Followers.IdFollower = '$idFollower' AND Followers.IdFollowing = '$idFollowing'";
            if($connection_to_db->query($unFollowQuery)) {
                die('delete');
            }else {
                die('err');
            }
        }else if(count($res) == 0) {
            $toFollowQuery = "INSERT INTO Followers (IdFollower, IdFollowing) VALUES ('$idFollower', '$idFollowing')";
            if($connection_to_db->query($toFollowQuery)) {
                die('add');
            }else {
                die('err');
            }
        }

    }else {
        die('err');
    }
?>