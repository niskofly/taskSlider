$(function () {

    let currentIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const slider = document.getElementById('slider');
    const indicator = document.getElementById('slide-indicator');

    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;
    let moving = false;

    function updateIndicator() {
        indicator.textContent = `${currentIndex + 1} из ${totalSlides}`;
    }

    function setSliderPosition() {
        slider.style.transform = `translateX(${currentTranslate}px)`;
    }

    function animate() {
        setSliderPosition();
        if (moving) requestAnimationFrame(animate);
    }

    function handleStart(position) {
        startX = position.clientX;
        moving = true;
        animationID = requestAnimationFrame(animate);

        slider.classList.add('grabbing');
    }

    function handleMove(position) {
        if (!moving) return;
        const currentX = position.clientX;
        const diff = currentX - startX;


        if ((currentIndex === 0 && diff > 0) || (currentIndex === totalSlides - 1 && diff < 0)) {
            return;
        }

        currentTranslate = prevTranslate + diff;
    }

    function handleEnd() {
        moving = false;
        cancelAnimationFrame(animationID);

        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -50 && currentIndex < totalSlides - 1) {
            currentIndex++;
        }

        if (movedBy > 50 && currentIndex > 0) {
            currentIndex--;
        }

        currentTranslate = -currentIndex * 343;
        prevTranslate = currentTranslate;

        setSliderPosition();
        updateIndicator();

        slider.classList.remove('grabbing');
    }


    slider.addEventListener('dragstart', (e) => e.preventDefault());


    slider.addEventListener('touchstart', (e) => handleStart(e.touches[0]), false);
    slider.addEventListener('touchmove', (e) => handleMove(e.touches[0]), false);
    slider.addEventListener('touchend', handleEnd, false);


    slider.addEventListener('mousedown', (e) => handleStart(e), false);
    slider.addEventListener('mousemove', (e) => handleMove(e), false);
    slider.addEventListener('mouseup', handleEnd, false);
    slider.addEventListener('mouseleave', handleEnd, false);


    updateIndicator();



})