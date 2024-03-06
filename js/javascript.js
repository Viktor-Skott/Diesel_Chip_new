
function init() {
  let map = new ymaps.Map("map", {
    center: [58.063238, 38.788766],
    zoom: 16
  });

  let placemark = new ymaps.Placemark([58.063238, 38.788766], {}, {
    iconLayout: 'default#image',
    iconImageHref: '../img/icons/map_icon.svg',
    iconImageSize: [30, 30],
    iconImageOffset: [-15, -40]
  });

  map.controls.remove('geolocationControl'); // удаляем геолокацию
  map.controls.remove('searchControl'); // удаляем поиск
  map.controls.remove('trafficControl'); // удаляем контроль трафика
  map.controls.remove('typeSelector'); // удаляем тип
  map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
  map.controls.remove('zoomControl'); // удаляем контрол зуммирования
  map.controls.remove('rulerControl'); // удаляем контрол правил
  map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

  map.geoObjects.add(placemark);
}
ymaps.ready(init);

// Скрипт popup окна

const button = document.querySelector("button"),
  toast = document.querySelector(".toast");
(closeIcon = document.querySelector(".close")),
  (progress = document.querySelector(".progress"));

let timer1, timer2;

button.addEventListener("click", () => {
  toast.classList.add("active");
  progress.classList.add("active");

  timer1 = setTimeout(() => {
    toast.classList.remove("active");
  }, 5000); //1s = 1000 milliseconds

  timer2 = setTimeout(() => {
    progress.classList.remove("active");
  }, 5300);
});

closeIcon.addEventListener("click", () => {
  toast.classList.remove("active");

  setTimeout(() => {
    progress.classList.remove("active");
  }, 300);

  clearTimeout(timer1);
  clearTimeout(timer2);
});




function popupToggle() {
  const popup = document.getElementById('popup');
  popup.classList.toggle('active')
}

// Скрипт появления текста

function onEntry(entry) {
  entry.forEach(change => {
    if (change.isIntersecting) {
     change.target.classList.add('element-show');
    }
  });
}

let options = {
  threshold: [0.5] };
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.element-animation');

for (let elm of elements) {
  observer.observe(elm);
}


// slider


let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active-s", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active-s";
}


// базовая маска
$.mask.definitions['N'] = '[489]';
$(".input-test").mask(
	     '+7 (N99) 999-99-99',
        {
            placeholder: '_',
            completed:function(){
                console.log("Ввод завершен (базовый).");
            },
            autoclear: false
        }
        );

// действия при вводе
$(".input-test").keyup(function () {

	var val = $(this).val();

	// стандартная маска > пользователь вводим восьмерку > меняем маску 
	if (val[4] === '8' && val[1] === '7') {
		$(this).val('8 (___) ___-__-__');
		$(this).attr('placeholder', '8 (999) 999-99-99')
		$(this).unmask();
		$.mask.definitions['N'] = '[49]';
		$(this).mask(
			'8 (N99) 999-99-99',
			{
				placeholder: '_',
				completed:function(){
					console.log('Ввод завершен (измененный).');
					
				},
				autoclear: false
			}
		);
		$(this).focus();
		}
});






