/******/ (() => { // webpackBootstrap
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other entry modules.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// import LocomotiveScroll from 'locomotive-scroll';
// Add your JavaScript code here
var FidatoPluginJS = /*#__PURE__*/function () {
  function FidatoPluginJS() {
    _classCallCheck(this, FidatoPluginJS);
    this.init();
  }
  return _createClass(FidatoPluginJS, [{
    key: "init",
    value: function init() {
      // wait until DOM is ready

      document.addEventListener("DOMContentLoaded", function (event) {
        console.log("DOM loaded");

        // add animation to all dividers
        var dividers = document.querySelectorAll('.elementor-widget-divider');
        for (var i = 0; i < dividers.length; i++) {
          // Access each element using elements[i]
          dividers[i].setAttribute('data-scroll', '');
          dividers[i].setAttribute('data-scroll-repeat', '');
          dividers[i].setAttribute('data-scroll-class', 'loco-in-view');
          //console.log(dividers[i]);
        }

        //wait until images, links, fonts, stylesheets, and js is loaded
        window.addEventListener("load", function (e) {
          console.log("window loaded");
          var scroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
            multiplier: 0.9,
            "class": 'loco-in-view'
          });

          // Initialize the main Swiper with the same navigation buttons
          var teamSwiper = new Swiper('.teamSwiper', {
            slidesPerView: 1.5,
            centeredSlides: true,
            loop: true,
            speed: 750,
            spaceBetween: 40,
            navigation: {
              nextEl: '.team-swiper-button-next',
              prevEl: '.team-swiper-button-prev'
            },
            breakpoints: {
              768: {
                slidesPerView: 2,
                spaceBetween: 50
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 72
              }
            }
          });
          var scrollTop = 0;
          scroll.on('scroll', function (obj) {
            // Current vertical scroll position
            scrollTop = obj.scroll.y;
            //console.log('Current scroll position:', scrollTop);

            // You can also get horizontal scroll if needed
            var scrollLeft = obj.scroll.x;
          });

          // Select all link elements within swiper-slide elements that are inside team-carousel
          document.querySelectorAll('.team-carousel .swiper-slide .link').forEach(function (link) {
            // Add click event listener to each link
            link.addEventListener('click', function (e) {
              e.preventDefault();
              var linkHref = this.getAttribute('href').toString();
              document.querySelector(linkHref).classList.add('active');
              console.log(linkHref);
              var teamPanelOverlay = document.querySelector('.panel-container');

              // Add 'active' class to the overlay
              scroll.stop();
              teamPanelOverlay.classList.add('active');
              teamPanelOverlay.style.top = scrollTop + 'px';
            });
          });
          this.document.querySelector('.team-panel--header .close').addEventListener('click', function () {
            var teamPanelOverlay = document.querySelector('.panel-container');
            teamPanelOverlay.classList.remove('active');
            document.querySelectorAll('.team-panel--content').forEach(function (link) {
              link.classList.remove('active');
            });
            // teamPanelOverlay.style.top = '0px';
            scroll.start();
          });
          this.document.querySelector('.team-panel--overlay').addEventListener('click', function () {
            console.log('overlay clicked');
            var teamPanelOverlay = document.querySelector('.panel-container');
            teamPanelOverlay.classList.remove('active');
            document.querySelectorAll('.team-panel--content').forEach(function (link) {
              link.classList.remove('active');
            });
            // teamPanelOverlay.style.top = '0px';
            scroll.start();
          });
        }, false);
      });
    }
  }]);
}();
new FidatoPluginJS();
})();

// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

})();

/******/ })()
;
//# sourceMappingURL=main.js.map