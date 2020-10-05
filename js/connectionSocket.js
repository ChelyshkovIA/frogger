import {getCookie} from './getCookie.js';
import {loadMail} from './loadMail.js';

function getConnection() {
    const sendBtn = document.getElementById('sendBtn');
    const input = document.getElementById('chatInput');
    const mailMenu = document.querySelector('.mail-block');
    const dialogsBlock = document.querySelector('.mess-block');
    const chat = document.querySelector('.chat');
    let chatMessBlock = document.querySelector('.chat__mess-block');

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

                            if (mailMenu.classList.contains('mail-block--active')) {
                                
                                let dialog = document.querySelector(`.dialog[data-chat="${message.chat}"]`);
                                if (dialog) {
                                    dialogsBlock.prepend(dialog);
                                    dialog.querySelector('.dialog__text').innerText = message.message;
                                } else {
                                    loadMail();
                                }


                                
                                if (chat.classList.contains('chat--active') && (chat.dataset.chat == message.chat || chat.dataset.chat == 'null')) {
                                    if(chatMessBlock.classList.contains('chat__mess-block--empty')) {
                                        chatMessBlock.children[0].remove();
                                        chatMessBlock.classList.remove('chat__mess-block--empty');
                                    }
                                    let mess = document.createElement('article');
                                    mess.className = 'chat__mess mess';
                                    mess.classList.add(`${message.from == user ? 'mess--right' : 'mess--left'}`);

                                    let messBody = document.createElement('div');
                                    messBody.className = 'mess-body';

                                    let text = document.createElement('p');
                                    text.className = 'mess__text';

                                    let time = document.createElement('div');
                                    time.className = 'mess__time';

                                    text.append(message.message);
                                    time.append('null');

                                    messBody.append(text);
                                    messBody.append(time);
                                    mess.append(messBody);

                                    chatMessBlock.append(mess);
                                    chatMessBlock.scrollTo(0, chatMessBlock.scrollHeight);
                                }
                            }
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
        const chat = document.querySelector('.chat').dataset.chat;
        const to = document.querySelector('.chat').dataset.to;
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