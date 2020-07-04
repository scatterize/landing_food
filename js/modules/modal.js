function openModal(modalSelector, modalTimerId) {
  const modalView = document.querySelector(modalSelector);
  modalView.classList.add('show');
  modalView.classList.remove('hide');
  document.body.style.overflow = 'hidden';
  console.log(modalTimerId);
  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function closeModal(modalSelector) {
  const modalView = document.querySelector(modalSelector);
  modalView.classList.add('hide');
  modalView.classList.remove('show');
  document.body.style.overflow = '';
  //modalView.style.display = 'none';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  // modalView

  const modalBtns = document.querySelectorAll(triggerSelector);
  const modalView = document.querySelector(modalSelector);

  modalBtns.forEach((item, i) => {
    item.addEventListener('click', () =>
      openModal(modalSelector, modalTimerId)
    );
  });

  modalView.addEventListener('click', (e) => {
    if (e.target == modalView || e.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modalView.classList.contains('show')) {
      closeModal(modalSelector);
    }
  });
  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);
  //modalTime();
}

export default modal;
export { closeModal };
export { openModal };
