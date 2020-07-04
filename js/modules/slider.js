function slider({
  container,
  slide,
  nextArrow,
  prevArrow,
  totalCounter,
  currentCounter,
  wrapper,
  field,
}) {
  //slider easy variation
  const slideImages = document.querySelectorAll(slide),
    slider = document.querySelector(container);
  const prevImage = document.querySelector(prevArrow);
  const nextImage = document.querySelector(nextArrow),
    total = document.querySelector(totalCounter),
    current = document.querySelector(currentCounter);
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
  const sliderWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
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

export default slider;
