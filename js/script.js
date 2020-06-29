window.addEventListener('DOMContentLoaded', () => {
  const tabItems = document.querySelector('.tabheader__items');
  const tabsContent = document.querySelectorAll('.tabcontent');
  const tabArr = tabItems.querySelectorAll('.tabheader__item');

  function tabActive(event) {
    const target = event.target;

    console.dir(event.target);
    if (target && target.classList.contains('tabheader__item')) {
      tabArr.forEach((item, i) => {
        if (target === item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }

    //hideTabContent();
    //event.target.classList.add('tabheader__item_active');
  }
  function hideTabContent() {
    tabArr.forEach((items, i) => {
      items.classList.remove('tabheader__item_active');
    });
    tabsContent.forEach((item) => {
      // item.style.display = 'none';
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.remove('hide');
    tabsContent[i].classList.add('show', 'fade');
    //tabsContent[i].style.display = 'block';
    tabArr[i].classList.add('tabheader__item_active');
  }
  hideTabContent();
  showTabContent();

  tabItems.addEventListener('click', tabActive);
});
