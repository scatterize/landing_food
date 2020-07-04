import { getResource } from '../services/services';
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

export default cards;
