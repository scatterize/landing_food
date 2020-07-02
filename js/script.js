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

  new Cards(
    'img/tabs/vegy.jpg',
    'vegy',
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    '.menu .container',
    'menu__item',
    'big'
  ).render();
  new Cards(
    'img/tabs/elite.jpg',
    'elite',
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    14,
    '.menu .container',
    'menu__item',
    'big'
  ).render();
  new Cards(
    'img/tabs/post.jpg',
    'post',
    'Меню "Постное"',
    '  Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу  и импортных вегетарианских стейков.',
    21,
    '.menu .container',
    'menu__item',
    'big'
  ).render();

  //Forms
  const forms = document.querySelectorAll('form');
  const message = {
    loading: 'img/form/spinner.svg',
    success: 'success',
    failure: 'fail',
  };

  forms.forEach((form, i) => {
    postData(form);
  });

  function postData(form) {
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

      const object = {};

      formData.forEach(function (value, key) {
        object[key] = value;
      });

      const json = JSON.stringify(object);
      // request.send(json); // отправляем запрос
      fetch('server.php', {
        method: 'POST',
        body: json,
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((data) => data.text())
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
});
