function forms() {
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
}

module.exports = forms;
