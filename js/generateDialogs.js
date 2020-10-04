import {validateWord} from './validateWordUpper.js';
import {loadChat} from './loadChat.js';

function generateDialogs(item, messBlock) {
    let article = document.createElement('article');
    article.className = 'mess-block__dialog dialog';

    let photoBlock = document.createElement('div');
    photoBlock.className = 'dialog__photo-block';
    let img = document.createElement('img');
    img.className = 'dialog__photo';
    img.src = '../usersImages/default.png';

    let contentBlock = document.createElement('div');
    contentBlock.className = 'dialog__content-block';

    let userBlock = document.createElement('div');
    userBlock.className = 'dialog__user-block';

    let name = document.createElement('p');
    name.className = 'dialog__user-name';
    name.append(`${validateWord(item.DialogName)} ${validateWord(item.DialogSurname)}`);

    let text = document.createElement('p');
    text.className = 'dialog__mess-text';
    let from = document.createElement('span');
    from.className = 'dialog__from';

    let content = document.createElement('span');
    content.className = 'dialog__text';
    content.append(item.Text);

    from.append(`${validateWord(item.UserFromName)}: `);
    text.append(from);    
    text.append(content);

    let infoBlock = document.createElement('div');
    infoBlock.className = 'dialog__mess-info-block';

    let date = document.createElement('div');
    date.className = 'dialog__date';
    date.append('date');

    let time = document.createElement('div');
    time.className = 'dialog__time';
    time.append('time');

    let flag = document.createElement('div');
    flag.className = 'dialog__flag';

    userBlock.append(name);
    userBlock.append(text);

    infoBlock.append(date);
    infoBlock.append(time);
    infoBlock.append(flag);

    contentBlock.append(userBlock);
    contentBlock.append(infoBlock);

    photoBlock.append(img);

    article.append(photoBlock);
    article.append(contentBlock);

    article.dataset.chat = item.ChatId;

    let mailBlock  = document.querySelector('.mail-block');
    let chat       = mailBlock.querySelector('.chat');
    let dialogName = document.querySelector('.chat__person-name');

    article.addEventListener('click', function() {
        loadChat(item, mailBlock, chat, dialogName);
    });

    messBlock.append(article);
}

export {
    generateDialogs
}