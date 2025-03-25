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

                var learningCenterSwiper = new Swiper('.learningCenterSwiper', {
                    slidesPerView: 1,
                    centeredSlides: false,
                    loop: false,
                    speed: 500,
                    spaceBetween: 36,
                    mousewheel: false,
                    keyboard: {
                        enabled: true,
                        onlyInViewport: true,
                    },
                    navigation: {
                        nextEl: '.learning-center-swiper-button-next',
                        prevEl: '.learning-center-swiper-button-prev',
                    },

                });
                
                // Update Locomotive Scroll after Swiper initialization
                setTimeout(() => {
                    if (scroll) {
                        scroll.update();
                    }
                }, 500);

                if( document.querySelectorAll('.team-carousel').length ){

                    // Initialize the Swiper with proper configuration to avoid jump on loop
                    var teamSwiper = new Swiper('.teamSwiper', {
                        slidesPerView: 1.5,
                        loop: true,
                        speed: 750, // Match your CSS transition speed
                        centeredSlides: true,
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
                            centeredSlides: true,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 100,
                            centeredSlides: false,
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

                }

                if( document.querySelectorAll('.fidato--resource-card.videos').length ){
                    //console.log(document.querySelectorAll('.fidato--resource-card.videos').length);

                    // First, let's create the play button element
                    const playButton = document.createElement('div');
                    playButton.className = 'play-button';
                    playButton.style.position = 'absolute'; // Changed from 'fixed' to 'absolute'
                    playButton.style.pointerEvents = 'none';
                    playButton.style.opacity = '0';
                    playButton.style.zIndex = '1000';
                    playButton.style.pointerEvents = 'none';
                    playButton.style.transition = 'left 0.15s ease-out, top 0.15s ease-out, opacity 0.5s ease'; // Add smooth transition

                    // You can add styling to the play button
                    playButton.innerHTML = `
                    <span>Click To Play</span>
                    `;

                    // Append the play button to the learning-center-carousel
                    const carousel = document.querySelector('.learning-center-carousel');
                        if (carousel) {
                            carousel.appendChild(playButton);
                            // Make sure the carousel has position relative or absolute for proper positioning
                            const carouselPosition = window.getComputedStyle(carousel).position;

                            if (carouselPosition === 'static') {
                                carousel.style.position = 'relative';
                            }
                    } else {
                        document.body.appendChild(playButton);
                    }

                    // Variable to store the timeout ID
                    let moveTimeout;

                    // Add event listeners to video elements
                    const videos = document.querySelectorAll('.fidato--resource-card.videos');
                    for (let i = 0; i < videos.length; i++) {
                    videos[i].addEventListener('mouseover', function(event) {
                        // Get mouse position relative to the carousel
                        const rect = carousel.getBoundingClientRect();
                        const x = event.clientX - rect.left;
                        const y = event.clientY - rect.top;

                        if( videos[i].classList.contains('featured') ){
                            playButton.classList.add('featured');
                        }else{
                            playButton.classList.remove('featured');
                        }

                        
                        // Position the play button at the cursor location immediately on hover
                        playButton.style.left = (x - 20) + 'px';
                        playButton.style.top = (y - 20) + 'px';
                        
                        // Make the play button visible
                        playButton.style.opacity = '1';
                    });
                    
                    // Track mouse movement while hovering over the video
                    videos[i].addEventListener('mousemove', function(event) {
                        // Clear any existing timeout
                        clearTimeout(moveTimeout);
                        
                        // Create a new timeout to delay the position update
                        moveTimeout = setTimeout(() => {
                        // Get mouse position relative to the carousel
                        const rect = carousel.getBoundingClientRect();
                        const x = event.clientX - rect.left;
                        const y = event.clientY - rect.top;
                        
                        // Update the play button position
                        playButton.style.left = (x - 20) + 'px';
                        playButton.style.top = (y - 20) + 'px';
                        }, 7); // 80ms delay (about 4-5 frames at 60fps)
                    });
                    
                    // Hide the play button when mouse leaves the video card
                    videos[i].addEventListener('mouseout', function() {
                        // Clear any pending timeout
                        clearTimeout(moveTimeout);
                        
                        // Hide the play button
                        playButton.style.opacity = '0';
                    });
                    }





                }
            


            }, false);
        });
    }
}

new FidatoPluginJS();
