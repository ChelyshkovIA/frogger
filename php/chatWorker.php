<?php

    require_once __DIR__ . '\..\vendor\autoload.php';
    require_once 'login.php';
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
    }; 

    $ws_worker->onClose = function($connection) use (&$users){ 
        global $connection_to_db;
    };

    Worker::runAll();
?>