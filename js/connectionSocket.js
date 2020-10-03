import {getCookie} from './getCookie.js';

function getConnection() {
    const sendBtn = document.getElementById('sendBtn');
    const input = document.getElementById('chatInput');
    const user = getCookie('user');
    const hash = getCookie('hash');

    if (!user || !hash) return;

    class ConnectionData {
        constructor (type, user, hash, data = '') {
            this.type = type;
            this.user = user;
            this.hash = hash;
            this.data = data;
        }
    }

    class MessageData {
        constructor (type, user, hash, message, chat, to = null) {
            this.type = type;
            this.user = user;
            this.hash = hash;
            this.message = message;
            this.chat = chat;
            this.to = to;
        }
    }

    let connection = new WebSocket('ws://127.0.0.1:8080');

    connection.addEventListener('open', function() {
        console.log('connection open');
        connection.send(JSON.stringify(new ConnectionData('connection', user, hash)));
    });

    connection.addEventListener('message', function(event) {
        try {
            let obj = JSON.parse(event.data);

            switch (obj.type) {
                case 'message' :
                        try {
                            const message = JSON.parse(event.data);
                            console.log(message);
                        } catch (error) {
                            console.log(error);
                        }
                    break;
                default:
                    return;    
            }
        } catch (error) {
            console.log(error);
        }
    });

    connection.addEventListener('close', function() {
        console.log('connection close');
    });

    connection.addEventListener('error', function() {

    });

    
    sendBtn.addEventListener('click', function() {
        if (input.value.length === 0 || input.value.length > 1000) return;
        const chat = document.querySelector('.chat')['data-chat'];
        const to = document.querySelector('.chat')['data-to'];
        const text = input.value;
        const dataObj = new MessageData('message', user, hash, text, chat, to);
        input.value = '';
        
        connection.send(JSON.stringify(dataObj));
    });

    return connection;
}    

export {
    getConnection
}