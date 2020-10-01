import {getCookie} from './getCookie.js';

function chatConnection(chat = false) {
    console.log(chat);
    
    class Connection {
        constructor(type, message = '', chat, from, to) {
            this.type = type;
            this.chat = chat;
            this.to = to;
            this.from = from;
            this.message = message;
        }
    }

    let connection = new WebSocket('ws://127.0.0.1:8080');

    connection.addEventListener('open', function() {
        
    });

    connection.addEventListener('message', function() {

    });

    connection.addEventListener('close', function() {

    });

    connection.addEventListener('error', function() {

    });
}

export {
    chatConnection
}