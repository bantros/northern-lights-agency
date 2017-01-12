'use strict';

import { ContactForm } from './module/ContactForm';
import { Instagram } from './module/Instagram';
import { Sticky } from './module/Sticky';

(function() {

  document.documentElement.className = 'js';

  ContactForm.init();
  Instagram.init();
  Sticky.init();

  // let everythingLoaded = setInterval(function() {
  //
  //   if (/loaded|complete/.test(document.readyState)) {
  //     clearInterval(everythingLoaded);
  //   }
  //
  // }, 10);

})();

// webfontloader

// var WebFont = require('webfontloader');

// WebFont.load({
//   google: {
//     families: ['Karla:400,700:latin', 'Merriweather:400,700:latin']
//   }
// });

// google analytics

/* jshint ignore:start */
if (window.location.host === 'northernlightsagency.co.uk') {
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-30642749-1', 'auto');
  ga('send', 'pageview');
}
/* jshint ignore:end */
