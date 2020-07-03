window.addEventListener('DOMContentLoaded', () => {
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

  // getResource('http://localhost:3000/menu').then((data) => {
  // data.forEach(({ img, altimg, title, descr, price }) => {
  //   new Cards(img, altimg, title, descr, price, '.menu .container').render();
  // });
  // });

  axios.get('http://localhost:3000/menu').then((data) => {
    data.data.forEach(({ img, altimg, title, descr, price }) => {
      new Cards(img, altimg, title, descr, price, '.menu .container').render();
    });
  });

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

  // package json
  fetch('http://localhost:3000/menu')
    .then((data) => data.json())
    .then((res) => console.log(res));

  //slider easy variation
  const slideImages = document.querySelectorAll('.offer__slide');
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

  nextImage.addEventListener('click', () => {
    if (
      offset ==
      +width.slice(0, width.length - 2) * (slideImages.length - 1)
    ) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
      slidesField.style.transform = `translateX(-${offset}px)`;
    }

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
  });

  prevImage.addEventListener('click', () => {
    if (offset == 0) {
      offset = +width.slice(0, width.length - 2) * (slideImages.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
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
  });
});
