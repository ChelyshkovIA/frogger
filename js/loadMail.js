import {validateWord} from './validateWordUpper.js';
import {loadChat} from './loadChat.js';

function loadMail() {
    let req = new XMLHttpRequest();
    let url = '../php/getMail.php';
    req.open('POST', url);
    req.send();

    req.addEventListener('load', function() {
        try {
            let resp = JSON.parse(this.response);

            switch(resp.status) {
                case 'ok':
                    let messBlock = document.querySelector('.mess-block');
                    if(resp.body.length == 0) {
                        let header = document.createElement('p');
                        header.className = 'mess-block__header';
                        header.append('You don\'t have any messages yet');
                        messBlock.append(header);
                    }else {
                        let messBlock = document.querySelector('.mess-block');
                        resp.body.forEach(item => {
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
                            from.append(`${validateWord(item.UserFromName)}: `);
                            text.append(from);    
                            text.append(item.Text);

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
                            
                            let mailBlock  = document.querySelector('.mail-block');
                            let chat       = mailBlock.querySelector('.chat');
                            let dialogName = document.querySelector('.chat__person-name');

                            article.addEventListener('click', function() {
                                loadChat(item, mailBlock, chat, dialogName);
                            });

                            messBlock.append(article);
                        });
                    }

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
    loadMail
}