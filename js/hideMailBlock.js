function hideMailBlock() {
    let mailBlock = document.querySelector('.mail-block');
    let chat = document.querySelector('.chat');
    let form = document.querySelector('.searching-form');

    mailBlock.className = 'body__mail-block mail-block';
    chat.className = 'mail-block__chat chat';
    form.className = 'mess-block__searching-form searching-form';
}

export {
    hideMailBlock
}