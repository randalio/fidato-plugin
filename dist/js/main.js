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
        }

        //wait until images, links, fonts, stylesheets, and js is loaded
        window.addEventListener("load", function (e) {
          console.log("window loaded");
          var scroll = null;

          // Initialize Locomotive Scroll
          scroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
            multiplier: 1,
            "class": 'loco-in-view',
            lerp: 0.05
          });

          // Keep a reference to scrollTop outside of the event handlers
          var scrollTop = 0;
          scroll.on('scroll', function (obj) {
            // Current vertical scroll position
            scrollTop = obj.scroll.y;
          });

          // Initialize the Swiper with proper configuration to avoid scroll conflicts

          // Initialize the Swiper with proper configuration to avoid scroll conflicts
          var overflowSwiper = new Swiper('.overflowSwiper', {
            slidesPerView: 1.33,
            centeredSlides: true,
            loop: false,
            speed: 500,
            spaceBetween: 36,
            mousewheel: false,
            keyboard: {
              enabled: true,
              onlyInViewport: true
            },
            navigation: {
              nextEl: '.overflow-swiper-button-next',
              prevEl: '.overflow-swiper-button-prev'
            },
            breakpoints: {
              768: {
                centeredSlides: false,
                slidesPerView: 2
              },
              1024: {
                centeredSlides: false,
                slidesPerView: 3
              }
            }
            // on: {
            //     // Important: Update Locomotive Scroll after swiper events
            //     slideChangeTransitionEnd: function() {
            //         if (scroll) {
            //             // Force Locomotive Scroll to update
            //             scroll.update();
            //         }
            //     },
            //     touchEnd: function() {
            //         if (scroll) {
            //             // Make sure Locomotive Scroll is updated after touch interactions
            //             setTimeout(() => {
            //                 scroll.update();
            //             }, 100);
            //         }
            //     }
            // }
          });
          var blueNumericSwiper = new Swiper('.blueNumericSwiper', {
            slidesPerView: 1.33,
            centeredSlides: true,
            loop: false,
            speed: 500,
            spaceBetween: 16,
            mousewheel: false,
            keyboard: {
              enabled: true,
              onlyInViewport: true
            },
            navigation: {
              nextEl: '.blue-numeric-swiper-button-next',
              prevEl: '.blue-numeric-swiper-button-prev'
            },
            breakpoints: {
              768: {
                slidesPerView: 2,
                centeredSlides: false,
                spaceBetween: 36
              },
              1024: {
                slidesPerView: 3,
                centeredSlides: false,
                spaceBetween: 36
              }
            }
            // on: {
            //     // Important: Update Locomotive Scroll after swiper events
            //     slideChangeTransitionEnd: function() {
            //         if (scroll) {
            //             // Force Locomotive Scroll to update
            //             scroll.update();
            //         }
            //     },
            //     touchEnd: function() {
            //         if (scroll) {
            //             // Make sure Locomotive Scroll is updated after touch interactions
            //             setTimeout(() => {
            //                 scroll.update();
            //             }, 100);
            //         }
            //     }
            // }
          });
          var learningCenterSwiper = new Swiper('.learningCenterSwiper', {
            slidesPerView: 1,
            centeredSlides: false,
            loop: false,
            speed: 500,
            spaceBetween: 36,
            mousewheel: false,
            keyboard: {
              enabled: true,
              onlyInViewport: true
            },
            navigation: {
              nextEl: '.learning-center-swiper-button-next',
              prevEl: '.learning-center-swiper-button-prev'
            }
          });

          // Update Locomotive Scroll after Swiper initialization
          setTimeout(function () {
            if (scroll) {
              scroll.update();
            }
          }, 500);
          if (document.querySelectorAll('.team-carousel').length) {
            // Initialize the Swiper with proper configuration to avoid jump on loop
            var teamSwiper = new Swiper('.teamSwiper', {
              slidesPerView: 1.5,
              loop: true,
              speed: 750,
              // Match your CSS transition speed
              centeredSlides: true,
              spaceBetween: 32,
              mousewheel: false,
              keyboard: {
                enabled: true,
                onlyInViewport: true
              },
              navigation: {
                nextEl: '.team-swiper-button-next',
                prevEl: '.team-swiper-button-prev'
              },
              breakpoints: {
                768: {
                  slidesPerView: 2,
                  spaceBetween: 44,
                  centeredSlides: true
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 100,
                  centeredSlides: false
                }
              },
              // These are the key fixes for smooth looping
              loopAdditionalSlides: 5,
              // Add more cloned slides
              loopedSlides: 5,
              // Number of looped slides
              // This is critical for smooth animation
              allowTouchMove: false,
              // Disable touch movement to prevent jump issues
              on: {
                // Important: Update Locomotive Scroll after swiper events
                slideChangeTransitionEnd: function slideChangeTransitionEnd() {
                  if (scroll) {
                    // Force Locomotive Scroll to update
                    scroll.update();
                  }
                },
                touchEnd: function touchEnd() {
                  if (scroll) {
                    // Make sure Locomotive Scroll is updated after touch interactions
                    setTimeout(function () {
                      scroll.update();
                    }, 100);
                  }
                }
              }
            });

            // If you need touch movement, add this to handle navigation via buttons only:
            document.querySelector('.team-swiper-button-next').addEventListener('click', function () {
              teamSwiper.slideNext();
            });
            document.querySelector('.team-swiper-button-prev').addEventListener('click', function () {
              teamSwiper.slidePrev();
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
                if (scroll) {
                  scroll.stop();
                }
                teamPanelOverlay.classList.add('active');
                teamPanelOverlay.style.top = scrollTop + 'px';
              });
            });

            // Make sure all close/overlay click handlers properly restart Locomotive Scroll
            document.querySelector('.team-panel--header .close').addEventListener('click', function () {
              var teamPanelOverlay = document.querySelector('.panel-container');
              teamPanelOverlay.classList.remove('active');
              document.querySelectorAll('.team-panel--content').forEach(function (panel) {
                panel.classList.remove('active');
              });
              if (scroll) {
                scroll.start();

                // Force update after starting
                setTimeout(function () {
                  scroll.update();
                }, 100);
              }
            });
            document.querySelector('.team-panel--overlay').addEventListener('click', function () {
              console.log('overlay clicked');
              var teamPanelOverlay = document.querySelector('.panel-container');
              teamPanelOverlay.classList.remove('active');
              document.querySelectorAll('.team-panel--content').forEach(function (panel) {
                panel.classList.remove('active');
              });
              if (scroll) {
                scroll.start();

                // Force update after starting
                setTimeout(function () {
                  scroll.update();
                }, 100);
              }
            });

            // Add event listeners to handle resize events
            window.addEventListener('resize', function () {
              if (scroll) {
                // Force Locomotive Scroll update on window resize
                setTimeout(function () {
                  scroll.update();
                }, 100);
              }
            });

            // Ensure Locomotive Scroll continues to work when interacting with the Swiper
            var teamCarousel = document.querySelector('.team-carousel');
            if (teamCarousel) {
              // When mouse enters the carousel, make sure scroll isn't stopped
              teamCarousel.addEventListener('mouseenter', function () {
                if (scroll && !document.querySelector('.panel-container.active')) {
                  scroll.update();
                }
              });

              // When mouse leaves the carousel, make sure scroll is working
              teamCarousel.addEventListener('mouseleave', function () {
                if (scroll && !document.querySelector('.panel-container.active')) {
                  scroll.update();
                }
              });
            }
          }
        }, false);
      });
    }
  }]);
}();
new FidatoPluginJS();

