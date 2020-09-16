import {getCookie} from './getCookie.js';
import {openMail} from './mail.js';

function isAuth() {
    let nav = document.createElement('nav');
    nav.className = 'body__menu body-menu';

    let login = getCookie('user');

    if(login) {
        if(window.location.pathname == '/index.html') {
            document.querySelector('.form-block').classList.add('form-block--hidden');
        }

        let logOut = document.createElement('a');
        logOut.className = 'body-menu__link body-menu__link--logout';
        logOut.href = 'php/logout.php';
        let logOutIcon = document.createElement('span');
        logOutIcon.className = 'body-menu__icon icon-link-ext';
        let logOutText = document.createElement('span');
        logOutText.append('Log out');
        logOut.append(logOutIcon);
        logOut.append(logOutText);

        let mail = document.createElement('span');
        mail.className = 'body-menu__link';
        let mailIcon = document.createElement('span');
        mailIcon.className = 'body-menu__icon icon-mail';
        let mailText = document.createElement('span');
        mailText.append('Mail');
        mail.append(mailIcon);
        mail.append(mailText);

        openMail(mail);

        let myPage = document.createElement('a');
        myPage.className = 'body-menu__link';
        myPage.href = `account.html?user=${login}`;
        let myPageIcon = document.createElement('span');
        myPageIcon.className = 'body-menu__icon icon-user-4';
        let myPageText = document.createElement('span');
        myPageText.append('My page');
        myPage.append(myPageIcon);
        myPage.append(myPageText);

        let feed = document.createElement('a');
        feed.className = 'body-menu__link';
        feed.href = 'index.html#feed';
        let feedIcon = document.createElement('span');
        feedIcon.className = 'body-menu__icon icon-calendar-1';
        let feedText = document.createElement('span');
        feedText.append('Feed');
        feed.append(feedIcon);
        feed.append(feedText);

        nav.append(logOut);
        nav.append(feed);
        nav.append(mail);
        nav.append(myPage);

    }else {
        let logIn = document.createElement('a');
        logIn.className = 'body-menu__link body-menu__link--logIn';
        logIn.href = 'index.html#loginForm';
        let logInIcon = document.createElement('span');
        logInIcon.className = 'body-menu__icon icon-login';
        let logInText = document.createElement('span');
        logInText.append('Log in');
        logIn.append(logInIcon);
        logIn.append(logInText);

        let signUp = document.createElement('a');
        signUp.className = 'body-menu__link body-menu__link--signUp';
        signUp.href = 'index.html#regForm';
        let signUpIcon = document.createElement('span');
        signUpIcon.className = 'body-menu__icon icon-plus';
        let signUpText = document.createElement('span');
        signUpText.append('Signup');
        signUp.append(signUpIcon);
        signUp.append(signUpText);

        let feed = document.createElement('a');
        feed.className = 'body-menu__link';
        feed.href = 'index.html#feed';
        let feedIcon = document.createElement('span');
        feedIcon.className = 'body-menu__icon icon-calendar-1';
        let feedText = document.createElement('span');
        feedText.append('Feed');
        feed.append(feedIcon);
        feed.append(feedText);

        nav.append(logIn);
        nav.append(signUp);
        nav.append(feed);
    }

    document.body.prepend(nav);
}

export {
    isAuth
}