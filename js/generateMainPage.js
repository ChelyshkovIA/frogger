function generateMainPage() {
    let header = document.querySelector('.header');
    header.className = 'header header--index';

    while (header.children.length != 0) header.children[0].remove();

    let photoBlock = document.createElement('div');
    photoBlock.className = 'header__photo-block photo-block';

    let mainTitle = document.createElement('h1');
    mainTitle.className = 'photo-block__main-title main-title';
    mainTitle.append('FROGGER');

    let title = document.createElement('h2');
    title.className = 'photo-block__title';
    title.append('Love where you\'re going');

    let subtitle = document.createElement('h3');
    subtitle.className = 'photo-block__subtitle';
    subtitle.append('Travel community around the world');

    let headerInfo = document.createElement('div');
    headerInfo.className = 'photo-block__info header-info';

    let headerItemUsers = document.createElement('p');
    headerItemUsers.className = 'header-info__item header-info__item--users';
    let headerItemUsersText = document.createElement('span');
    headerItemUsersText.append('users: ');
    let headerItemUsersCounter = document.createElement('span');
    headerItemUsersCounter.className = 'header__info-data header__info-data--users';
    headerItemUsersCounter.append('12056');

    let headerItemPosts = document.createElement('p');
    headerItemPosts.className = 'header-info__item header-info__item--posts';
    let headerItemPostsText = document.createElement('span');
    headerItemPostsText.append('users: ');
    let headerItemPostsCounter = document.createElement('span');
    headerItemPostsCounter.className = 'header__info-data header__info-data--posts';
    headerItemPostsCounter.append('300128');

    let headerItemPhotos = document.createElement('p');
    headerItemPhotos.className = 'header-info__item header-info__item--photos';
    let headerItemPhotosText = document.createElement('span');
    headerItemPhotosText.append('users: ');
    let headerItemPhotosCounter = document.createElement('span');
    headerItemPhotosCounter.className = 'header__info-data header__info-data--photos';
    headerItemPhotosCounter.append('637009');

    headerItemUsers.append(headerItemUsersText);
    headerItemUsers.append(headerItemUsersCounter);

    headerItemPosts.append(headerItemPostsText);
    headerItemPosts.append(headerItemPostsCounter);

    headerItemPhotos.append(headerItemPhotosText);
    headerItemPhotos.append(headerItemPhotosCounter);

    headerInfo.append(headerItemUsers);
    headerInfo.append(headerItemPosts);
    headerInfo.append(headerItemPhotos);

    photoBlock.append(mainTitle);
    photoBlock.append(title);
    photoBlock.append(subtitle);
    photoBlock.append(headerInfo);

    header.append(photoBlock);

    let feed = document.querySelector('.posts-block');
    // while (feed.children.length != 0) feed.children[0].remove();
}

export {
    generateMainPage
}