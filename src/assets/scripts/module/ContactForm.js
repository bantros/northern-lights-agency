'use strict';

export const ContactForm = {

  elem          : document.getElementById('js-contactForm'),
  btn           : document.getElementById('js-contactSubmit'),
  formSpreeUrl  : '//formspree.io/jonathonhalliwell@gmail.com',

  init() {
    this.render();
  },

  pushToStorage(e) {

    e.preventDefault();

    let request = new XMLHttpRequest(),
    formData = new FormData(ContactForm.elem);

    request.open('POST', ContactForm.formSpreeUrl, true);
    request.setRequestHeader('accept', 'application/json');
    request.send(formData);

    request.onreadystatechange = function () {
      if (request.readyState < 4) {
        ContactForm.btn.setAttribute('disabled', 'disabled');
        ContactForm.btn.value = 'Loading...';
      } else if (request.readyState === 4) {
        if (request.status == 200 && request.status < 300) {
          ContactForm.btn.value = 'Sent';
        } else {
          ContactForm.btn.removeAttribute('disabled');
          ContactForm.btn.value = 'Send';
        }
      }
    }

  },

  render() {

    if (this.elem) {
      this.elem.addEventListener('submit', this.pushToStorage, false);
    }

  }

};

// var request = new XMLHttpRequest();
// request.open('POST', '/my/url', true);
// request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
// request.send(data);
