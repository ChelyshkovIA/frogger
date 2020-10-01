import {scrollLogic} from './scrollLogic.js';
import {toRegistrate} from './registration.js';
import {login} from './login.js';
import {isAuth} from './isAuth.js';
import {generateMainPage} from './generateMainPage.js';
import {generateAccount} from './generateAccount.js';
import {accountLogic} from './account.js';

addEventListener('DOMContentLoaded', function() {
    generateMainPage();
    isAuth();
    
    let bodyImg  = document.querySelector('.body-img');
    let regForm  = document.querySelector('.form--reg');
    let authForm = document.querySelector('.form--auth');
    
    scrollLogic(bodyImg);
    toRegistrate(regForm);
    login(authForm);

    _testLink();
    function _testLink() {
        let testLink = document.getElementById('test-link');
        testLink.addEventListener('click', function() {
            generateAccount();
            accountLogic('hanna');
        });
    }
});