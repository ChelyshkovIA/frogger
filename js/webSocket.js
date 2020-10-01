function getConnection() {
    let connection = new WebSocket('ws://127.0.0.1:8080');

    connection.addEventListener('open', function() {
        console.log('connection open');
    });

    connection.addEventListener('message', function(event) {
        console.log(event.data);
    });

    connection.addEventListener('close', function() {
        console.log('connection close');
    });

    connection.addEventListener('error', function() {

    });

    return connection;
}    

export {
    getConnection
}