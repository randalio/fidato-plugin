// Add your JavaScript code here
class FidatoPluginJS {

    constructor() {
        this.init();
    }

    init() {
        // wait until DOM is ready
        document.addEventListener("DOMContentLoaded", function(event){
            console.log("DOM loaded");

            // add animation to all dividers
            const dividers = document.querySelectorAll('.elementor-widget-divider');
            for (let i = 0; i < dividers.length; i++) {
                // Access each element using elements[i]
                dividers[i].setAttribute('data-scroll', '');
                dividers[i].setAttribute('data-scroll-repeat', '');
                dividers[i].setAttribute('data-scroll-class', 'loco-in-view');
            }


            //wait until images, links, fonts, stylesheets, and js is loaded
            window.addEventListener("load", function(e){    
                console.log("window loaded");
                
                let scroll = null;
                
                // Initialize Locomotive Scroll
                scroll = new LocomotiveScroll({
                    el: document.querySelector('[data-scroll-container]'),
                    smooth: true,
                    multiplier: 1,
                    class: 'loco-in-view',
                    lerp: 0.05,
                });

                // Keep a reference to scrollTop outside of the event handlers
                let scrollTop = 0;
                scroll.on('scroll', (obj) => {
                    // Current vertical scroll position
                    scrollTop = obj.scroll.y;
                });

                // Initialize the Swiper with proper configuration to avoid scroll conflicts
             // Initialize the Swiper with proper configuration to avoid jump on loop
                var teamSwiper = new Swiper('.teamSwiper', {
                    slidesPerView: 1.5,
                    loop: true,
                    speed: 750, // Match your CSS transition speed
                    spaceBetween: 32,
                    mousewheel: false,
                    keyboard: {
                    enabled: true,
                    onlyInViewport: true,
                    },
                    navigation: {
                    nextEl: '.team-swiper-button-next',
                    prevEl: '.team-swiper-button-prev',
                    },
                    breakpoints: {
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 44,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 100,
                    }
                    },
                    // These are the key fixes for smooth looping
                    loopAdditionalSlides: 5, // Add more cloned slides
                    loopedSlides: 5,         // Number of looped slides
                    // This is critical for smooth animation
                    allowTouchMove: false,   // Disable touch movement to prevent jump issues
                    on: {
                    // Important: Update Locomotive Scroll after swiper events
                    slideChangeTransitionEnd: function() {
                        if (scroll) {
                        // Force Locomotive Scroll to update
                        scroll.update();
                        }
                    },
                    touchEnd: function() {
                        if (scroll) {
                        // Make sure Locomotive Scroll is updated after touch interactions
                        setTimeout(() => {
                            scroll.update();
                        }, 100);
                        }
                    }
                    }
                });
                
                // If you need touch movement, add this to handle navigation via buttons only:
                document.querySelector('.team-swiper-button-next').addEventListener('click', () => {
                    teamSwiper.slideNext();
                });
                document.querySelector('.team-swiper-button-prev').addEventListener('click', () => {
                    teamSwiper.slidePrev();
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
                        onlyInViewport: true,
                    },
                    navigation: {
                        nextEl: '.overflow-swiper-button-next',
                        prevEl: '.overflow-swiper-button-prev',
                    },
                    breakpoints: {
                        768: {
                            centeredSlides: false,
                            slidesPerView: 2,
                        },
                        1024: {
                            centeredSlides: false,
                            slidesPerView: 3,
                        }
                    },
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
                        onlyInViewport: true,
                    },
                    navigation: {
                        nextEl: '.blue-numeric-swiper-button-next',
                        prevEl: '.blue-numeric-swiper-button-prev',
                    },
                    breakpoints: {
                        768: {
                            slidesPerView: 2,
                            centeredSlides: false,
                            spaceBetween: 36,
                        },
                        1024: {
                            slidesPerView: 3,
                            centeredSlides: false,
                            spaceBetween: 36,
                        }
                    },
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
                
                // Update Locomotive Scroll after Swiper initialization
                setTimeout(() => {
                    if (scroll) {
                        scroll.update();
                    }
                }, 500);

                // Select all link elements within swiper-slide elements that are inside team-carousel
                document.querySelectorAll('.team-carousel .swiper-slide .link').forEach(link => {
                    // Add click event listener to each link
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        
                        const linkHref = this.getAttribute('href').toString();
                        document.querySelector(linkHref).classList.add('active');
                        console.log(linkHref);
                        const teamPanelOverlay = document.querySelector('.panel-container');

                        if (scroll) {
                            scroll.stop();
                        }

                        teamPanelOverlay.classList.add('active');
                        teamPanelOverlay.style.top = scrollTop + 'px';
                    });
                });

                // Make sure all close/overlay click handlers properly restart Locomotive Scroll
                document.querySelector('.team-panel--header .close').addEventListener('click', function() {
                    const teamPanelOverlay = document.querySelector('.panel-container');

                    teamPanelOverlay.classList.remove('active');
                    document.querySelectorAll('.team-panel--content').forEach(panel => {
                        panel.classList.remove('active');
                    });

                    if (scroll) {
                        scroll.start();
                        
                        // Force update after starting
                        setTimeout(() => {
                            scroll.update();
                        }, 100);
                    }
                });

                document.querySelector('.team-panel--overlay').addEventListener('click', function() {
                    console.log('overlay clicked');
                    const teamPanelOverlay = document.querySelector('.panel-container');

                    teamPanelOverlay.classList.remove('active');
                    document.querySelectorAll('.team-panel--content').forEach(panel => {
                        panel.classList.remove('active');
                    });
                    
                    if (scroll) {
                        scroll.start();
                        
                        // Force update after starting
                        setTimeout(() => {
                            scroll.update();
                        }, 100);
                    }
                });

                // Add event listeners to handle resize events
                window.addEventListener('resize', function() {
                    if (scroll) {
                        // Force Locomotive Scroll update on window resize
                        setTimeout(() => {
                            scroll.update();
                        }, 100);
                    }
                });

                // Ensure Locomotive Scroll continues to work when interacting with the Swiper
                const teamCarousel = document.querySelector('.team-carousel');
                if (teamCarousel) {
                    // When mouse enters the carousel, make sure scroll isn't stopped
                    teamCarousel.addEventListener('mouseenter', function() {
                        if (scroll && !document.querySelector('.panel-container.active')) {
                            scroll.update();
                        }
                    });
                    
                    // When mouse leaves the carousel, make sure scroll is working
                    teamCarousel.addEventListener('mouseleave', function() {
                        if (scroll && !document.querySelector('.panel-container.active')) {
                            scroll.update();
                        }
                    });
                }
            }, false);
        });
    }
}

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