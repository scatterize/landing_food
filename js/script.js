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
  const deadLineDate = '2020-07-02';

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
  const modalCloseBtn = document.querySelectorAll('[data-close]');
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
  modalCloseBtn.forEach((item, i) => {
    item.addEventListener('click', closeModal);
  });

  modalBtns.forEach((item, i) => {
    item.addEventListener('click', openModal);
  });

  modalView.addEventListener('click', (e) => {
    if (e.target == modalView) {
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
  const modalTimerId = setTimeout(openModal, 3000);

  //Class for cards
  class Cards {
    constructor(image, imageText, title, text, price, parentSelector) {
      this.image = image;
      this.imageText = imageText;
      this.title = title;
      this.text = text;
      this.price = price;
      this.transfer = 70;
      this.parent = document.querySelector(parentSelector);
      this.changeToRub();
    }
    changeToRub() {
      this.price = this.price * this.transfer;
    }
    render() {
      const element = document.createElement('div');
      //element.classList.add('menu__item');
      element.innerHTML = `
      <div class="menu__item">
      <img src=${this.image} alt=${this.imageText} />
      <h3 class="menu__item-subtitle">${this.title}</h3>
      <div class="menu__item-descr">
     ${this.text}
      </div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
      </div>
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
    '.menu .container'
  ).render();
  new Cards(
    'img/tabs/elite.jpg',
    'elite',
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    14,
    '.menu .container'
  ).render();
  new Cards(
    'img/tabs/post.jpg',
    'post',
    'Меню "Постное"',
    '  Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу  и импортных вегетарианских стейков.',
    21,
    '.menu .container'
  ).render();
});
