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

            // get every element with an ID
            const elements = document.querySelectorAll('[id]');
            for (let i = 0; i < elements.length; i++) {
                // Access each element using elements[i]
                elements[i].setAttribute('data-scroll', '');
                elements[i].setAttribute('data-scroll-id', elements[i].id);
            }



            // Initialize scroll as null
            let scroll = null;
            let scrollTop = 0;

            // Function to initialize Locomotive Scroll
            function initScroll() {
            // Only initialize if not already initialized
            if (scroll === null) {
                scroll = new LocomotiveScroll({
                el: document.querySelector('[data-scroll-container]'),
                smooth: true,
                multiplier: 1,
                class: 'loco-in-view',
                lerp: 0.05,
                scrollingClass: 'has-scroll-scrolling',
                draggingClass: 'has-scroll-dragging'
                });
                
                // Track scroll position
                scroll.on('scroll', (obj) => {
                scrollTop = obj.scroll.y;
                });
                
                return scroll;
            }
            return scroll;
            }

            // Set up hash links
            function setupHashLinks() {
            document.querySelectorAll('a[href^="#"]').forEach(link => {
                const targetId = link.getAttribute('href').substring(1);
                if (targetId) {
                link.setAttribute('data-scroll-to', targetId);
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = document.querySelector(`[data-scroll-id="${targetId}"]`);
                    if (target && scroll) {
                    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                    scroll.scrollTo(target, {
                        offset: -headerHeight,
                        callback: () => scroll.update()
                    });
                    }
                });
                }
            });
            }

            // Function to scroll to hash (but only when explicitly called)
            function scrollToHash(hash) {
                if (!hash || !scroll) return false;
                
                const target = document.querySelector(`[data-scroll-id="${hash}"]`);
                if (target) {
                    const headerHeight = (document.querySelector('header')?.offsetHeight + 100) || 0;
                    scroll.scrollTo(target, {
                        offset: -headerHeight,
                        duration: 800,
                        callback: () => scroll.update()
                    });
                    return true;
                }
                return false;
            }

            // Fix for top cutoff
            function fixTopCutoff() {
                if (scroll && scroll.scroll && scroll.scroll.instance.scroll.y < 0) {
                    scroll.scrollTo(0, { duration: 100, disableLerp: true });
                }
            }

            // Wait until DOM is fully loaded before initializing anything
            document.addEventListener('DOMContentLoaded', () => {
            // Initialize scroll first
            initScroll();
            
            // Then set up the hash links
            setupHashLinks();
            
            // Update the scroll instance
            if (scroll) scroll.update();
            });

            // Handle scrolling to hash ONLY when user explicitly requests it
            // Add this flag to check if it's the initial load
            let isInitialLoad = true;

            window.addEventListener('load', () => {
            // Update scroll on complete page load
            if (scroll) scroll.update();
            
            // Get hash from URL
            const hash = window.location.hash.substring(1);
            
            // IMPORTANT: Only scroll to hash if this isn't the initial page load
            // or if you specifically want to allow initial hash scrolling (remove the condition)
            if (!isInitialLoad && hash) {
                // Delay slightly to let everything settle
                setTimeout(() => {
                scrollToHash(hash);
                }, 200);
            }
            
            isInitialLoad = false;
            });

            // Apply fix every 2 seconds instead of every second (less resource intensive)
            setInterval(fixTopCutoff, 2000);

            // Handle resize events
            window.addEventListener('resize', () => {
            clearTimeout(window.resizedFinished);
            window.resizedFinished = setTimeout(() => {
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
                    onlyInViewport: true,
                },
                navigation: {
                    nextEl: '.blue-values-swiper-button-next',
                    prevEl: '.blue-values-swiper-button-prev',
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

                // Select all link elements within swiper-slide elements that are inside team-carousel
                document.querySelectorAll('.team-carousel .swiper-slide .video-icon').forEach(link => {
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
                        teamPanelOverlay.classList.add('video-view');
                        teamPanelOverlay.style.top = scrollTop + 'px';
                    });
                });

                // Make sure all close/overlay click handlers properly restart Locomotive Scroll
                document.querySelector('.team-panel--header .close').addEventListener('click', function() {
                    const teamPanelOverlay = document.querySelector('.panel-container');

                    teamPanelOverlay.classList.remove('active');
                    teamPanelOverlay.classList.remove('video-view');
                    document.querySelectorAll('.team-panel--content').forEach(panel => {
                        panel.classList.remove('active');

                        // find the iframe inside the panel, store it in a variable.
                        const iframe = panel.querySelector('iframe');

                        // remove, then replace the iframe to stop the video
                        if (iframe) {
                            const original_frame = iframe;
                            iframe.remove();
                            panel.appendChild(original_frame);
                        }
            
                        
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




      
        });
    }
}

new FidatoPluginJS();
