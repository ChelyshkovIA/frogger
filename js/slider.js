function slider(imageNumber = 6) {
    let sliderButton = document.getElementsByClassName("slider-button");
    let sliderButtonsArray = document.getElementsByClassName("slider-button");

    let currentImage = 1;
    let imageArray = [];
    for(let i = 0; i < imageNumber; i++){
        imageArray[i] = "sliderImages/" + i + ".jpg";
    }

    let checkPointPreviosClass = "current-photo-point";
    let currentCheckPointAddClass = " current-photo-point--active";
    let checkPointsArr = document.getElementsByClassName("current-photo-point");
    checkPointsArr[currentImage].className +=currentCheckPointAddClass;

    function onSliderButtonClick(eventObject){
        let sliderImage = document.getElementById("slider");
        let button = eventObject.currentTarget;

        let imgAmount = imageNumber;
        if(button.className === "slider-button slider-button--left"){
            checkPointsArr[currentImage].className = checkPointPreviosClass;

            if(currentImage === 0){
                currentImage = --imgAmount;
            }
            else{
                currentImage--;
            }
            checkPointsArr[currentImage].className += currentCheckPointAddClass;
            sliderImage.src = imageArray[currentImage];
        }

        else if(button.className === "slider-button slider-button--right"){
            checkPointsArr[currentImage].className = checkPointPreviosClass;

            if(currentImage === --imgAmount){
                currentImage = 0;
            }
            else{
                ++currentImage;
            }
            checkPointsArr[currentImage].className += currentCheckPointAddClass;
            sliderImage.src = imageArray[currentImage];
        }
    }

    for(let i = 0; i < 2; i++){
        sliderButton[i].addEventListener("click", onSliderButtonClick);
    }
}

export {
    slider
}