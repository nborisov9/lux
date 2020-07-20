


// JS-ФУНКЦИЯ ОПРЕДЕЛЕНИЯ ПОДДЕРЖКИ WEBP 

// function testWebP(callback) {
// 	let webP = new Image();
// 	webP.onload = webP.onerror = function () {
// 		callback(webP.height == 2);
// 	};
// 	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
// }

// testWebP(function (support) {
// 	if (support == true) {
// 		document.querySelector('body').classList.add('webp');
// 	} else {
// 		document.querySelector('body').classList.add('no-webp');
// 	}
// });

// JS-ФУНКЦИЯ ОПРЕДЕЛЕНИЯ ПОДДЕРЖКИ WEBP 



// Основной скрипт ==================================================


// выпадашка ====================
let user_icon = document.querySelector('.user-header__icons');
let user_menu = document.querySelector('.user-header__menu');
user_icon.addEventListener('click', function (e) {
	user_menu.classList.toggle('_active');
});
// toggle - кликнули - появилась | кликнули - убралась

// чтобы выпадашка пропадала при клике на пустую область
document.addEventListener('click', function (e) {
	if (!e.target.closest('.user-header')) { // Метод closest ищет ближайший родительский элемент, подходящий под указанный CSS селектор, если такого нет, то:
		user_menu.classList.remove('_active'); // отбираем класс активности
	}
});

// выпадашка ====================


// бургер (мой) =======================
let menuIcon = document.querySelector('.icon-menu');
let menuBody = document.querySelector('.menu__body');

menuIcon.addEventListener('click', function () {
	menuBody.classList.toggle('_active');
	menuIcon.classList.toggle('_active');
});
// бургер (мой )=======================




// //бургер (вариант жеки) ====================================
// let iconMenu = document.querySelector(".icon-menu");

// if (iconMenu != null) {
// 	let delay = 500;
// 	let body = document.querySelector("body");
// 	let menuBody = document.querySelector(".menu__body");
// 	iconMenu.addEventListener("click", function (e) {
// 		if (!body.classList.contains('_wait')) {
// 			body_lock(delay);
// 			iconMenu.classList.toggle("_active");
// 			menuBody.classList.toggle("_active");
// 		}
// 	});
// }

// ;

// function menu_close() {
// 	let iconMenu = document.querySelector(".icon-menu");
// 	let menuBody = document.querySelector(".menu__body");
// 	iconMenu.classList.remove("_active");
// 	menuBody.classList.remove("_active");
// } //=================
// //BodyLock


// function body_lock(delay) {
// 	let body = document.querySelector("body");

// 	if (body.classList.contains('_lock')) {
// 		body_lock_remove(delay);
// 	} else {
// 		body_lock_add(delay);
// 	}
// }

// function body_lock_remove(delay) {
// 	let body = document.querySelector("body");

// 	if (!body.classList.contains('_wait')) {
// 		let lock_padding = document.querySelectorAll("._lp");
// 		setTimeout(function () {
// 			for (let index = 0; index < lock_padding.length; index++) {
// 				let el = lock_padding[index];
// 				el.style.paddingRight = '0px';
// 			}

// 			body.style.paddingRight = '0px';
// 			body.classList.remove("_lock");
// 		}, delay);
// 		body.classList.add("_wait");
// 		setTimeout(function () {
// 			body.classList.remove("_wait");
// 		}, delay);
// 	}
// }

// function body_lock_add(delay) {
// 	let body = document.querySelector("body");

// 	if (!body.classList.contains('_wait')) {
// 		let lock_padding = document.querySelectorAll("._lp");

// 		for (let index = 0; index < lock_padding.length; index++) {
// 			let el = lock_padding[index];
// 			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
// 		}

// 		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
// 		body.classList.add("_lock");
// 		body.classList.add("_wait");
// 		setTimeout(function () {
// 			body.classList.remove("_wait");
// 		}, delay);
// 	}
// } //бургер (вариант жеки) ====================================