// // Add your JavaScript code here
// class FidatoPluginJS {

//     constructor() {
//         this.init();
//     }

//     init() {
//         // wait until DOM is ready

//         document.addEventListener("DOMContentLoaded", function(event){
//         console.log("DOM loaded");

//             // add animation to all dividers
//             const dividers = document.querySelectorAll('.elementor-widget-divider');
//             for (let i = 0; i < dividers.length; i++) {
//                 // Access each element using elements[i]
//                 dividers[i].setAttribute('data-scroll', '');
//                 dividers[i].setAttribute('data-scroll-repeat', '');
//                 dividers[i].setAttribute('data-scroll-class', 'loco-in-view');
//             }

//             //wait until images, links, fonts, stylesheets, and js is loaded
//             window.addEventListener("load", function(e){    
//             console.log("window loaded");

//                 const scroll = new LocomotiveScroll({
//                     el: document.querySelector('[data-scroll-container]'),
//                     smooth: true,
//                     multiplier: 1,
//                     class: 'loco-in-view',
//                     lerp: 0.1
//                 });

//                 // Initialize the main Swiper with the same navigation buttons
//                 var teamSwiper = new Swiper('.teamSwiper', {
//                     slidesPerView: 1.5,
//                     centeredSlides: true,
//                     loop: true,
//                     speed: 500,
//                     spaceBetween: 72,
//                     navigation: {
//                         nextEl: '.team-swiper-button-next',
//                         prevEl: '.team-swiper-button-prev',
//                     },
//                     breakpoints: {
//                         768: {
//                             slidesPerView: 2,
//                         },
//                         1024: {
//                             slidesPerView: 3,
//                         }
//                     }
//                 });
//                 let scrollTop = 0;
//                 scroll.on('scroll', (obj) => {
//                     // Current vertical scroll position
//                     scrollTop = obj.scroll.y;

//                 });

//                 // Select all link elements within swiper-slide elements that are inside team-carousel
//                 document.querySelectorAll('.team-carousel .swiper-slide .link').forEach(link => {
//                     // Add click event listener to each link
//                     link.addEventListener('click', function(e) {

//                         e.preventDefault();

//                         const linkHref = this.getAttribute('href').toString();
//                         document.querySelector(linkHref).classList.add('active');
//                         console.log(linkHref);
//                         const teamPanelOverlay = document.querySelector('.panel-container');

//                         scroll.stop();

//                         teamPanelOverlay.classList.add('active');
//                         teamPanelOverlay.style.top = scrollTop + 'px';

//                     });
//                 });

//                 this.document.querySelector('.team-panel--header .close').addEventListener('click', function() {
//                     const teamPanelOverlay = document.querySelector('.panel-container');

//                     teamPanelOverlay.classList.remove('active');
//                     document.querySelectorAll('.team-panel--content').forEach(link => {
//                         link.classList.remove('active');
//                     });

//                     scroll.start();

//                 });

//                 this.document.querySelector('.team-panel--overlay').addEventListener('click', function() {
//                     console.log('overlay clicked');
//                     const teamPanelOverlay = document.querySelector('.panel-container');

//                     teamPanelOverlay.classList.remove('active');
//                     document.querySelectorAll('.team-panel--content').forEach(link => {
//                         link.classList.remove('active');
//                     });

//                     scroll.start();

//                 });

//             }, false);

//         });
//     }
// }

// new FidatoPluginJS();
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