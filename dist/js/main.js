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

        // get every element with an ID
        var elements = document.querySelectorAll('[id]');
        for (var _i = 0; _i < elements.length; _i++) {
          // Access each element using elements[i]
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
            scroll = new LocomotiveScroll({
              el: document.querySelector('[data-scroll-container]'),
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
            return scroll;
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

        // Wait until DOM is fully loaded before initializing anything
        document.addEventListener('DOMContentLoaded', function () {
          // Initialize scroll first
          initScroll();

          // Then set up the hash links
          setupHashLinks();

          // Update the scroll instance
          if (scroll) scroll.update();
        });

        // Handle scrolling to hash ONLY when user explicitly requests it
        // Add this flag to check if it's the initial load
        var isInitialLoad = true;
        window.addEventListener('load', function () {
          // Update scroll on complete page load
          if (scroll) scroll.update();

          // Get hash from URL
          var hash = window.location.hash.substring(1);

          // IMPORTANT: Only scroll to hash if this isn't the initial page load
          // or if you specifically want to allow initial hash scrolling (remove the condition)
          if (!isInitialLoad && hash) {
            // Delay slightly to let everything settle
            setTimeout(function () {
              scrollToHash(hash);
            }, 200);
          }
          isInitialLoad = false;
        });

        // Apply fix every 2 seconds instead of every second (less resource intensive)
        setInterval(fixTopCutoff, 2000);

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

        // //wait until images, links, fonts, stylesheets, and js is loaded
        // window.addEventListener("load", function(e){    
        //     console.log("window loaded");

        //     let scroll = null;

        //     // Initialize Locomotive Scroll
        //     scroll = new LocomotiveScroll({
        //       el: document.querySelector('[data-scroll-container]'),
        //       smooth: true,
        //       multiplier: 1,
        //       class: 'loco-in-view',
        //       lerp: 0.05,
        //     });

        //     // Keep a reference to scrollTop outside of the event handlers
        //     let scrollTop = 0;
        //     scroll.on('scroll', (obj) => {
        //       // Current vertical scroll position
        //       scrollTop = obj.scroll.y;
        //     });

        //     // Function to handle anchor link clicks
        //     function handleAnchorLinkClick() {
        //       // Select all anchor links on the page
        //       const anchorLinks = document.querySelectorAll('a[href^="#"]');

        //       // Add click event listener to each anchor link
        //       anchorLinks.forEach(link => {
        //         link.addEventListener('click', function(e) {
        //           // Prevent default anchor link behavior
        //           e.preventDefault();

        //           // Get the target element id from the href attribute
        //           const targetId = this.getAttribute('href');

        //           // Skip if it's just "#" (to avoid scrolling to top)
        //           if (targetId === '#') return;

        //           // Get the target element
        //           const targetElement = document.querySelector(targetId);

        //           // If target element exists, scroll to it
        //           if (targetElement) {
        //             // You can add offset here if needed (e.g., for fixed headers)
        //             const offset = 0;

        //             // Use Locomotive Scroll's scrollTo method
        //             scroll.scrollTo(targetElement, {
        //               offset: offset,
        //               duration: 1000, // Duration in ms (adjust as needed)
        //               easing: [0.25, 0.00, 0.35, 1.00], // Cubic bezier curve (adjust as needed)
        //               disableLerp: false, // Set to true for instant scrolling
        //             });
        //           }
        //         });
        //       });
        //     }

        //     // Initialize the anchor link handling after DOM is ready
        //     document.addEventListener('DOMContentLoaded', function() {
        //       handleAnchorLinkClick();

        //       // Update Locomotive Scroll when the page is fully loaded
        //       window.addEventListener('load', () => {
        //         scroll.update();
        //       });
        //     });

        //     // Update Locomotive Scroll on window resize
        //     window.addEventListener('resize', () => {
        //       scroll.update();
        //     });

        //     // Initialize the Swiper with proper configuration to avoid scroll conflicts

        //     // Initialize the Swiper with proper configuration to avoid scroll conflicts
        //     var overflowSwiper = new Swiper('.overflowSwiper', {
        //         slidesPerView: 1.33,
        //         centeredSlides: true,
        //         loop: false,
        //         speed: 500,
        //         spaceBetween: 36,
        //         mousewheel: false,
        //         keyboard: {
        //             enabled: true,
        //             onlyInViewport: true,
        //         },
        //         navigation: {
        //             nextEl: '.overflow-swiper-button-next',
        //             prevEl: '.overflow-swiper-button-prev',
        //         },
        //         breakpoints: {
        //             768: {
        //                 centeredSlides: false,
        //                 slidesPerView: 2,
        //             },
        //             1024: {
        //                 centeredSlides: false,
        //                 slidesPerView: 3,
        //             }
        //         },
        //         // on: {
        //         //     // Important: Update Locomotive Scroll after swiper events
        //         //     slideChangeTransitionEnd: function() {
        //         //         if (scroll) {
        //         //             // Force Locomotive Scroll to update
        //         //             scroll.update();
        //         //         }
        //         //     },
        //         //     touchEnd: function() {
        //         //         if (scroll) {
        //         //             // Make sure Locomotive Scroll is updated after touch interactions
        //         //             setTimeout(() => {
        //         //                 scroll.update();
        //         //             }, 100);
        //         //         }
        //         //     }
        //         // }
        //     });

        //     var blueNumericSwiper = new Swiper('.blueNumericSwiper', {
        //         slidesPerView: 1.33,
        //         centeredSlides: true,
        //         loop: false,
        //         speed: 500,
        //         spaceBetween: 16,
        //         mousewheel: false,
        //         keyboard: {
        //             enabled: true,
        //             onlyInViewport: true,
        //         },
        //         navigation: {
        //             nextEl: '.blue-numeric-swiper-button-next',
        //             prevEl: '.blue-numeric-swiper-button-prev',
        //         },
        //         breakpoints: {
        //             768: {
        //                 slidesPerView: 2,
        //                 centeredSlides: false,
        //                 spaceBetween: 36,
        //             },
        //             1024: {
        //                 slidesPerView: 3,
        //                 centeredSlides: false,
        //                 spaceBetween: 36,
        //             }
        //         },
        //         // on: {
        //         //     // Important: Update Locomotive Scroll after swiper events
        //         //     slideChangeTransitionEnd: function() {
        //         //         if (scroll) {
        //         //             // Force Locomotive Scroll to update
        //         //             scroll.update();
        //         //         }
        //         //     },
        //         //     touchEnd: function() {
        //         //         if (scroll) {
        //         //             // Make sure Locomotive Scroll is updated after touch interactions
        //         //             setTimeout(() => {
        //         //                 scroll.update();
        //         //             }, 100);
        //         //         }
        //         //     }
        //         // }
        //     });

        //     var blueValuesSwiper = new Swiper('.blueValuesSwiper', {
        //         slidesPerView: 1.33,
        //         centeredSlides: true,
        //         loop: false,
        //         speed: 500,
        //         spaceBetween: 16,
        //         mousewheel: false,
        //         keyboard: {
        //             enabled: true,
        //             onlyInViewport: true,
        //         },
        //         navigation: {
        //             nextEl: '.blue-values-swiper-button-next',
        //             prevEl: '.blue-values-swiper-button-prev',
        //         },
        //         breakpoints: {
        //             768: {
        //                 slidesPerView: 2,
        //                 centeredSlides: false,
        //                 spaceBetween: 36,
        //             },
        //             1024: {
        //                 slidesPerView: 3,
        //                 centeredSlides: false,
        //                 spaceBetween: 36,
        //             }
        //         },
        //     });

        //     var learningCenterSwiper = new Swiper('.learningCenterSwiper', {
        //         slidesPerView: 1,
        //         centeredSlides: false,
        //         loop: false,
        //         speed: 500,
        //         spaceBetween: 36,
        //         mousewheel: false,
        //         keyboard: {
        //             enabled: true,
        //             onlyInViewport: true,
        //         },
        //         navigation: {
        //             nextEl: '.learning-center-swiper-button-next',
        //             prevEl: '.learning-center-swiper-button-prev',
        //         },

        //     });

        //     // Update Locomotive Scroll after Swiper initialization
        //     setTimeout(() => {
        //         if (scroll) {
        //             scroll.update();
        //         }
        //     }, 500);

        //     if( document.querySelectorAll('.team-carousel').length ){

        //         // Initialize the Swiper with proper configuration to avoid jump on loop
        //         var teamSwiper = new Swiper('.teamSwiper', {
        //             slidesPerView: 1.5,
        //             loop: true,
        //             speed: 750, // Match your CSS transition speed
        //             centeredSlides: true,
        //             spaceBetween: 32,
        //             mousewheel: false,
        //             keyboard: {
        //             enabled: true,
        //             onlyInViewport: true,
        //             },
        //             navigation: {
        //             nextEl: '.team-swiper-button-next',
        //             prevEl: '.team-swiper-button-prev',
        //             },
        //             breakpoints: {
        //             768: {
        //                 slidesPerView: 2,
        //                 spaceBetween: 44,
        //                 centeredSlides: true,
        //             },
        //             1024: {
        //                 slidesPerView: 3,
        //                 spaceBetween: 100,
        //                 centeredSlides: false,
        //             }
        //             },
        //             // These are the key fixes for smooth looping
        //             loopAdditionalSlides: 5, // Add more cloned slides
        //             loopedSlides: 5,         // Number of looped slides
        //             // This is critical for smooth animation
        //             allowTouchMove: false,   // Disable touch movement to prevent jump issues
        //             on: {
        //             // Important: Update Locomotive Scroll after swiper events
        //             slideChangeTransitionEnd: function() {
        //                 if (scroll) {
        //                 // Force Locomotive Scroll to update
        //                 scroll.update();
        //                 }
        //             },
        //             touchEnd: function() {
        //                 if (scroll) {
        //                 // Make sure Locomotive Scroll is updated after touch interactions
        //                 setTimeout(() => {
        //                     scroll.update();
        //                 }, 100);
        //                 }
        //             }
        //             }
        //         });

        //         // If you need touch movement, add this to handle navigation via buttons only:
        //         document.querySelector('.team-swiper-button-next').addEventListener('click', () => {
        //             teamSwiper.slideNext();
        //         });
        //         document.querySelector('.team-swiper-button-prev').addEventListener('click', () => {
        //             teamSwiper.slidePrev();
        //         });

        //         // Select all link elements within swiper-slide elements that are inside team-carousel
        //         document.querySelectorAll('.team-carousel .swiper-slide .link').forEach(link => {
        //             // Add click event listener to each link
        //             link.addEventListener('click', function(e) {
        //                 e.preventDefault();

        //                 const linkHref = this.getAttribute('href').toString();
        //                 document.querySelector(linkHref).classList.add('active');
        //                 console.log(linkHref);
        //                 const teamPanelOverlay = document.querySelector('.panel-container');

        //                 if (scroll) {
        //                     scroll.stop();
        //                 }

        //                 teamPanelOverlay.classList.add('active');
        //                 teamPanelOverlay.style.top = scrollTop + 'px';
        //             });
        //         });

        //         // Make sure all close/overlay click handlers properly restart Locomotive Scroll
        //         document.querySelector('.team-panel--header .close').addEventListener('click', function() {
        //             const teamPanelOverlay = document.querySelector('.panel-container');

        //             teamPanelOverlay.classList.remove('active');
        //             document.querySelectorAll('.team-panel--content').forEach(panel => {
        //                 panel.classList.remove('active');
        //             });

        //             if (scroll) {
        //                 scroll.start();

        //                 // Force update after starting
        //                 setTimeout(() => {
        //                     scroll.update();
        //                 }, 100);
        //             }
        //         });

        //         document.querySelector('.team-panel--overlay').addEventListener('click', function() {
        //             console.log('overlay clicked');
        //             const teamPanelOverlay = document.querySelector('.panel-container');

        //             teamPanelOverlay.classList.remove('active');
        //             document.querySelectorAll('.team-panel--content').forEach(panel => {
        //                 panel.classList.remove('active');
        //             });

        //             if (scroll) {
        //                 scroll.start();

        //                 // Force update after starting
        //                 setTimeout(() => {
        //                     scroll.update();
        //                 }, 100);
        //             }
        //         });

        //         // Add event listeners to handle resize events
        //         window.addEventListener('resize', function() {
        //             if (scroll) {
        //                 // Force Locomotive Scroll update on window resize
        //                 setTimeout(() => {
        //                     scroll.update();
        //                 }, 100);
        //             }
        //         });

        //         // Ensure Locomotive Scroll continues to work when interacting with the Swiper
        //         const teamCarousel = document.querySelector('.team-carousel');
        //         if (teamCarousel) {
        //             // When mouse enters the carousel, make sure scroll isn't stopped
        //             teamCarousel.addEventListener('mouseenter', function() {
        //                 if (scroll && !document.querySelector('.panel-container.active')) {
        //                     scroll.update();
        //                 }
        //             });

        //             // When mouse leaves the carousel, make sure scroll is working
        //             teamCarousel.addEventListener('mouseleave', function() {
        //                 if (scroll && !document.querySelector('.panel-container.active')) {
        //                     scroll.update();
        //                 }
        //             });
        //         }

        //     }

        //     // if( document.querySelectorAll('.fidato--resource-card.videos').length ){
        //     //     //console.log(document.querySelectorAll('.fidato--resource-card.videos').length);

        //     //     // First, let's create the play button element
        //     //     const playButton = document.createElement('div');
        //     //     playButton.className = 'play-button';
        //     //     playButton.style.position = 'absolute'; // Changed from 'fixed' to 'absolute'
        //     //     playButton.style.pointerEvents = 'none';
        //     //     playButton.style.opacity = '0';
        //     //     playButton.style.zIndex = '1000';
        //     //     playButton.style.pointerEvents = 'none';
        //     //     playButton.style.transition = 'left 0.15s ease-out, top 0.15s ease-out, opacity 0.5s ease'; // Add smooth transition

        //     //     // You can add styling to the play button
        //     //     playButton.innerHTML = `
        //     //     <span>Click To Play</span>
        //     //     `;

        //     //     // Append the play button to the learning-center-carousel
        //     //     const carousel = document.querySelector('.learning-center-carousel');
        //     //         if (carousel) {
        //     //             carousel.appendChild(playButton);
        //     //             // Make sure the carousel has position relative or absolute for proper positioning
        //     //             const carouselPosition = window.getComputedStyle(carousel).position;

        //     //             if (carouselPosition === 'static') {
        //     //                 carousel.style.position = 'relative';
        //     //             }
        //     //     } else {
        //     //         document.body.appendChild(playButton);
        //     //     }

        //     //     // Variable to store the timeout ID
        //     //     let moveTimeout;

        //     //     // Add event listeners to video elements
        //     //     const videos = document.querySelectorAll('.fidato--resource-card.videos');
        //     //     for (let i = 0; i < videos.length; i++) {
        //     //     videos[i].addEventListener('mouseover', function(event) {
        //     //         // Get mouse position relative to the carousel
        //     //         const rect = carousel.getBoundingClientRect();
        //     //         const x = event.clientX - rect.left;
        //     //         const y = event.clientY - rect.top;

        //     //         if( videos[i].classList.contains('featured') ){
        //     //             playButton.classList.add('featured');
        //     //         }else{
        //     //             playButton.classList.remove('featured');
        //     //         }

        //     //         // Position the play button at the cursor location immediately on hover
        //     //         playButton.style.left = (x - 20) + 'px';
        //     //         playButton.style.top = (y - 20) + 'px';

        //     //         // Make the play button visible
        //     //         playButton.style.opacity = '1';
        //     //     });

        //     //     // Track mouse movement while hovering over the video
        //     //     videos[i].addEventListener('mousemove', function(event) {
        //     //         // Clear any existing timeout
        //     //         clearTimeout(moveTimeout);

        //     //         // Create a new timeout to delay the position update
        //     //         moveTimeout = setTimeout(() => {
        //     //         // Get mouse position relative to the carousel
        //     //         const rect = carousel.getBoundingClientRect();
        //     //         const x = event.clientX - rect.left;
        //     //         const y = event.clientY - rect.top;

        //     //         // Update the play button position
        //     //         playButton.style.left = (x - 20) + 'px';
        //     //         playButton.style.top = (y - 20) + 'px';
        //     //         }, 7); // 80ms delay (about 4-5 frames at 60fps)
        //     //     });

        //     //     // Hide the play button when mouse leaves the video card
        //     //     videos[i].addEventListener('mouseout', function() {
        //     //         // Clear any pending timeout
        //     //         clearTimeout(moveTimeout);

        //     //         // Hide the play button
        //     //         playButton.style.opacity = '0';
        //     //     });
        //     //     }

        //     // }

        // }, false);
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