// Dynamic Adapt v.1 ==========================================
// HTML data-move="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-move="item,2,992"
let move_array = [];
let move_objects = document.querySelectorAll("[data-move]");

if (move_objects.length > 0) {
	for (let _index10 = 0; _index10 < move_objects.length; _index10++) {
		let _el6 = move_objects[_index10];

		let data_move = _el6.getAttribute("data-move");

		if (data_move != "" || data_move != null) {
			_el6.setAttribute("data-move-index", _index10);

			move_array[_index10] = {
				parent: _el6.parentNode,
				index: index_in_parent(_el6)
			};
		}
	}
}

function dynamic_adapt() {
	let w = document.querySelector("body").offsetWidth;

	if (move_objects.length > 0) {
		for (let _index11 = 0; _index11 < move_objects.length; _index11++) {
			let _el7 = move_objects[_index11];

			let _data_move = _el7.getAttribute("data-move");

			if (_data_move != "" || _data_move != null) {
				let data_array = _data_move.split(",");

				let data_parent = document.querySelector("." + data_array[0]);
				let data_index = data_array[1];
				let data_bp = data_array[2];

				if (w < data_bp) {
					if (!_el7.classList.contains("js-move_done_" + data_bp)) {
						if (data_index > 0) {
							//insertAfter
							let actual_index = index_of_elements(data_parent)[data_index];
							data_parent.insertBefore(_el7, data_parent.childNodes[actual_index]);
						} else {
							data_parent.insertBefore(_el7, data_parent.firstChild);
						}

						_el7.classList.add("js-move_done_" + data_bp);
					}
				} else {
					if (_el7.classList.contains("js-move_done_" + data_bp)) {
						dynamic_adaptive_back(_el7);

						_el7.classList.remove("js-move_done_" + data_bp);
					}
				}
			}
		}
	}
}

function dynamic_adaptive_back(el) {
	let index_original = el.getAttribute("data-move-index");
	let move_place = move_array[index_original];
	let parent_place = move_place["parent"];
	let index_place = move_place["index"];

	if (index_place > 0) {
		//insertAfter
		let actual_index = index_of_elements(parent_place)[index_place];
		parent_place.insertBefore(el, parent_place.childNodes[actual_index]);
	} else {
		parent_place.insertBefore(el, parent_place.firstChild);
	}
}

function index_in_parent(node) {
	let children = node.parentNode.childNodes;
	let num = 0;

	for (let _i2 = 0; _i2 < children.length; _i2++) {
		if (children[_i2] == node) return num;
		if (children[_i2].nodeType == 1) num++;
	}

	return -1;
}

function index_of_elements(parent) {
	let children = [];

	for (let _i3 = 0; _i3 < parent.childNodes.length; _i3++) {
		if (parent.childNodes[_i3].nodeType == 1 && parent.childNodes[_i3].getAttribute("data-move") == null) {
			children.push(_i3);
		}
	}

	return children;
}

window.addEventListener("resize", function (event) {
	dynamic_adapt();
});
dynamic_adapt();
// Dynamic Adapt v.1 ==========================================







