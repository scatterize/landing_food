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
