const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function() {
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function() {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
});

searchInputEl.addEventListener('blur', function() {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});

// badges scroll 
const badgeEl = document.querySelector('header .badges');

window.addEventListener('scroll', _.throttle(function () {
  console.log(window.scrollY > 500);
  if (window.scrollY) {
    // 배지 숨기기
    // gsap.to(요소, 지속시간, 옵션);
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none'
    });
    // ScrollTop Btn 숨기기 ! 
    gsap.to('#to-top', .3, {
      x: 0
    });
  } else {
    // 배지 보이기
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });

    // ScrollTop Btn 숨기기 ! 
    gsap.to('#to-top', .3, {
      x: 120
    });
  }
}, 300));
// _.throttle(함수, 시간)

// toTop btn 클릭시 상단으로 이동
const toTopEl = document.querySelector('#to-top');
toTopEl.addEventListener('click', function () {
  gsap.to(window, .7, {
    scrollTo: 0
  });
});

// Fade-In VISUAL Section
const fadeEls = document.querySelectorAll('.visual .fade-in');

fadeEls.forEach(function(fadeEl, index) {
  // gsap.to(요소, 지속시간, 옵션);
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7,  //.7, 1.4, 2.1, 2.7
    opacity: 1
  });
});

// NOTICE SWIPER
// Notice Line
// new Swiper (선택자, 옵션)
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical',
  autoplay: true,
  loop: true
});

// Notice Promotion
new Swiper('.promotion .swiper-container' , {
  slidesPerView: 3,   // 한번에 보여줄 슬라이드 개수
  spaceBetween: 10,   // 슬라이드 사이 여백
  centeredSlides: true,   // 1번 슬라이드가 가운데
  loop: true,
  autoplay: {
    delay: 5000
  },
  pagination: {
    el: '.promotion .swiper-pagination',  // 페이지 번호 요소 선택자
    clickble: true  // 사용자의 페이지 번호 요소 제어
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});
// Awards Swiper-Slide
new Swiper('.awards .swiper-container', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});

// Promotion ToggleEvent (BTN)
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;

promotionToggleBtn.addEventListener('click', function (){
  isHidePromotion = !isHidePromotion  // 보인다 true
  if (isHidePromotion) {
    // 숨김 처리
    promotionEl.classList.add('hide');
  } else {
    // 보임 처리
    promotionEl.classList.remove('hide');
  }
});

// YOUTUBE Animation
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size) {
  gsap.to(
    selector,   // 선택자
    random(1.5, 2.5),   // 애니메이션 동작 시간 
    {   // 옵션
      y: size,
      repeat: -1,
      yoyo: true,
      ease: Power1.easeInOut,
      delay: random(0, delay)
  });
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

// ScrollMagic 
const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl) {
  // Scene : 스크롤을 감지해서 제어해주는 옵션, setClassToggle : class 속성을 active 되게 반복되게 해주는 옵션, addTo : ScrollMagic을 추가해 사용하기 위한 Controller(컨트롤러) 해주는 매소드.
  new ScrollMagic
  // 체이닝 문법을 사용함
    .Scene({
      triggerElement: spyEl,   // 보여짐 여부를 감시할 요소를 지정
      triggerHook: .8   //   뷰포트 0 ~ 1 에서 .8 지점에서 액션이 들어감
    })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());   //  ScrollMagic에 추가한 옵션에서 내부적으로 Controller해서 동작하도록 만들어 줌
});

// FOOTER TODAY (날짜 계산)
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();    // 2021