// ibg =======================================================
function ibg() {
	let _ibg = document.querySelectorAll("._ibg");

		for (let i = 0; i < _ibg.length; i++) {
			if (_ibg[i].querySelector('img') && _ibg[i].querySelector('img').getAttribute('src') != null) {
				_ibg[i].style.backgroundImage = 'url(' + _ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
}

ibg();
// ibg =======================================================
















//slider ==============================================================================================================================




// Общая настройка всей оболочки ._swiper
let sliders = document.querySelectorAll('._swiper');

if (sliders) {
	for (let _index24 = 0; _index24 < sliders.length; _index24++) {
		let slider = sliders[_index24];

		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;

			if (slider_items) {
				for (let _index25 = 0; _index25 < slider_items.length; _index25++) {
					let _el12 = slider_items[_index25];

					_el12.classList.add('swiper-slide');
				}
			}

			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement('div');
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-bild');
		}

		if (slider.classList.contains('_gallery')) {//slider.data('lightGallery').destroy(true);
		}
	}

	sliders_bild_callback();
}

function sliders_bild_callback(params) { }



// Настройки для .main-slider__body=================================
let main_slider = new Swiper('.main-slider__body', {
	/*
	effect: 'fade', // отвечает за плавность перетикания слайда
	autoplay: {
		  delay: 3000,
		  disableOnInteraction: false,
	},
	*/
	observer: true,
	observeParents: true,
	slidesPerView: 1, // Показывать 1 слайд
	spaceBetween: 0,
	///autoHeight: true,
	speed: 800,
	//touchRatio: 0,
	//simulateTouch: false,
	loop: true,
	//preloadImages: false,
	//lazy: true,
	// Dotts
	//pagination: {
	//	el: '.slider-quality__pagging',
	//	clickable: true,
	//},
	// Arrows
	navigation: {
		nextEl: '.control-main-slider__arrow_next',
		prevEl: '.control-main-slider__arrow_prev'
	},
	breakpoints: {
		320: {
			autoHeight: true
		},
		768: {
			autoHeight: true
		}
	},
	on: {
		lazyImageReady: function lazyImageReady() {
			ibg();
		}
	} // And if we need scrollbar
	//scrollbar: {
	//	el: '.swiper-scrollbar',
	//},

});



// Настройки для .slider-lots__body==================================================
let lots_slider = new Swiper('.slider-lots__body', {
	/*
	effect: 'fade', // отвечает за плавность перетикания слайда
	autoplay: {
		  delay: 3000,
		  disableOnInteraction: false,
	},
	*/
	observer: true,
	observeParents: true,
	slidesPerView: 3, // Показывать 3 слайда
	spaceBetween: 0,
	// autoHeight: true,
	speed: 800,
	// touchRatio: 0,
	//simulateTouch: false,
	loop: true, // ***
	// preloadImages: false,
	// lazy: true,
	// Dotts
	// pagination: {
	// 	el: '.slider-quality__pagging',
	// 	clickable: true,
	// },
	// Arrows
	navigation: {
		nextEl: '.control-slider-lots__arrow_next',
		prevEl: '.control-slider-lots__arrow_prev'
	},
	breakpoints: {
		320: {
			slidesPerView: 1
		},
		550: {
			slidesPerView: 2
		},
		768: {
			slidesPerView: 3
		}
	},
	on: {
		lazyImageReady: function lazyImageReady() {
			ibg();
		}
	} // And if we need scrollbar
	//scrollbar: {
	//	el: '.swiper-scrollbar',
	//},

});






// для этого слайда, неактивному классу .slider-quotes__slide добавили opacity: 0 !important;
// а активному классу .swiper-slide-active opacity: 1 !important;
let quotes_slider = new Swiper('.slider-quotes__body', {
	effect: 'fade', // отвечает за плавность перетикания слайда (появляется через opacity)

	/*
	autoplay: {
		  delay: 3000,
		  disableOnInteraction: false,
	},
	*/
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 0,
	///autoHeight: true,
	speed: 1000,
	//touchRatio: 0,
	//simulateTouch: false,
	loop: true,
	//preloadImages: false,
	//lazy: true,
	// Dotts
	//pagination: {
	//	el: '.slider-quality__pagging',
	//	clickable: true,
	//},
	// Arrows
	navigation: {
		nextEl: '.control-slider-quotes__circle'
	},
	breakpoints: {
		320: {
			autoHeight: true
		},
		600: {
			autoHeight: true
		}
	},
	on: {
		lazyImageReady: function lazyImageReady() {
			ibg();
		}
	} // And if we need scrollbar
	//scrollbar: {
	//	el: '.swiper-scrollbar',
	//},

});


//slider ==============================================================================================================================



