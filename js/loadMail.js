
import {generateDialogs} from './generateDialogs.js';

function loadMail(resolve = function () {}, reject = function () {}) {
    let loadIndicator = document.createElement('div');
    loadIndicator.className = 'chat__loading-indicator';
    document.querySelector('.mess-block').append(loadIndicator);
    
    let req = new XMLHttpRequest();
    let url = '../php/getMail.php';
    req.open('POST', url);
    req.send();

    req.addEventListener('load', function() {
        loadIndicator.remove();
        try {
            let resp = JSON.parse(this.response);
            console.log(resp);

            switch(resp.status) {
                case 'ok':
                    let dialogsBlock = document.querySelector('.dialogs-block');
                    while (dialogsBlock.children.length > 0) dialogsBlock.children[0].remove();
                    if(resp.body.length == 0) {
                        let header = document.createElement('p');
                        header.className = 'mess-block__header';
                        header.append('You don\'t have any messages yet');
                        messBlock.append(header);
                    }else {
                        let dialogsBlock = document.querySelector('.dialogs-block');
                        resp.body.forEach((item) => {
                            generateDialogs(item, dialogsBlock);
                        });
                    }
                    resolve();
                    break;
                default:
                    reject('error: row 101 loadMail.js');
                    return;    
            }
        }catch(error) {
            reject(error);
            console.log(error);
        }
    });
}

export {
    loadMail
}