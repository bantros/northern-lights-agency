'use strict';

export const Sticky = {

  item  : document.querySelectorAll('[data-strip="item"]'),

  init() {
    this.render();
  },

  classHandler() {

    for (let i = 0; i < Sticky.item.length; i++) {

      let item = Sticky.item[i],
      itemTop = item.getBoundingClientRect().top,
      itemBot = item.getBoundingClientRect().bottom,
      sticky = item.querySelector('[data-strip="sticky"]');

      if (itemTop <= 0 && itemBot >= sticky.offsetHeight) {

        Sticky.item[i].classList.add('is-sticky');
        Sticky.item[i].classList.remove('is-sticky--bottom');

      } else if (itemTop <= 0 && itemBot <= sticky.offsetHeight) {

        Sticky.item[i].classList.remove('is-sticky');
        Sticky.item[i].classList.add('is-sticky--bottom');

      } else {
        Sticky.item[i].classList.remove('is-sticky', 'is-sticky--bottom');
      }

    }

  },

  render() {

    if (this.item) {

      window.addEventListener('scroll', this.classHandler, false);
      window.addEventListener('resize', this.classHandler, false);

    }

  }

};
