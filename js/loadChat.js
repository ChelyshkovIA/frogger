import {validateWord} from './validateWordUpper.js';
import {clearMessList} from './clearMessList.js';
// import {chatConnection} from './chatConnection.js';
// import {getCookie} from './getCookie';

function loadChat(item, mailBlock, chat, dialogName, login = '') {
    console.log(item);
    let messBlock = chat.querySelector('.chat__mess-block');

    clearMessList(messBlock);

    mailBlock.classList.add('mail-block--chat-active');
    chat.classList.add('chat--active');
    chat.dataset.chat = item.ChatId;
    chat['data-to'] = item.To;
    dialogName.innerText = '';
    dialogName.append(`${validateWord(item.DialogName)} ${validateWord(item.DialogSurname)}`);

    let loadIndicator = document.createElement('div');
    loadIndicator.className = 'chat__loading-indicator';
    messBlock.append(loadIndicator);

    let loadChatReq = new XMLHttpRequest();
    let url = `../php/loadChat.php?chat=${item.ChatId}&companion=${login}`;
    loadChatReq.open('POST', url);
    loadChatReq.send();

    loadChatReq.addEventListener('load', function() {
        loadIndicator.remove();
        try {
            let messageArr = JSON.parse(this.responseText);
            switch(messageArr.status) {
                case 'ok':
                    messageArr.body.forEach(mess => {
                        let message = document.createElement('article');
                        message.className = 'chat__mess mess';

                        let messBody = document.createElement('div');
                        messBody.className = 'mess-body';

                        let text = document.createElement('p');
                        text.className = 'mess__text';
                        text.append(mess.MessText);

                        let time = document.createElement('div');
                        time.className = 'mess__time';
                        time.append(mess.DateTime);

                        if(mess.Companion == messageArr.user) {
                            message.classList.add('mess--right');
                        }else {
                            message.classList.add('mess--left');
                        }

                        messBody.append(text);
                        messBody.append(time);
                        message.append(messBody);

                        messBlock.append(message);
                    });
                    
                    messBlock.scrollTo(0, messBlock.scrollHeight);
                    break;
                case 'no chat':
                    let chatInfo = document.createElement('p');
                    chatInfo.className = 'chat__info';
                    chatInfo.append(`You don't have any messages with ${validateWord(item.DialogName)}`);
                    messBlock.append(chatInfo);
                    messBlock.classList.add('chat__mess-block--empty');
                    break;    
                case 'err1':
                    break;
                case 'err2':
                    break;
                default:
                    return;            
            }
        }catch(e) {
            console.log(e);
        }
    });
}

export {
    loadChat
}