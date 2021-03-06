'use strict';

import Instafeed from 'instafeed.js';

export const Instagram = {

  elem         : document.getElementById('js-instagram'),
  storage      : localStorage.getItem('instafeed'),
  clientId     : '3c573571bd3f441593c1644b762db880',
  accessToken  : '478753123.3c57357.f96c15f8d7314f9396a550f7c1b78d0a',
  userId       : '478753123',

  init() {
    this.render();
  },

  createItem(item) {

    for (let i = 0; i < item.length; i++) {
      Instagram.elem.insertAdjacentHTML('beforeend', '<div class="instagram__item"><a target="_blank" href="' + item[i].link + '"><img class="h-fluid-image" src="' + item[i].images.standard_resolution.url + '" width="640" height="640" alt="' + item[i].id + '"></a></div>');
    }

  },

  pushToStorage(json) {

    let item = json.data, expire = 24 * 60 * 60 * 1000,
    record = { timestamp: new Date().getTime() + expire, json: JSON.stringify(json) };

    localStorage.setItem('instafeed', JSON.stringify(record));

    this.createItem(item);

  },

  getFeed() {

    let feed = new Instafeed({
      clientId: Instagram.clientId,
      accessToken: Instagram.accessToken,
      get: 'user',
      userId: Instagram.userId,
      target: 'js-instagram',
      limit: 8,
      resolution: 'standard_resolution',
      mock: true,
      success: function(json) {
        Instagram.pushToStorage(json);
      },
      error: function(err) {
        console.log('Error fetching images via Instafeed: ' + err);
      }
    });

    feed.run();

  },

  fetchFromStorage() {

    let instafeed = JSON.parse(localStorage.getItem('instafeed')),
    json = JSON.parse(instafeed.json), item = json.data;

    if (instafeed.timestamp > new Date().getTime()) {
      this.createItem(item);
    } else {
      this.getFeed();
    }

  },

  render() {

    if (!this.elem) {
      return false;
    }

    if (this.storage) {
      this.fetchFromStorage();
    } else {
      this.getFeed();
    }
  }

};
