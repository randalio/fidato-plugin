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
      // Wait until DOM is ready
      document.addEventListener("DOMContentLoaded", function () {
        console.log("DOM loaded");

        // Add animation to all dividers
        var dividers = document.querySelectorAll('.elementor-widget-divider');
        for (var i = 0; i < dividers.length; i++) {
          dividers[i].setAttribute('data-scroll', '');
          dividers[i].setAttribute('data-scroll-repeat', '');
          dividers[i].setAttribute('data-scroll-class', 'loco-in-view');
        }

        // Get every element with an ID
        var elements = document.querySelectorAll('[id]');
        for (var _i = 0; _i < elements.length; _i++) {
          elements[_i].setAttribute('data-scroll', '');
          elements[_i].setAttribute('data-scroll-id', elements[_i].id);
        }
        var scroll = null;
        var scrollTop = 0;

        // Prevent browser from auto-scrolling to hash on load
        if (window.location.hash) {
          window.scrollTo(0, 0); // Reset scroll position immediately
          setTimeout(function () {
            return window.scrollTo(0, 0);
          }, 1); // Ensure it stays at top until we take over
        }

        /* ------------------------------
        Get consistent offset
        ------------------------------ */
        function getScrollOffset() {
          var header = document.querySelector('header');
          return header ? -(header.offsetHeight + 120) : -100;
        }

        /* ------------------------------
        Init Locomotive Scroll
        ------------------------------ */
        function initScroll() {
          if (scroll !== null) return scroll;
          var scrollContainer = document.querySelector('[data-scroll-container]');
          if (!scrollContainer) {
            console.error('Locomotive Scroll: No element with [data-scroll-container] found!');
            return null;
          }
          try {
            scroll = new LocomotiveScroll({
              el: scrollContainer,
              smooth: true,
              multiplier: 1,
              "class": 'loco-in-view',
              lerp: 0.05,
              scrollingClass: 'has-scroll-scrolling',
              draggingClass: 'has-scroll-dragging'
            });

            // Track scroll position
            scroll.on('scroll', function (obj) {
              scrollTop = obj.scroll.y;
            });
            console.log('Locomotive Scroll initialized:', scroll);
          } catch (error) {
            console.error('Error initializing Locomotive Scroll:', error);
            scroll = null;
          }
          return scroll;
        }

        /* ------------------------------
        Scroll to hash target
        ------------------------------ */
        function scrollToHash(hash) {
          if (!hash || !scroll) return false;

          // Make sure Locomotive recalculates positions
          scroll.update();
          var target = document.querySelector("[data-scroll-id=\"".concat(hash, "\"]"));
          if (target) {
            scroll.scrollTo(target, {
              offset: getScrollOffset(),
              duration: 800,
              callback: function callback() {
                return scroll.update();
              }
            });
            return true;
          }
          return false;
        }

        /* ------------------------------
        Set up hash links
        ------------------------------ */
        function setupHashLinks() {
          document.querySelectorAll('a[href^="#"]').forEach(function (link) {
            var targetId = link.getAttribute('href').substring(1);
            if (targetId) {
              link.setAttribute('data-scroll-to', targetId);
              link.addEventListener('click', function (e) {
                e.preventDefault();
                scrollToHash(targetId);
              });
            }
          });
        }

        /* ------------------------------
        Prevent top cutoff
        ------------------------------ */
        function fixTopCutoff() {
          if (scroll && scroll.scroll && scroll.scroll.instance.scroll.y < 0) {
            scroll.scrollTo(0, {
              duration: 100,
              disableLerp: true
            });
          }
        }

        /* ------------------------------
        INIT
        ------------------------------ */
        document.addEventListener('DOMContentLoaded', function () {
          initScroll();
          setupHashLinks();
          if (scroll) scroll.update();
        });

        /* ------------------------------
        After everything (images/fonts) load
        ------------------------------ */
        window.addEventListener('load', function () {
          if (!scroll) initScroll();
          requestAnimationFrame(function () {
            if (scroll) {
              scroll.update();
              var hash = window.location.hash.substring(1);
              if (hash) {
                setTimeout(function () {
                  scrollToHash(hash);
                }, 300); // delay so Locomotive knows final positions
              }
            }
          });
        });

        /* ------------------------------
        Fix cutoff every 2s
        ------------------------------ */
        setInterval(function () {
          if (scroll) fixTopCutoff();
        }, 2000);

        /* ------------------------------
        Handle resize
        ------------------------------ */
        window.addEventListener('resize', function () {
          clearTimeout(window.resizedFinished);
          window.resizedFinished = setTimeout(function () {
            if (scroll) {
              scroll.update();
              fixTopCutoff();
            }
          }, 250);
        });

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
        });
        var blueValuesSwiper = new Swiper('.blueValuesSwiper', {
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
            nextEl: '.blue-values-swiper-button-next',
            prevEl: '.blue-values-swiper-button-prev'
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
        if (document.querySelectorAll('.team-carousel').length) {
          // Function to close team panel modal
          var closeTeamPanel = function closeTeamPanel() {
            var teamPanelOverlay = document.querySelector('.panel-container');
            if (teamPanelOverlay) {
              teamPanelOverlay.classList.remove('active');
              teamPanelOverlay.classList.remove('video-view');
            }
            document.querySelectorAll('.team-panel--content').forEach(function (panel) {
              panel.classList.remove('active');

              // Stop any videos by replacing iframe
              //const iframe = panel.querySelector('iframe');
              // if (iframe) {
              //     const original_frame = iframe.cloneNode(true);
              //     iframe.remove();
              //     panel.appendChild(original_frame);
              // }
            });
            if (scroll) {
              scroll.start();
              setTimeout(function () {
                scroll.update();
              }, 100);
            }
          }; // Close button handler
          // Initialize the Swiper with proper configuration to avoid jump on loop
          var teamSwiper = new Swiper('.teamSwiper', {
            slidesPerView: 1.5,
            loop: true,
            speed: 750,
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
            loopAdditionalSlides: 5,
            loopedSlides: 5,
            allowTouchMove: false,
            on: {
              slideChangeTransitionEnd: function slideChangeTransitionEnd() {
                if (scroll) {
                  scroll.update();
                }
              },
              touchEnd: function touchEnd() {
                if (scroll) {
                  setTimeout(function () {
                    scroll.update();
                  }, 100);
                }
              }
            }
          });

          // Button navigation
          var nextBtn = document.querySelector('.team-swiper-button-next');
          var prevBtn = document.querySelector('.team-swiper-button-prev');
          if (nextBtn) {
            nextBtn.addEventListener('click', function () {
              teamSwiper.slideNext();
            });
          }
          if (prevBtn) {
            prevBtn.addEventListener('click', function () {
              teamSwiper.slidePrev();
            });
          }

          // Team panel handlers
          document.querySelectorAll('.team-carousel .swiper-slide .link').forEach(function (link) {
            link.addEventListener('click', function (e) {
              e.preventDefault();
              var linkHref = this.getAttribute('href').toString();
              var targetPanel = document.querySelector(linkHref);
              var teamPanelOverlay = document.querySelector('.panel-container');
              if (targetPanel) {
                targetPanel.classList.add('active');
              }
              if (scroll) {
                scroll.stop();
              }
              if (teamPanelOverlay) {
                teamPanelOverlay.classList.add('active');
                teamPanelOverlay.style.top = scrollTop + 'px';
              }
            });
          });
          document.querySelectorAll('.team-carousel .swiper-slide .video-icon').forEach(function (link) {
            link.addEventListener('click', function (e) {
              e.preventDefault();
              var linkHref = this.getAttribute('href').toString();
              var targetPanel = document.querySelector(linkHref);
              var teamPanelOverlay = document.querySelector('.panel-container');
              if (targetPanel) {
                targetPanel.classList.add('active');
              }
              if (scroll) {
                scroll.stop();
              }
              if (teamPanelOverlay) {
                teamPanelOverlay.classList.add('active');
                teamPanelOverlay.classList.add('video-view');
                teamPanelOverlay.style.top = scrollTop + 'px';
              }
            });
          });
          var closeBtn = document.querySelector('.team-panel--header .close');
          if (closeBtn) {
            closeBtn.addEventListener('click', closeTeamPanel);
          }

          // Overlay click handler
          var overlay = document.querySelector('.team-panel--overlay');
          if (overlay) {
            overlay.addEventListener('click', closeTeamPanel);
          }

          // Team carousel mouse event handlers
          var teamCarousel = document.querySelector('.team-carousel');
          if (teamCarousel) {
            teamCarousel.addEventListener('mouseenter', function () {
              if (scroll && !document.querySelector('.panel-container.active')) {
                scroll.update();
              }
            });
            teamCarousel.addEventListener('mouseleave', function () {
              if (scroll && !document.querySelector('.panel-container.active')) {
                scroll.update();
              }
            });
          }
        }
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