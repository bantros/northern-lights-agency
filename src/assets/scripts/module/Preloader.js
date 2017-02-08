'use strict';

export const Preloader = {

  elem        : document.getElementById('js-preloader'),
  main        : document.getElementById('js-main'),
  percentage  : 0,
  counter     : 1,
  imgList     : [
    '/assets/images/Armor-Lux_01.jpg',
    '/assets/images/Armor-Lux_02.jpg',
    '/assets/images/Farah_01.jpg',
    '/assets/images/Farah_02.jpg',
    '/assets/images/Hero_01.jpg',
    '/assets/images/Matsumoto_01.jpg',
    '/assets/images/Matsumoto_02.jpg',
    '/assets/images/Penguin_01.jpg',
    '/assets/images/Showroom_01.jpg',
    '/assets/images/Showroom_02.jpg'
  ],

  init() {
    this.render();
  },

  updateStatus(img) {

    img.addEventListener('load', () => {
      Preloader.percentage = Math.floor(Preloader.counter / 10 * 100);
      Preloader.elem.style.width = Preloader.percentage + '%';
      Preloader.counter++;
      if (this.percentage === 100) {
        this.main.classList.remove('is-preloading');
      }
    });

  },

  render() {

    for (let i = 0; i < this.imgList.length; i++) {
      let img = document.createElement('img');
      img.src = this.imgList[i];
      this.updateStatus(img);
    }

  }

};
