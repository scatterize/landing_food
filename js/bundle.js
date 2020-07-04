/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "../js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../js/modules/calc.js":
/*!*****************************!*\
  !*** ../js/modules/calc.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function calc() {
  /// calculator
  const result = document.querySelector('.calculating__result span');
  let sex,
    height,
    weight,
    age,
    ratio = 1.375;
  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    sex = 'female';
    localStorage.setItem('sex', 'female');
  }
  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  }

  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((elem) => {
      elem.classList.remove(activeClass);
      if (elem.getAttribute('id') === localStorage.getItem('sex')) {
        elem.classList.add(activeClass);
      }
      if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        elem.classList.add(activeClass);
      }
    });
  }
  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings(
    '.calculating__choose_big div',
    'calculating__choose-item_active'
  );

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = '____';
      return;
    }

    if (sex === 'female') {
      result.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    } else {
      result.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    }
  }

  calcTotal();

  function getStaticInformation(Selector, activeClass) {
    const elements = document.querySelectorAll(Selector);

    elements.forEach((elem) => {
      elem.addEventListener('click', (e) => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', e.target.getAttribute('id'));
        }
        console.log(ratio, sex);

        elements.forEach((elem) => {
          elem.classList.remove(activeClass);
        });

        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
  }

  getStaticInformation('#gender div', 'calculating__choose-item_active');
  getStaticInformation(
    '.calculating__choose_big div',
    'calculating__choose-item_active'
  );

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);
    input.addEventListener('input', () => {
      if (input.value.match(/\D/g)) {
        input.style.border = '1px solid red';
      } else {
        input.style.border = 'none';
      }

      switch (input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      }
      calcTotal();
    });
  }

  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');
}

module.exports = calc;


/***/ }),

/***/ "../js/modules/cards.js":
/*!******************************!*\
  !*** ../js/modules/cards.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function cards() {
  //Class for cards
  class Cards {
    constructor(
      image,
      imageText,
      title,
      text,
      price,
      parentSelector,
      ...classes
    ) {
      this.image = image;
      this.imageText = imageText;
      this.title = title;
      this.text = text;
      this.price = price;
      this.classes = classes;
      this.transfer = 70;
      this.parent = document.querySelector(parentSelector);
      this.changeToRub();
    }

    changeToRub() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');
      if (this.classes.length === 0) {
        this.classes = 'menu__item';
        element.classList.add(this.classes);
      } else {
        this.classes.forEach((item) => {
          element.classList.add(item);
        });
      }
      element.innerHTML = `     
      <img src=${this.image} alt=${this.imageText} />
      <h3 class="menu__item-subtitle">${this.title}</h3>
      <div class="menu__item-descr">
     ${this.text}
      </div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
      </div>`;
      this.parent.append(element);
    }
  }
  const getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  };

  getResource('http://localhost:3000/menu').then((data) => {
    data.forEach(({ img, altimg, title, descr, price }) => {
      new Cards(img, altimg, title, descr, price, '.menu .container').render();
    });
  });

  // axios.get('http://localhost:3000/menu').then((data) => {
  //   data.data.forEach(({ img, altimg, title, descr, price }) => {
  //     new Cards(img, altimg, title, descr, price, '.menu .container').render();
  //   });
  // });
}

module.exports = cards;


/***/ }),

/***/ "../js/modules/forms.js":
/*!******************************!*\
  !*** ../js/modules/forms.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function forms() {
  //Forms
  const forms = document.querySelectorAll('form');
  const message = {
    loading: 'img/form/spinner.svg',
    success: 'success',
    failure: 'fail',
  };

  forms.forEach((form, i) => {
    bindpostData(form);
  });

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: data,
    });
    return await res.json();
  };

  function bindpostData(form) {
    form.addEventListener('submit', (e) => {
      //обработчик события на отправку
      e.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
      display:block;
      margin: 0 auto;
      `;
      //form.append(statusMessage);
      form.insertAdjacentElement('afterend', statusMessage);

      const formData = new FormData(form);
      // const request = new XMLHttpRequest(); // создаем запрос
      // request.open('POST', 'server.php'); //меняем на новый фетч

      //request.setRequestHeader('Content-type', 'application/json');

      // const object = {};
      // formData.forEach(function (value, key) {
      //   object[key] = value;
      // });

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      //const json = JSON.stringify(object);
      // request.send(json); // отправляем запрос
      postData('http://localhost:3000/requests', json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });

      // request.addEventListener('load', () => {
      //   //создаем обработчик событий, что реквест загрузился!!
      //   if (request.status === 200) {
      //     console.log(request.response);
      //     showThanksModal(message.success);
      //     //statusMessage.textContent = message.success;
      //     form.reset();
      //     statusMessage.remove();
      //   } else {
      //     showThanksModal(message.failure);
      //     //statusMessage.textContent = message.failure;
      //   }
      // });
    });
  }
}

module.exports = forms;


/***/ }),

