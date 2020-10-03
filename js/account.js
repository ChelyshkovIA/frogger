import {scrollLogic} from './scrollLogic.js';
import {isAuth} from './isAuth.js';
import {openMail} from './mail.js';
import {validateWord} from './validateWordUpper.js';


function accountLogic(user, resolve = function() {}, reject = function () {}) {
    
    let getPageReq = new XMLHttpRequest();
    let url = `../php/page.php?user=${user}`;
    getPageReq.open('GET', url);
    getPageReq.send();
    getPageReq.addEventListener('load', function() {
        try {
            let resp = JSON.parse(this.response);
            switch(resp.status) {
                case 'ok':
                    window.scrollTo(0, 0);  
                    let state        = document.querySelector('.user-info__state'); 
                    let name         = document.querySelector('.user-info__user-name');
                    let login        = document.querySelector('.user-info__login');
                    let country      = document.querySelector('#country');
                    let postsNumber  = document.querySelector('#posts-number');
                    let photosNumber = document.querySelector('#photo-number');
                    let followers    = document.querySelector('#followers-number');
                    let followings   = document.querySelector('#followings-number');

                    if (resp.info.State == 1) state.classList.add('user-info__state--active');

                    let nameVal = resp.info.Name.split('');
                    nameVal[0] = nameVal[0].toUpperCase();
                    nameVal = nameVal.join('');
    
                    let surnameVal = validateWord(resp.info.Surname);
                    let countryVal = validateWord(resp.info.Country);
    
                    name.append(`${nameVal} ${surnameVal}`);
                    login.append(`@${resp.info.Login}`);
                    country.append(countryVal);
                    postsNumber.append(resp.posts);
                    photosNumber.append(resp.photos);
                    followers.append(resp.followers);
                    followings.append(resp.followings);
    
                    if (resp.state == 'auth') {
                        if (resp.page == 'user') {
                            let postsBlock = document.querySelector('.account-info__block-item--posts');
                            state.classList.add('user-info__state--active');
                            
                            let addPost = document.createElement('span');
                            addPost.className = 'account-info__block-item-icon account-info__block-item-icon--add-post icon-plus-1';
                            postsBlock.append(addPost);
                        } else {
                            let connectionTools = document.createElement('div');
                            connectionTools.className = 'account-info__connection-tools account-info__connection-tools--active';
    
                            let toSubBtn = document.createElement('input');
                            toSubBtn.type = 'button';
                            toSubBtn.className = 'account-info__btn';
    
                            let messageBtn = document.createElement('input');
                            messageBtn.type = 'button';
                            messageBtn.className = 'account-info__btn account-info__btn--message';
                            messageBtn.value = 'Message';
                            
                            openMail(messageBtn, resp.info.Name, resp.info.Surname, resp.info.Login, resp.chat);
    
                            connectionTools.append(toSubBtn);
                            connectionTools.append(messageBtn);
    
                            if(resp.subscribed) {
                                toSubBtn.value = 'Unsubscribe';
                                toSubBtn.classList.add('account-info__btn--unsub');
                            }else {
                                toSubBtn.value = 'Subscribe';
                                toSubBtn.classList.add('account-info__btn--sub');
                            }
    
                            let accInfo = document.querySelector('.account-info');
                            accInfo.prepend(connectionTools);
    
                            toSubBtn.addEventListener('click', function() {
                                if(this.classList.contains('account-info__btn--unsub')) {
                                    this.value = 'Subscribe';
                                    this.classList.remove('account-info__btn--unsub');
                                    this.classList.add('account-info__btn--sub');
                                }else {
                                    this.value = 'Unsubscribe';
                                    this.classList.remove('account-info__btn--sub');
                                    this.classList.add('account-info__btn--unsub');
                                }
    
                                let data = new FormData();
                                data.append('user', user);
                                let req = new XMLHttpRequest();
                                let url = '../php/sub.php';
                                req.open('POST', url);
                                req.send(data);
    
                                req.addEventListener('load', function() {
                                    switch(this.response) {
                                        case 'add':
                                            followers.innerText = ++followers.innerText;
                                            break;
                                        case 'delete':
                                            followers.innerText = --followers.innerText;
                                            break;
                                        case 'err':
                                            reject('err: accountLogic.js, row 105');
                                            console.log('err');
                                            break;
                                        default:
                                            return;            
                                    }
                                });
                            });
                        }
                    }
                    break;
                case 'err1':
                    console.log('err1');
                    reject('err1: accountLogic.js, row 118');
                    break;    
                default:
                    return;    
            }
        } catch (error) {
            alert('Error!');
            console.log(error);
            reject(error);
        }
    
        isAuth();
        let bodyImg = document.querySelector('.body-img');
        scrollLogic(bodyImg);
        resolve();
    });
}

export {
    accountLogic
}
