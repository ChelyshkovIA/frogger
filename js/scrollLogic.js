function scrollLogic(bodyImg) {
    let scrolledDown = false;

    window.addEventListener('scroll', function() {
        if(!scrolledDown && pageYOffset > (document.documentElement.clientHeight / 6)) {
            bodyImg.classList.add('body-img--blured');
            scrolledDown = true;
        }

        if(scrolledDown && pageYOffset <= (document.documentElement.clientHeight / 6)) {
            bodyImg.classList.remove('body-img--blured');
            scrolledDown = false;
        }
    });
}

export {
    scrollLogic
}