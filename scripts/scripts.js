
{ // #region sliderControlsForStages--------------------------------

    let slideIndex = 1;
    const next =  document.querySelector(".slider_button-next");
    const prev =  document.querySelector('.slider_button-prev');
    let activeBullet = document.querySelector('.slider-bullet-1');
    activeBullet.classList.add('active-bullet');
    let sliderCards = document.querySelector(".stages-of-transformation__grid");
    prev.classList.add("disabled-button");
    

    // Событие на кнопку "вперёд"
    next.addEventListener('click', function (event) {
        activeBullet.className = "slider-bullet-" + slideIndex + " slider-bullet";
    
        if(slideIndex == 1) {
            prev.className = "slider_button-next slider__button";
        }
    
        if(slideIndex < 5) {
            slideIndex++;
            sliderCards.className = "stages-of-transformation__grid slide-" + slideIndex;
        }
    
        swapActiveBullet();
        switchDisabledOnButton(next, 5);
      })
    

    // Событие на кнопку "назад"
    prev.addEventListener('click', function (event) {
    activeBullet.className = "slider-bullet-" + slideIndex + " slider-bullet";
    
    if(slideIndex == 5) {
        next.className = "slider_button-next slider__button";
    }

    if(slideIndex > 1) {
        slideIndex--;
        sliderCards.className = "stages-of-transformation__grid slide-" + slideIndex;
    }

    swapActiveBullet();
    switchDisabledOnButton(prev, 1);
    })
    

    // сменить активный буллит
    function swapActiveBullet() {
        activeBullet = document.querySelector(`.slider-bullet-${slideIndex}`);
        activeBullet.classList.add('active-bullet');
    }
    
    
    // сделать кнопку неактивной
    function switchDisabledOnButton (button, index) {
        if(slideIndex == index) {
            button.classList.add("disabled-button");
            return;
        }
    }
}


{ // #region sliderControlsForTournamentMembers--------------------------------
    
    let slideIndex = 0;
    const next =  document.querySelector(".tournament-members__slider__button-right");
    const prev =  document.querySelector('.tournament-members__slider__button-left');
    let sliderCards = document.querySelector(".tournament-members__member-cards");
    let slidesNodes = document.querySelectorAll(".member-card");


    // Событие на кнопку "вперёд"
    next.addEventListener('click', function (event) {
        swapNextCard();
    })
    
    // Событие на кнопку "назад"
    prev.addEventListener('click', function (event) {
        console.log('клик назад');

        animateSwapCards("394px", "0", 0);

        setTimeout(function() {
            if(slideIndex == 5) {
                slideIndex = 0;
                sliderCards.insertBefore(slidesNodes[5], null);
            }
            else {
                sliderCards.insertBefore(slidesNodes[slideIndex], null);
                slideIndex++;
            }

            document.querySelector(".changeable-card-number").innerHTML = `${slideIndex + 1}`;
        }, 200);

        animateSwapCards("0", "1", 200);
    })

    // Установить следующую карточку
    function swapNextCard (replacing, replaceable, increment) {

        animateSwapCards("394px", "0", 0);

        setTimeout(function() {
            if(slideIndex == 0) {
                sliderCards.insertBefore(slidesNodes[0], slidesNodes[1]);
                slideIndex = 5;
                sliderCards.insertBefore(slidesNodes[slideIndex], slidesNodes[0]);
            }
            else {
                slideIndex--;
                sliderCards.insertBefore(slidesNodes[slideIndex], slidesNodes[1 + slideIndex]);
            }

            document.querySelector(".changeable-card-number").innerHTML = `${slideIndex + 1}`;
        }, 200);

        animateSwapCards("0", "1", 200);
    }

    // Анимация мерцания карточек
    function animateSwapCards (marginLeft, opac, delay) {

        sliderCards.style.marginLeft = marginLeft;

        setTimeout(function() {
            sliderCards.style.opacity = opac;
        }, delay);

        console.log('animateSwapCards');
    }

    // Автопрокрутка слайдера
    setInterval(() => {
        swapNextCard();
    }, 4000)
}
