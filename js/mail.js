import {clearMessList} from './clearMessList.js';
import {loadChat} from './loadChat.js';
import {getCookie} from './getCookie.js';
import {loadMail} from './loadMail.js';

function openMail (mail, name = '', surname = '', login = '', chatId = '') {
    const bg = document.querySelector('.bg');

    mail.addEventListener('click', function() {
        document.body.style.overflow = 'hidden';
        bg.classList.add('bg--active');
        new Promise(function (resolve, reject) {
            loadMail(resolve, reject);
        })
        .then(function () {

            let searchForm = document.querySelector('.searching-form');
            let mailBlock  = document.querySelector('.mail-block');
            let dialogName = document.querySelector('.chat__person-name');
            let chat       = mailBlock.querySelector('.chat');
            let closeChat  = chat.querySelector('.chat__options-close-icon');
            let closeMess  = mailBlock.querySelector('.searching-form__close-icon');
            let messList   = chat.querySelector('.chat__mess-block');
    
            if(mail.classList.contains('account-info__btn--message')) {
                mailBlock.classList.add('mail-block--chat-active');
                chat.classList.add('chat--active');
            }
    
            searchForm.classList.add('searching-form--active');
            mailBlock.classList.add('mail-block--active');
            
            bg.addEventListener('click', function() {
                bg.classList.remove('bg--active');
                document.body.style.overflow = 'inherit';
                searchForm.classList.remove('searching-form--active');
                mailBlock.classList.remove('mail-block--active');
                chat.classList.remove('chat--active');
                mailBlock.classList.remove('mail-block--chat-active');
                clearMessList(messList);
            });

            closeMess.addEventListener('click', function() {
                bg.classList.remove('bg--active');
                document.body.style.overflow = 'inherit';
                searchForm.classList.remove('searching-form--active');
                mailBlock.classList.remove('mail-block--active');
                chat.classList.remove('chat--active');
                mailBlock.classList.remove('mail-block--chat-active');
                clearMessList(messList);
            });
    
            closeChat.addEventListener('click', function() {
                chat.classList.remove('chat--active');
                mailBlock.classList.remove('mail-block--chat-active');
                dialogName.innerText = '';
                clearMessList(messList);
            });
    
            if(name && surname && login) {
                let item = {
                    DialogName: name,
                    DialogSurname: surname,
                    Login: getCookie('user'),
                    To: login,
                    ChatId: chatId
                };
                
                loadChat(item, mailBlock, chat, dialogName, login);
            }
        })
        .catch(function(error) {
            console.log(error);
            return;
        });
    });
}

export {
    openMail
}