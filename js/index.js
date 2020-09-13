import {slider} from './slider.js';
import {scrollLogic} from './scrollLogic.js';
import {toRegistrate} from './registration.js';
import {login} from './login.js';
import {isAuth} from './isAuth.js';    


addEventListener('DOMContentLoaded', function() {
    isAuth();
    
    let bodyImg  = document.querySelector('.body-img');
    let regForm  = document.querySelector('.form--reg');
    let authForm = document.querySelector('.form--auth');
    
    slider();
    scrollLogic(bodyImg);
    toRegistrate(regForm);
    login(authForm);
});