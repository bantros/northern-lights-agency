'use strict';

import Instafeed from 'instafeed.js';

export const Instagram = {

  elem         : document.getElementById('js-instagram'),
  storage      : localStorage.getItem('instafeed'),
  clientId     : '3c573571bd3f441593c1644b762db880',
  accessToken  : '104897.3c57357.557d3bfd116e4b0d9f433b4278f5711e',
  userId       : '104897',
  // userId       : '478753123',

  init() {
    this.render();
  },

  getFeed() {

    let feed = new Instafeed({
      clientId: Instagram.clientId,
      accessToken: Instagram.accessToken,
      get: 'user',
      userId: Instagram.userId,
      target: 'js-instagram',
      limit: 6,
      resolution: 'standard_resolution',
      mock: true,
      // after: function() {
      //   Instagram.elem.classList.add('is-active');
      // },
      success: function(json) {
        Instagram.pushToStorage(json);
      },
      error: function(err) {
        console.log('Error fetching images via Instafeed: ' + err);
      }
    });

    feed.run();

  },

  pushToStorage(json) {

    let item = json.data, expire = 24 * 60 * 60 * 1000,
    record = { timestamp: new Date().getTime() + expire, json: JSON.stringify(json) };

    localStorage.setItem('instafeed', JSON.stringify(record));

    this.createItem(item);

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

  createItem(item) {

    for (let i = 0; i < item.length; i++) {
      Instagram.elem.insertAdjacentHTML('beforeend', '<div class="instagram__item"><a target="_blank" href="' + item[i].link + '"><img class="h-fluid-image" src="' + item[i].images.standard_resolution.url + '" width="640" height="640" alt="' + item[i].id + '"></a></div>');
    }

  },

  render() {

    if (this.storage) {
      this.fetchFromStorage();
    } else {
      this.getFeed();
    }

  }

};
