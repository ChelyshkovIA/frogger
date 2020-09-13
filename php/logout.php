<?php
    setcookie('hash', $hash, time() - 3600, '/');
    setcookie('user', $user, time() - 3600, '/');
    header('Location: ../index.html');
?>