function openMail (mail) {

    mail.addEventListener('click', function() {
        let searchForm = document.querySelector('.searching-form');
        let mailBlock = document.querySelector('.mail-block');
        
        let messages = mailBlock.querySelectorAll('.dialog');
        let chat = mailBlock.querySelector('.chat');
        let closeChat = chat.querySelector('.chat__options-close-icon');
        let closeMess = mailBlock.querySelector('.searching-form__close-icon');

        if(mail.classList.contains('account-info__btn--message')) {
            mailBlock.classList.add('mail-block--chat-active');
            chat.classList.add('chat--active');
        }

        searchForm.classList.add('searching-form--active');
        mailBlock.classList.add('mail-block--active');

        closeMess.addEventListener('click', function() {
            searchForm.classList.remove('searching-form--active');
            mailBlock.classList.remove('mail-block--active');
            chat.classList.remove('chat--active');
            mailBlock.classList.remove('mail-block--chat-active');
        });

        closeChat.addEventListener('click', function() {
            chat.classList.remove('chat--active');
            mailBlock.classList.remove('mail-block--chat-active');
        });

        for(let i = 0; i < messages.length; i++) {
            messages[i].addEventListener('click', function() {
                mailBlock.classList.add('mail-block--chat-active');
                chat.classList.add('chat--active');
            });
        }
    });
}

export {
    openMail
}