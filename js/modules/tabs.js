function tabs(
  tabsSelector,
  tabsContentSelector,
  tabsParentSelector,
  activeClass
) {
  //tabs
  const tabArr = document.querySelectorAll(tabsSelector);
  const tabsContent = document.querySelectorAll(tabsContentSelector);
  const tabItems = document.querySelector(tabsParentSelector);

  function tabActive(event) {
    const target = event.target;
    if (target && target.classList.contains(tabsSelector.slice(1))) {
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
      items.classList.remove(activeClass);
    });
    tabsContent.forEach((item) => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.remove('hide');
    tabsContent[i].classList.add('show', 'fade');
    tabArr[i].classList.add(activeClass);
  }
  hideTabContent();
  showTabContent();

  tabItems.addEventListener('click', tabActive);
}

export default tabs;
