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

        // Initialize scroll as null
        var scroll = null;
        var scrollTop = 0;

        // Function to initialize Locomotive Scroll
        function initScroll() {
          // Only initialize if not already initialized
          if (scroll === null) {
            var scrollContainer = document.querySelector('[data-scroll-container]');

            // Debug: Check if scroll container exists
            if (!scrollContainer) {
              console.error('Locomotive Scroll: No element with [data-scroll-container] found!');
              console.log('Available elements:', document.querySelectorAll('[data-scroll]'));
              return null;
            }
            console.log('Initializing Locomotive Scroll on:', scrollContainer);
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
              console.log('Locomotive Scroll initialized successfully:', scroll);
            } catch (error) {
              console.error('Error initializing Locomotive Scroll:', error);
              return null;
            }
          }
          return scroll;
        }

        // Set up hash links
        function setupHashLinks() {
          document.querySelectorAll('a[href^="#"]').forEach(function (link) {
            var targetId = link.getAttribute('href').substring(1);
            if (targetId) {
              link.setAttribute('data-scroll-to', targetId);
              link.addEventListener('click', function (e) {
                e.preventDefault();
                var target = document.querySelector("[data-scroll-id=\"".concat(targetId, "\"]"));
                if (target && scroll) {
                  var _document$querySelect;
                  var headerHeight = ((_document$querySelect = document.querySelector('header')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.offsetHeight) || 0;
                  scroll.scrollTo(target, {
                    offset: -headerHeight,
                    callback: function callback() {
                      return scroll.update();
                    }
                  });
                }
              });
            }
          });
        }

        // Function to scroll to hash (but only when explicitly called)
        function scrollToHash(hash) {
          if (!hash || !scroll) return false;
          var target = document.querySelector("[data-scroll-id=\"".concat(hash, "\"]"));
          if (target) {
            var _document$querySelect2;
            var headerHeight = ((_document$querySelect2 = document.querySelector('header')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.offsetHeight) + 100 || 0;
            scroll.scrollTo(target, {
              offset: -headerHeight,
              duration: 800,
              callback: function callback() {
                return scroll.update();
              }
            });
            return true;
          }
          return false;
        }

        // Fix for top cutoff
        function fixTopCutoff() {
          if (scroll && scroll.scroll && scroll.scroll.instance.scroll.y < 0) {
            scroll.scrollTo(0, {
              duration: 100,
              disableLerp: true
            });
          }
        }

        // Initialize scroll immediately when DOM is ready
        initScroll();

        // Then set up the hash links
        setupHashLinks();

        // Update the scroll instance
        if (scroll) {
          scroll.update();
        }

        // Handle scrolling to hash ONLY when user explicitly requests it
        var isInitialLoad = true;
        window.addEventListener('load', function () {
          console.log('Window loaded, updating scroll...');

          // Update scroll on complete page load
          if (scroll) {
            scroll.update();
          } else {
            console.warn('Scroll not initialized, attempting to initialize...');
            initScroll();
          }

          // Get hash from URL
          var hash = window.location.hash.substring(1);

          // IMPORTANT: Only scroll to hash if this isn't the initial page load
          if (!isInitialLoad && hash) {
            setTimeout(function () {
              scrollToHash(hash);
            }, 200);
          }
          isInitialLoad = false;
        });

        // Apply fix every 2 seconds instead of every second (less resource intensive)
        setInterval(function () {
          if (scroll) {
            fixTopCutoff();
          }
        }, 2000);

        // Handle resize events
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
              var iframe = panel.querySelector('iframe');
              if (iframe) {
                var original_frame = iframe.cloneNode(true);
                iframe.remove();
                panel.appendChild(original_frame);
              }
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