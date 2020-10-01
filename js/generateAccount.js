function generateAccount() {
    let header = document.querySelector('.header');
    header.className = 'header header--account';

    while (header.children.length != 0) header.children[0].remove();
    let formBlock = document.querySelector('.form-block');
    formBlock.classList.add('form-block--hidden');

    let userInfo = document.createElement('div');
    userInfo.className = 'header__user-info user-info';

    let imgBlock = document.createElement('div');
    imgBlock.className = 'user-info__img-block';

    let userImage = document.createElement('img');
    userImage.className = 'user-info__user-image';
    userImage.src = 'usersImages/default.png';

    let userName = document.createElement('h1');
    userName.className = 'user-info__user-name';

    let about = document.createElement('div');
    about.className = 'user-info__about';

    let login = document.createElement('p');
    login.className = 'user-info__login';

    let countryBlock = document.createElement('p');
    countryBlock.className = 'user-info__country';

    let countryIcon = document.createElement('span');
    countryIcon.className = 'user-info__country-icon icon-location-3';

    let country = document.createElement('span');
    country.id = 'country';

    countryBlock.append(countryIcon);
    countryBlock.append(country);

    about.append(login);
    about.append(countryBlock);

    imgBlock.append(userImage);

    userInfo.append(imgBlock);
    userInfo.append(userName);
    userInfo.append(about);

    let accountInfo = document.createElement('div');
    accountInfo.className = 'header__account-info account-info';

    let accInfoBlock = document.createElement('div');
    accInfoBlock.className = 'account-info__block';

    let followingBlock = document.createElement('a');
    followingBlock.className = 'account-info__block-item';
    followingBlock.href = '#';

    let followingItem = document.createElement('span');
    followingItem.className = 'account-info__block-item-text';
    followingItem.append('following: ');
    let followingCounter = document.createElement('span');
    followingCounter.className = 'account-info__block-item-counter';
    followingCounter.id = 'followings-number';

    let followersBlock = document.createElement('a');
    followersBlock.className = 'account-info__block-item';
    followersBlock.href = '#';

    let followersItem = document.createElement('span');
    followersItem.className = 'account-info__block-item-text';
    followersItem.append('followers: ');
    let followersCounter = document.createElement('span');
    followersCounter.className = 'account-info__block-item-counter';
    followersCounter.id = 'followers-number';

    let photoBlock = document.createElement('p');
    photoBlock.className = 'account-info__block-item';

    let photoItem = document.createElement('span');
    photoItem.className = 'account-info__block-item-text';
    photoItem.append('photo: ');
    let photoCounter = document.createElement('span');
    photoCounter.className = 'account-info__block-item-counter';
    photoCounter.id = 'photo-number';

    let postsBlock = document.createElement('p');
    postsBlock.className = 'account-info__block-item account-info__block-item--posts';

    let postsItem = document.createElement('span');
    postsItem.className = 'account-info__block-item-text';
    postsItem.append('photo: ');
    let postsCounter = document.createElement('span');
    postsCounter.className = 'account-info__block-item-counter';
    postsCounter.id = 'posts-number';

    followingBlock.append(followingItem);
    followingBlock.append(followingCounter);

    followersBlock.append(followersItem);
    followersBlock.append(followersCounter);

    photoBlock.append(photoItem);
    photoBlock.append(photoCounter);

    postsBlock.append(postsItem);
    postsBlock.append(postsCounter);

    accInfoBlock.append(followingBlock);
    accInfoBlock.append(followersBlock);
    accInfoBlock.append(photoBlock);
    accInfoBlock.append(postsBlock);

    accountInfo.append(accInfoBlock);

    header.append(userInfo);
    header.append(accountInfo);

    let feed = document.querySelector('.posts-block');
    // while (feed.children.length !== 0) feed.children[0].remove();
}

export {
    generateAccount
}