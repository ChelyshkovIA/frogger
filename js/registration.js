function toRegistrate(form) {
    function renameFormHeader (text, className, removeState = true) {
        let header = document.querySelector('.form-title--reg');

        header.className = 'form-title form-title--reg';
        header.innerText = text;
        header.classList.add(className);

        if(removeState) {
            setTimeout(() => {
                header.innerText = 'Registration';
                header.classList.remove(className);
            }, 4000);
        }
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let data = new FormData();

        let isValid = true;
        for(let i = 0; i < (form.length - 1); i++) {
            if(!form[i].value) {
                form[i].classList.add('field-input--empty');
                isValid = false;
            }else if(form[i].value.length > 40) {
                form[i].classList.add('field-input--empty');
                isValid = false;
            }
        }

        if(form.elements['password'].value != form.elements['confirmPassword'].value) {
            isValid = false;
            form.elements['password'].classList.add('field-input--empty');
            form.elements['confirmPassword'].classList.add('field-input--empty');
        }

        if(isValid) {
            data.append('name', form.elements['name'].value);
            data.append('surname', form.elements['surname'].value);
            data.append('login', form.elements['login'].value);
            data.append('email', form.elements['email'].value);
            data.append('country', form.elements['country'].value);
            data.append('password', form.elements['password'].value);
            data.append('confirmPassword', form.elements['confirmPassword'].value);

            let req = new XMLHttpRequest();
            let url = '../php/signup.php';
            req.open('POST', url);
            req.send(data);

            req.addEventListener('load', function() {
                switch(this.response) {
                    case 'ok':
                        renameFormHeader ('You have been succesfuly registered', 'form-title--success');
                        for(let i = 0; i < (form.length - 1); i++) {
                            form[i].value = '';
                        }
                        
                        break;
                    case 'err1' :
                        renameFormHeader ('Password missmatch', 'form-title--wrong', false);
                        break;
                    case 'err2' :
                        renameFormHeader ('Empty values', 'form-title--wrong', false);
                        break;
                    case 'err3' :
                        renameFormHeader ('Existing login!', 'form-title--wrong', false);
                        break;
                    case 'err4' :
                        renameFormHeader ('Existing Email!', 'form-title--wrong', false);
                        break;
                    case 'err5' :
                        renameFormHeader ('Data Base error!', 'form-title--wrong', false);
                        break;        
                    default:
                        console.log(this.response);
                        return;                
                }
            });
        }
    });

    for(let i = 0; i < (form.length - 1); i++) {
        if(form[i].name != 'password' && form[i].name != 'confirmPassword') {
            form[i].addEventListener('input', function() {
                if(!form[i].value) {
                    form[i].classList.add('field-input--empty');
                }else {
                    form[i].classList.remove('field-input--empty');
                }
            });
        }
    }

    form.elements['password'].addEventListener('input', function() {
        if(form.elements['password'].value != form.elements['confirmPassword'].value) {
            form.elements['password'].classList.add('field-input--empty');
            form.elements['confirmPassword'].classList.add('field-input--empty');
        }else {
            form.elements['password'].classList.remove('field-input--empty');
            form.elements['confirmPassword'].classList.remove('field-input--empty');
        }
    });

    form.elements['confirmPassword'].addEventListener('input', function() {
        if(form.elements['password'].value != form.elements['confirmPassword'].value){
            form.elements['password'].classList.add('field-input--empty');
            form.elements['confirmPassword'].classList.add('field-input--empty');
        }else {
            form.elements['password'].classList.remove('field-input--empty');
            form.elements['confirmPassword'].classList.remove('field-input--empty');
        }
    });
}

export {
    toRegistrate
}