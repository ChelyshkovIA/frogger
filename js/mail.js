function openMail (mail) {

    mail.addEventListener('click', function() {
        let searchForm = document.querySelector('.searching-form');
        let mailBlock = document.querySelector('.mail-block');

        searchForm.classList.add('searching-form--active');
        mailBlock.classList.add('mail-block--active');

        let messages = mailBlock.querySelectorAll('.dialog');
        let chat = mailBlock.querySelector('.chat');

        chat.querySelector('.chat__options-close-icon').addEventListener('click', function() {
            chat.classList.remove('chat--active');
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