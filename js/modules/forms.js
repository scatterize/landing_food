import { openModal, closeModal } from './modal';
import { postData } from '../services/services';
function forms(formSelector, modalTimerId) {
  //Forms
  const forms = document.querySelectorAll(formSelector);
  const message = {
    loading: 'img/form/spinner.svg',
    success: 'success',
    failure: 'fail',
  };

  forms.forEach((form, i) => {
    bindpostData(form);
  });

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
    openModal('.modal', modalTimerId);

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
      closeModal('.modal');
    }, 4000);
  }
}

export default forms;