/***/ "../js/modules/modal.js":
/*!******************************!*\
  !*** ../js/modules/modal.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function modal() {
  // modalView

  const modalBtns = document.querySelectorAll('[data-modal]');
  const modalView = document.querySelector('.modal');

  function openModal() {
    modalView.classList.add('show');
    modalView.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
  }

  function closeModal() {
    modalView.classList.add('hide');
    modalView.classList.remove('show');
    document.body.style.overflow = '';
    //modalView.style.display = 'none';
  }

  modalBtns.forEach((item, i) => {
    item.addEventListener('click', openModal);
  });

  modalView.addEventListener('click', (e) => {
    if (e.target == modalView || e.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modalView.classList.contains('show')) {
      closeModal();
    }
  });
  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);
  //modalTime();
  const modalTimerId = setTimeout(openModal, 50000);

  //modal window for user
  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
    <div class="modal__content">
      <div data-close class="modal__close">&times;</div>
      <div class="modal__title"> ${message} </div>
    </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 4000);
  }
}

module.exports = modal;


/***/ }),

/***/ "../js/modules/slider.js":
/*!*******************************!*\
  !*** ../js/modules/slider.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function slider() {
  //slider easy variation
  const slideImages = document.querySelectorAll('.offer__slide'),
    slider = document.querySelector('.offer__slider');
  const prevImage = document.querySelector('.offer__slider-prev');
  const nextImage = document.querySelector('.offer__slider-next'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current');
  let currentSlide = 1;
  //<---- начало старого кода ---->
  // showCurrentSlide(currentSlide);

  // if (slideImages.length < 10) {
  //   total.textContent = `0${slideImages.length}`;
  // } else {
  //   total.textContent = `${slideImages.length}`;
  // }

  // function showCurrentSlide(n) {
  //   if (n > slideImages.length) {
  //     currentSlide = 1;
  //   }
  //   if (n < 1) {
  //     currentSlide = slideImages.length;
  //   }
  //   slideImages.forEach((item) => item.classList.add('hide'));
  //   slideImages[currentSlide - 1].classList.add('show');
  //   slideImages[currentSlide - 1].classList.remove('hide');

  //   if (slideImages.length < 10) {
  //     current.textContent = `0${currentSlide}`;
  //   } else {
  //     current.textContent = `${currentSlide}`;
  //   }
  // }

  // function plusSlides(n) {
  //   showCurrentSlide((currentSlide += n));
  // }
  // prevImage.addEventListener('click', () => {
  //   plusSlides(-1);
  // });
  // nextImage.addEventListener('click', () => {
  //   plusSlides(1);
  // });
  // <---- конец старого кода ---->

  // slider corousel variation
  const sliderWrapper = document.querySelector('.offer__slider-wrapper'),
    slidesField = document.querySelector('.offer__slider-inner'),
    width = window.getComputedStyle(sliderWrapper).width;

  let offset = 0;
  // тут делаем визуал
  if (slideImages.length < 10) {
    total.textContent = `0${slideImages.length}`;
    current.textContent = `0${currentSlide}`;
  } else {
    total.textContent = `${slideImages.length}`;
    current.textContent = `${currentSlide}`;
  }

  slidesField.style.width = 100 * slideImages.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = 'all 0.5s';

  sliderWrapper.style.overflow = 'hidden';

  slideImages.forEach((slide) => {
    slide.style.width = width;
  });

  slider.style.position = 'relative';

  const indicators = document.createElement('ol'),
    dots = [];
  indicators.classList.add('carousel-indicators');

  slider.append(indicators);

  for (let i = 0; i < slideImages.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  function deleteNotDigits(str) {
    return +str.replace(/\D/g, '');
  }

  nextImage.addEventListener('click', () => {
    if (offset == deleteNotDigits(width) * (slideImages.length - 1)) {
      offset = 0;
    } else {
      offset += deleteNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    // тут делаем логику изменения значений куррент слайд, дл отображение на странице из-за нажатий
    if (currentSlide == slideImages.length) {
      currentSlide = 1;
    } else {
      currentSlide++;
    }
    if (slideImages.length < 10) {
      current.textContent = `0${currentSlide}`;
    } else {
      current.textContent = currentSlide;
    }

    dots.forEach((dot) => (dot.style.opacity = '0.5'));
    dots[currentSlide - 1].style.opacity = 1;
  });

  prevImage.addEventListener('click', () => {
    if (offset == 0) {
      offset = deleteNotDigits(width) * (slideImages.length - 1);
    } else {
      offset -= deleteNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    // тут делаем логику изменения значений куррент слайд, дл отображение на странице из-за нажатий
    if (currentSlide == 1) {
      currentSlide = slideImages.length;
    } else {
      currentSlide--;
    }

    if (slideImages.length < 10) {
      current.textContent = `0${currentSlide}`;
    } else {
      current.textContent = currentSlide;
    }
    dots.forEach((dot) => (dot.style.opacity = '0.5'));
    dots[currentSlide - 1].style.opacity = 1;
  });
  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');

      currentSlide = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slideImages.length < 10) {
        current.textContent = `0${currentSlide}`;
      } else {
        current.textContent = currentSlide;
      }

      dots.forEach((dot) => (dot.style.opacity = '0.5'));
      dots[currentSlide - 1].style.opacity = 1;
    });
  });
}

module.exports = slider;


/***/ }),

