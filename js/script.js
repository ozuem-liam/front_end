let track = document.querySelector('.carousel_track');
let slides = Array.from(track.children);
let nextButton = document.querySelector('.carousel_button-right');
let prevButton = document.querySelector('.carousel_button-left');
let dotsNav = document.querySelector('.carousel_nav');
let dots = Array.from(dotsNav.children);


let slideWidth = slides[0].getBoundingClientRect().width;
// console.log(slideWidth);

// arrange the slides next to one another
// slides[0].style.left = slideWidth * 0 + 'px';
// slides[1].style.left = slideWidth * 1 + 'px';
// slides[2].style.left = slideWidth * 2 + 'px';
// using for loop instend to avoid coming back to edit if there are more slides

let setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition);

let moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left +')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}
let updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}
let hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    
    if (targetIndex === 0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if (targetIndex === slides.length - 1) {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    } else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden'); 
    }
}
// When i click on the right button i want it to go to the left
prevButton.addEventListener('click', e => {
    let currentSlide = track.querySelector('.current-slide');
    let prevSlide = currentSlide.previousElementSibling;
    let currentDot = dotsNav.querySelector('.current-slide');
    let prevDot = currentDot.previousElementSibling;
    let prevIndex = slides.findIndex(slide => slide === prevSlide);

    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    hideShowArrows(slides, prevButton, nextButton, prevIndex);
})

// When i click on the right button i want it to go to the right
nextButton.addEventListener('click', e => {
    let currentSlide = track.querySelector('.current-slide');
    let nextSlide = currentSlide.nextElementSibling;
    let currentDot = dotsNav.querySelector('.current-slide');
    let nextDot = currentDot.nextElementSibling;
    let nextIndex = slides.findIndex(slide => slide === nextSlide);

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(slides, prevButton, nextButton, nextIndex);
})

// WheN i click the nav indicator move to that slide

dotsNav.addEventListener('click', e => {
    // what indicator was clicked on
    let targetDot = e.target.closest('button');

    if (!targetDot) return;

    let currentSlide = track.querySelector('.current-slide');
    let currentDot = dotsNav.querySelector('.current-slide');
    let targetIndex = dots.findIndex(dot => dot === targetDot);
    let targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(slides, prevButton, nextButton, targetIndex);
})

// Star rating javaScript

let stars = document.querySelector('.rating');
let items = stars.querySelectorAll('.rating-item')
stars.onclick = e => {
    let starClass = e.target.classList;
    if (!starClass.contains('active')) {
        items.forEach(
            item => item.classList.remove('active')
        );
        starClass.add('active');
    }
}