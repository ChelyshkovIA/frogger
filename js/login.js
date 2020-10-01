import {generateAccount} from './generateAccount.js';
import {accountLogic} from './account.js';

function login(form) {
    function renameFormHeader (text, className, removeState = true) {
        let header = document.querySelector('.form-title--auth');

        header.className = 'form-title form-title--auth';
        header.innerText = text;
        header.classList.add(className);

        if(removeState) {
            setTimeout(() => {
                header.innerText = 'Authorization';
                header.classList.remove(className);
            }, 4000);
        }
    }
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        let data = new FormData();

        let isValid = true;
        for(let i = 0; i < form.length - 1; i++) {
            if(!form[i].value) {
                isValid = false;
                form[i].classList.add('field-input--empty');
            }else if(form[i].value.length > 40) {
                form[i].classList.add('field-input--empty');
                isValid = false;
            }
        }

        if(isValid) {
            data.append('login', form.elements['login'].value);
            data.append('password', form.elements['password'].value);
            let req = new XMLHttpRequest();
            let url = '../php/auth.php';
            req.open('POST', url);
            req.send(data);

            req.addEventListener('load', function() {
                try {
                    let resp = JSON.parse(this.response);

                    switch(resp.status) {
                        case 'ok':
                            generateAccount();
                            accountLogic(resp.login);
                            break;
                        case 'err1' :
                            renameFormHeader ('Empty values!', 'form-title--wrong');
                            break;
                        case 'err2' :
                            renameFormHeader ('500  error! Say to developer!', 'form-title--wrong');
                            break;
                        case 'err3' :
                            renameFormHeader ('Not valid data!', 'form-title--wrong');
                            break;    
                        default:
                            return false;            
                    }
                }catch(err) {
                    alert('error!');
                    console.log(err);
                }
            });
        }
    });

    for(let i = 0; i < (form.length - 1); i++) {
        form[i].addEventListener('input', function() {
            if(!form[i].value) {
                form[i].classList.add('field-input--empty');
            }else {
                form[i].classList.remove('field-input--empty');
            }
        });
    }
}

export {
    login
}