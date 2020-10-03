<?php
    require_once __DIR__ . '\..\vendor\autoload.php';
    require_once 'login.php';
    require_once 'checkUser.php';
    require_once 'updateUserState.php';
    require_once 'updateMessages.php';
    require_once 'sendMessage.php';

    $connection_to_db = new mysqli($hn, $un, $pw, $db);
    $users = [];
    
    use Workerman\Worker;
    
    $ws_worker = new Worker("websocket://127.0.0.1:8080");

    $ws_worker->onWorkerStart = function() use (&$users){
        global $connection_to_db;
    };
    
    $ws_worker->onConnect = function($connection) use (&$users){
        global $connection_to_db;
    };
    
    $ws_worker->onMessage = function($connection, $data) use (&$users){
        global $connection_to_db;

        $data = json_decode($data);

        switch ($data->type) {
            case 'connection' :
                if (_checkUser($connection_to_db, $data->user, $data->hash)) {
                    $users[$data->user] = $connection;
                    _updateUserState($connection_to_db, $data->user, 1);
                }
                else {
                    $connection->close();    
                }
            break;

            case 'message' :
                $chat = _updateMessages($connection_to_db, $data->message, $data->chat, $data->user, $data->to);

                if ($chat) {
                    _sendMessage($connection_to_db, $chat, $data->user, $data->message, $users);
                } else {
                    echo 'false';
                }
            break;    

            default :
            return;
        }
    }; 

    $ws_worker->onClose = function($connection) use (&$users){ 
        global $connection_to_db;

        $user = array_search($connection, $users);
        unset($users[$user]);
        _updateUserState($connection_to_db, $user, 0);
    };

    Worker::runAll();
?>