/***/ "../js/modules/tabs.js":
/*!*****************************!*\
  !*** ../js/modules/tabs.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function tabs() {
  //tabs
  const tabItems = document.querySelector('.tabheader__items');
  const tabsContent = document.querySelectorAll('.tabcontent');
  const tabArr = tabItems.querySelectorAll('.tabheader__item');

  function tabActive(event) {
    const target = event.target;
    if (target && target.classList.contains('tabheader__item')) {
      tabArr.forEach((item, i) => {
        if (target === item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  }

  function hideTabContent() {
    tabArr.forEach((items, i) => {
      items.classList.remove('tabheader__item_active');
    });
    tabsContent.forEach((item) => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.remove('hide');
    tabsContent[i].classList.add('show', 'fade');
    tabArr[i].classList.add('tabheader__item_active');
  }
  hideTabContent();
  showTabContent();

  tabItems.addEventListener('click', tabActive);
}

module.exports = tabs;


/***/ }),

/***/ "../js/modules/timer.js":
/*!******************************!*\
  !*** ../js/modules/timer.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function timer() {
  //timer
  const deadLineDate = '2020-07-06';

  function getTimeRemaining(endTime) {
    const t = Date.parse(endTime) - Date.parse(new Date()),
      days = Math.floor(t / (60 * 60 * 24 * 1000)),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((t / (1000 * 60)) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endTime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);
    updateClock();
    function updateClock() {
      const t = getTimeRemaining(endTime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);
      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock('.timer', deadLineDate);
}

module.exports = timer;


/***/ }),

/***/ "../js/script.js":
/*!***********************!*\
  !*** ../js/script.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

window.addEventListener('DOMContentLoaded', () => {
  const tabs = __webpack_require__(/*! ./modules/tabs */ "../js/modules/tabs.js"),
    modal = __webpack_require__(/*! ./modules/modal */ "../js/modules/modal.js"),
    calc = __webpack_require__(/*! ./modules/calc */ "../js/modules/calc.js"),
    cards = __webpack_require__(/*! ./modules/cards */ "../js/modules/cards.js"),
    forms = __webpack_require__(/*! ./modules/forms */ "../js/modules/forms.js"),
    slider = __webpack_require__(/*! ./modules/slider */ "../js/modules/slider.js"),
    timer = __webpack_require__(/*! ./modules/timer */ "../js/modules/timer.js");

  tabs();
  modal();
  calc();
  cards();
  forms();
  slider();
  timer();

  // package json - test for console
  fetch('http://localhost:3000/menu')
    .then((data) => data.json())
    .then((res) => console.log(res));
});


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map