/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	module.exports = __webpack_require__(5);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ContactForm = __webpack_require__(2);

	var _Instagram = __webpack_require__(3);

	var _Sticky = __webpack_require__(5);

	(function () {

	  document.documentElement.className = 'js';

	  _ContactForm.ContactForm.init();
	  _Instagram.Instagram.init();
	  _Sticky.Sticky.init();

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
	  (function (i, s, o, g, r, a, m) {
	    i['GoogleAnalyticsObject'] = r;i[r] = i[r] || function () {
	      (i[r].q = i[r].q || []).push(arguments);
	    }, i[r].l = 1 * new Date();a = s.createElement(o), m = s.getElementsByTagName(o)[0];a.async = 1;a.src = g;m.parentNode.insertBefore(a, m);
	  })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
	  ga('create', 'UA-30642749-1', 'auto');
	  ga('send', 'pageview');
	}
	/* jshint ignore:end */

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ContactForm = exports.ContactForm = {

	  elem: document.getElementById('js-contactForm'),
	  btn: document.getElementById('js-contactSubmit'),
	  formSpreeUrl: '//formspree.io/jonathonhalliwell@gmail.com',

	  init: function init() {
	    this.render();
	  },
	  pushToStorage: function pushToStorage(e) {

	    e.preventDefault();

	    var request = new XMLHttpRequest(),
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
	    };
	  },
	  render: function render() {

	    if (this.elem) {
	      this.elem.addEventListener('submit', this.pushToStorage, false);
	    }
	  }
	};

	// var request = new XMLHttpRequest();
	// request.open('POST', '/my/url', true);
	// request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	// request.send(data);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Instagram = undefined;

	var _instafeed = __webpack_require__(4);

	var _instafeed2 = _interopRequireDefault(_instafeed);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Instagram = exports.Instagram = {

	  elem: document.getElementById('js-instagram'),
	  storage: localStorage.getItem('instafeed'),
	  clientId: '3c573571bd3f441593c1644b762db880',
	  accessToken: '104897.3c57357.557d3bfd116e4b0d9f433b4278f5711e',
	  userId: '104897',
	  // userId       : '478753123',

	  init: function init() {
	    this.render();
	  },
	  getFeed: function getFeed() {

	    var feed = new _instafeed2.default({
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
	      success: function success(json) {
	        Instagram.pushToStorage(json);
	      },
	      error: function error(err) {
	        console.log('Error fetching images via Instafeed: ' + err);
	      }
	    });

	    feed.run();
	  },
	  pushToStorage: function pushToStorage(json) {

	    var item = json.data,
	        expire = 24 * 60 * 60 * 1000,
	        record = { timestamp: new Date().getTime() + expire, json: JSON.stringify(json) };

	    localStorage.setItem('instafeed', JSON.stringify(record));

	    this.createItem(item);
	  },
	  fetchFromStorage: function fetchFromStorage() {

	    var instafeed = JSON.parse(localStorage.getItem('instafeed')),
	        json = JSON.parse(instafeed.json),
	        item = json.data;

	    if (instafeed.timestamp > new Date().getTime()) {
	      this.createItem(item);
	    } else {
	      this.getFeed();
	    }
	  },
	  createItem: function createItem(item) {

	    for (var i = 0; i < item.length; i++) {
	      Instagram.elem.insertAdjacentHTML('beforeend', '<div class="instagram__item"><a target="_blank" href="' + item[i].link + '"><img class="h-fluid-image" src="' + item[i].images.standard_resolution.url + '" width="640" height="640" alt="' + item[i].id + '"></a></div>');
	    }
	  },
	  render: function render() {

	    if (this.storage) {
	      this.fetchFromStorage();
	    } else {
	      this.getFeed();
	    }
	  }
		};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Generated by CoffeeScript 1.9.3
	(function() {
	  var Instafeed;

	  Instafeed = (function() {
	    function Instafeed(params, context) {
	      var option, value;
	      this.options = {
	        target: 'instafeed',
	        get: 'popular',
	        resolution: 'thumbnail',
	        sortBy: 'none',
	        links: true,
	        mock: false,
	        useHttp: false
	      };
	      if (typeof params === 'object') {
	        for (option in params) {
	          value = params[option];
	          this.options[option] = value;
	        }
	      }
	      this.context = context != null ? context : this;
	      this.unique = this._genKey();
	    }

	    Instafeed.prototype.hasNext = function() {
	      return typeof this.context.nextUrl === 'string' && this.context.nextUrl.length > 0;
	    };

	    Instafeed.prototype.next = function() {
	      if (!this.hasNext()) {
	        return false;
	      }
	      return this.run(this.context.nextUrl);
	    };

	    Instafeed.prototype.run = function(url) {
	      var header, instanceName, script;
	      if (typeof this.options.clientId !== 'string') {
	        if (typeof this.options.accessToken !== 'string') {
	          throw new Error("Missing clientId or accessToken.");
	        }
	      }
	      if (typeof this.options.accessToken !== 'string') {
	        if (typeof this.options.clientId !== 'string') {
	          throw new Error("Missing clientId or accessToken.");
	        }
	      }
	      if ((this.options.before != null) && typeof this.options.before === 'function') {
	        this.options.before.call(this);
	      }
	      if (typeof document !== "undefined" && document !== null) {
	        script = document.createElement('script');
	        script.id = 'instafeed-fetcher';
	        script.src = url || this._buildUrl();
	        header = document.getElementsByTagName('head');
	        header[0].appendChild(script);
	        instanceName = "instafeedCache" + this.unique;
	        window[instanceName] = new Instafeed(this.options, this);
	        window[instanceName].unique = this.unique;
	      }
	      return true;
	    };

	    Instafeed.prototype.parse = function(response) {
	      var anchor, childNodeCount, childNodeIndex, childNodesArr, e, eMsg, fragment, header, htmlString, httpProtocol, i, image, imageObj, imageString, imageUrl, images, img, imgHeight, imgOrient, imgUrl, imgWidth, instanceName, j, k, len, len1, len2, node, parsedLimit, reverse, sortSettings, targetEl, tmpEl;
	      if (typeof response !== 'object') {
	        if ((this.options.error != null) && typeof this.options.error === 'function') {
	          this.options.error.call(this, 'Invalid JSON data');
	          return false;
	        } else {
	          throw new Error('Invalid JSON response');
	        }
	      }
	      if (response.meta.code !== 200) {
	        if ((this.options.error != null) && typeof this.options.error === 'function') {
	          this.options.error.call(this, response.meta.error_message);
	          return false;
	        } else {
	          throw new Error("Error from Instagram: " + response.meta.error_message);
	        }
	      }
	      if (response.data.length === 0) {
	        if ((this.options.error != null) && typeof this.options.error === 'function') {
	          this.options.error.call(this, 'No images were returned from Instagram');
	          return false;
	        } else {
	          throw new Error('No images were returned from Instagram');
	        }
	      }
	      if ((this.options.success != null) && typeof this.options.success === 'function') {
	        this.options.success.call(this, response);
	      }
	      this.context.nextUrl = '';
	      if (response.pagination != null) {
	        this.context.nextUrl = response.pagination.next_url;
	      }
	      if (this.options.sortBy !== 'none') {
	        if (this.options.sortBy === 'random') {
	          sortSettings = ['', 'random'];
	        } else {
	          sortSettings = this.options.sortBy.split('-');
	        }
	        reverse = sortSettings[0] === 'least' ? true : false;
	        switch (sortSettings[1]) {
	          case 'random':
	            response.data.sort(function() {
	              return 0.5 - Math.random();
	            });
	            break;
	          case 'recent':
	            response.data = this._sortBy(response.data, 'created_time', reverse);
	            break;
	          case 'liked':
	            response.data = this._sortBy(response.data, 'likes.count', reverse);
	            break;
	          case 'commented':
	            response.data = this._sortBy(response.data, 'comments.count', reverse);
	            break;
	          default:
	            throw new Error("Invalid option for sortBy: '" + this.options.sortBy + "'.");
	        }
	      }
	      if ((typeof document !== "undefined" && document !== null) && this.options.mock === false) {
	        images = response.data;
	        parsedLimit = parseInt(this.options.limit, 10);
	        if ((this.options.limit != null) && images.length > parsedLimit) {
	          images = images.slice(0, parsedLimit);
	        }
	        fragment = document.createDocumentFragment();
	        if ((this.options.filter != null) && typeof this.options.filter === 'function') {
	          images = this._filter(images, this.options.filter);
	        }
	        if ((this.options.template != null) && typeof this.options.template === 'string') {
	          htmlString = '';
	          imageString = '';
	          imgUrl = '';
	          tmpEl = document.createElement('div');
	          for (i = 0, len = images.length; i < len; i++) {
	            image = images[i];
	            imageObj = image.images[this.options.resolution];
	            if (typeof imageObj !== 'object') {
	              eMsg = "No image found for resolution: " + this.options.resolution + ".";
	              throw new Error(eMsg);
	            }
	            imgWidth = imageObj.width;
	            imgHeight = imageObj.height;
	            imgOrient = "square";
	            if (imgWidth > imgHeight) {
	              imgOrient = "landscape";
	            }
	            if (imgWidth < imgHeight) {
	              imgOrient = "portrait";
	            }
	            imageUrl = imageObj.url;
	            httpProtocol = window.location.protocol.indexOf("http") >= 0;
	            if (httpProtocol && !this.options.useHttp) {
	              imageUrl = imageUrl.replace(/https?:\/\//, '//');
	            }
	            imageString = this._makeTemplate(this.options.template, {
	              model: image,
	              id: image.id,
	              link: image.link,
	              type: image.type,
	              image: imageUrl,
	              width: imgWidth,
	              height: imgHeight,
	              orientation: imgOrient,
	              caption: this._getObjectProperty(image, 'caption.text'),
	              likes: image.likes.count,
	              comments: image.comments.count,
	              location: this._getObjectProperty(image, 'location.name')
	            });
	            htmlString += imageString;
	          }
	          tmpEl.innerHTML = htmlString;
	          childNodesArr = [];
	          childNodeIndex = 0;
	          childNodeCount = tmpEl.childNodes.length;
	          while (childNodeIndex < childNodeCount) {
	            childNodesArr.push(tmpEl.childNodes[childNodeIndex]);
	            childNodeIndex += 1;
	          }
	          for (j = 0, len1 = childNodesArr.length; j < len1; j++) {
	            node = childNodesArr[j];
	            fragment.appendChild(node);
	          }
	        } else {
	          for (k = 0, len2 = images.length; k < len2; k++) {
	            image = images[k];
	            img = document.createElement('img');
	            imageObj = image.images[this.options.resolution];
	            if (typeof imageObj !== 'object') {
	              eMsg = "No image found for resolution: " + this.options.resolution + ".";
	              throw new Error(eMsg);
	            }
	            imageUrl = imageObj.url;
	            httpProtocol = window.location.protocol.indexOf("http") >= 0;
	            if (httpProtocol && !this.options.useHttp) {
	              imageUrl = imageUrl.replace(/https?:\/\//, '//');
	            }
	            img.src = imageUrl;
	            if (this.options.links === true) {
	              anchor = document.createElement('a');
	              anchor.href = image.link;
	              anchor.appendChild(img);
	              fragment.appendChild(anchor);
	            } else {
	              fragment.appendChild(img);
	            }
	          }
	        }
	        targetEl = this.options.target;
	        if (typeof targetEl === 'string') {
	          targetEl = document.getElementById(targetEl);
	        }
	        if (targetEl == null) {
	          eMsg = "No element with id=\"" + this.options.target + "\" on page.";
	          throw new Error(eMsg);
	        }
	        targetEl.appendChild(fragment);
	        header = document.getElementsByTagName('head')[0];
	        header.removeChild(document.getElementById('instafeed-fetcher'));
	        instanceName = "instafeedCache" + this.unique;
	        window[instanceName] = void 0;
	        try {
	          delete window[instanceName];
	        } catch (_error) {
	          e = _error;
	        }
	      }
	      if ((this.options.after != null) && typeof this.options.after === 'function') {
	        this.options.after.call(this);
	      }
	      return true;
	    };

	    Instafeed.prototype._buildUrl = function() {
	      var base, endpoint, final;
	      base = "https://api.instagram.com/v1";
	      switch (this.options.get) {
	        case "popular":
	          endpoint = "media/popular";
	          break;
	        case "tagged":
	          if (!this.options.tagName) {
	            throw new Error("No tag name specified. Use the 'tagName' option.");
	          }
	          endpoint = "tags/" + this.options.tagName + "/media/recent";
	          break;
	        case "location":
	          if (!this.options.locationId) {
	            throw new Error("No location specified. Use the 'locationId' option.");
	          }
	          endpoint = "locations/" + this.options.locationId + "/media/recent";
	          break;
	        case "user":
	          if (!this.options.userId) {
	            throw new Error("No user specified. Use the 'userId' option.");
	          }
	          endpoint = "users/" + this.options.userId + "/media/recent";
	          break;
	        default:
	          throw new Error("Invalid option for get: '" + this.options.get + "'.");
	      }
	      final = base + "/" + endpoint;
	      if (this.options.accessToken != null) {
	        final += "?access_token=" + this.options.accessToken;
	      } else {
	        final += "?client_id=" + this.options.clientId;
	      }
	      if (this.options.limit != null) {
	        final += "&count=" + this.options.limit;
	      }
	      final += "&callback=instafeedCache" + this.unique + ".parse";
	      return final;
	    };

	    Instafeed.prototype._genKey = function() {
	      var S4;
	      S4 = function() {
	        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	      };
	      return "" + (S4()) + (S4()) + (S4()) + (S4());
	    };

	    Instafeed.prototype._makeTemplate = function(template, data) {
	      var output, pattern, ref, varName, varValue;
	      pattern = /(?:\{{2})([\w\[\]\.]+)(?:\}{2})/;
	      output = template;
	      while (pattern.test(output)) {
	        varName = output.match(pattern)[1];
	        varValue = (ref = this._getObjectProperty(data, varName)) != null ? ref : '';
	        output = output.replace(pattern, function() {
	          return "" + varValue;
	        });
	      }
	      return output;
	    };

	    Instafeed.prototype._getObjectProperty = function(object, property) {
	      var piece, pieces;
	      property = property.replace(/\[(\w+)\]/g, '.$1');
	      pieces = property.split('.');
	      while (pieces.length) {
	        piece = pieces.shift();
	        if ((object != null) && piece in object) {
	          object = object[piece];
	        } else {
	          return null;
	        }
	      }
	      return object;
	    };

	    Instafeed.prototype._sortBy = function(data, property, reverse) {
	      var sorter;
	      sorter = function(a, b) {
	        var valueA, valueB;
	        valueA = this._getObjectProperty(a, property);
	        valueB = this._getObjectProperty(b, property);
	        if (reverse) {
	          if (valueA > valueB) {
	            return 1;
	          } else {
	            return -1;
	          }
	        }
	        if (valueA < valueB) {
	          return 1;
	        } else {
	          return -1;
	        }
	      };
	      data.sort(sorter.bind(this));
	      return data;
	    };

	    Instafeed.prototype._filter = function(images, filter) {
	      var filteredImages, fn, i, image, len;
	      filteredImages = [];
	      fn = function(image) {
	        if (filter(image)) {
	          return filteredImages.push(image);
	        }
	      };
	      for (i = 0, len = images.length; i < len; i++) {
	        image = images[i];
	        fn(image);
	      }
	      return filteredImages;
	    };

	    return Instafeed;

	  })();

	  (function(root, factory) {
	    if (true) {
	      return !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module === 'object' && module.exports) {
	      return module.exports = factory();
	    } else {
	      return root.Instafeed = factory();
	    }
	  })(this, function() {
	    return Instafeed;
	  });

	}).call(this);


/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Sticky = exports.Sticky = {

	  item: document.querySelectorAll('[data-strip="item"]'),

	  init: function init() {
	    this.render();
	  },
	  classHandler: function classHandler() {

	    for (var i = 0; i < Sticky.item.length; i++) {

	      var item = Sticky.item[i],
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
	  render: function render() {

	    if (this.item) {

	      window.addEventListener('scroll', this.classHandler, false);
	      window.addEventListener('resize', this.classHandler, false);
	    }
	  }
		};

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map