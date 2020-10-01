import {scrollLogic} from './scrollLogic.js';
import {toRegistrate} from './registration.js';
import {login} from './login.js';
import {isAuth} from './isAuth.js';
import {loadMail} from './loadMail.js';
import {generateMainPage} from './generateMainPage.js';

addEventListener('DOMContentLoaded', function() {
    generateMainPage();
    isAuth();
    
    let bodyImg  = document.querySelector('.body-img');
    let regForm  = document.querySelector('.form--reg');
    let authForm = document.querySelector('.form--auth');
    
    scrollLogic(bodyImg);
    toRegistrate(regForm);
    login(authForm);
    
    loadMail();
});