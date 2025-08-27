// Add your JavaScript code here
class FidatoPluginJS {

    constructor() {
        this.init();
    }

    init() {
        // Wait until DOM is ready
        document.addEventListener("DOMContentLoaded", () => {
            console.log("DOM loaded");

            // Add animation to all dividers
            const dividers = document.querySelectorAll('.elementor-widget-divider');
            for (let i = 0; i < dividers.length; i++) {
                dividers[i].setAttribute('data-scroll', '');
                dividers[i].setAttribute('data-scroll-repeat', '');
                dividers[i].setAttribute('data-scroll-class', 'loco-in-view');
            }

            // Get every element with an ID
            const elements = document.querySelectorAll('[id]');
            for (let i = 0; i < elements.length; i++) {
                elements[i].setAttribute('data-scroll', '');
                elements[i].setAttribute('data-scroll-id', elements[i].id);
            }

            let scroll = null;
            let scrollTop = 0;

            // Prevent browser from auto-scrolling to hash on load
            if (window.location.hash) {
                window.scrollTo(0, 0); // Reset scroll position immediately
                setTimeout(() => window.scrollTo(0, 0), 1); // Ensure it stays at top until we take over
            }


            /* ------------------------------
            Get consistent offset
            ------------------------------ */
            function getScrollOffset() {
                const header = document.querySelector('header');
                return header ? -(header.offsetHeight + 120) : -100; 
            }

            /* ------------------------------
            Init Locomotive Scroll
            ------------------------------ */
            function initScroll() {
                if (scroll !== null) return scroll;

                const scrollContainer = document.querySelector('[data-scroll-container]');
                if (!scrollContainer) {
                    console.error('Locomotive Scroll: No element with [data-scroll-container] found!');
                    return null;
                }

                try {
                    scroll = new LocomotiveScroll({
                        el: scrollContainer,
                        smooth: true,
                        multiplier: 1,
                        class: 'loco-in-view',
                        lerp: 0.15,
                        scrollingClass: 'has-scroll-scrolling',
                        draggingClass: 'has-scroll-dragging'
                    });

                    // Track scroll position
                    scroll.on('scroll', (obj) => {
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

                const target = document.querySelector(`[data-scroll-id="${hash}"]`);
                if (target) {
                    scroll.scrollTo(target, {
                        offset: getScrollOffset(),
                        duration: 800,
                        callback: () => scroll.update()
                    });
                    return true;
                }
                return false;
            }

            /* ------------------------------
            Set up hash links
            ------------------------------ */
            function setupHashLinks() {
                document.querySelectorAll('a[href^="#"]').forEach(link => {
                    const targetId = link.getAttribute('href').substring(1);
                    if (targetId) {
                        link.setAttribute('data-scroll-to', targetId);
                        link.addEventListener('click', (e) => {
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
                    scroll.scrollTo(0, { duration: 100, disableLerp: true });
                }
            }

            /* ------------------------------
            INIT
            ------------------------------ */
            document.addEventListener('DOMContentLoaded', () => {
                document.querySelectorAll("video[data-src]").forEach(v => {
                  v.src = v.dataset.src;
                });
                initScroll();
                setupHashLinks();
                if (scroll) scroll.update();
              });
              

            /* ------------------------------
            After everything (images/fonts) load
            ------------------------------ */
            window.addEventListener('load', () => {
                if (!scroll) initScroll();

                requestAnimationFrame(() => {
                    if (scroll) {
                        scroll.update();
                        const hash = window.location.hash.substring(1);
                        if (hash) {
                            setTimeout(() => {
                                scrollToHash(hash);
                            }, 300); // delay so Locomotive knows final positions
                        }
                    }
                });
            });

            /* ------------------------------
            Fix cutoff every 2s
            ------------------------------ */
            setInterval(() => {
                if (scroll) fixTopCutoff();
            }, 2000);

            /* ------------------------------
            Handle resize
            ------------------------------ */
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

            if (document.querySelectorAll('.team-carousel').length) {
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
                    loopAdditionalSlides: 5,
                    loopedSlides: 5,
                    allowTouchMove: false,
                    on: {
                        slideChangeTransitionEnd: function() {
                            if (scroll) {
                                scroll.update();
                            }
                        },
                        touchEnd: function() {
                            if (scroll) {
                                setTimeout(() => {
                                    scroll.update();
                                }, 100);
                            }
                        }
                    }
                });
                
                // Button navigation
                const nextBtn = document.querySelector('.team-swiper-button-next');
                const prevBtn = document.querySelector('.team-swiper-button-prev');
                
                if (nextBtn) {
                    nextBtn.addEventListener('click', () => {
                        teamSwiper.slideNext();
                    });
                }
                
                if (prevBtn) {
                    prevBtn.addEventListener('click', () => {
                        teamSwiper.slidePrev();
                    });
                }

                // Team panel handlers
                document.querySelectorAll('.team-carousel .swiper-slide .link').forEach(link => {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        
                        const linkHref = this.getAttribute('href').toString();
                        const targetPanel = document.querySelector(linkHref);
                        const teamPanelOverlay = document.querySelector('.panel-container');
                        
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

                document.querySelectorAll('.team-carousel .swiper-slide .video-icon').forEach(link => {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        
                        const linkHref = this.getAttribute('href').toString();
                        const targetPanel = document.querySelector(linkHref);
                        const teamPanelOverlay = document.querySelector('.panel-container');
                        
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

                // Function to close team panel modal
                function closeTeamPanel() {
                    const teamPanelOverlay = document.querySelector('.panel-container');

                    if (teamPanelOverlay) {
                        teamPanelOverlay.classList.remove('active');
                        teamPanelOverlay.classList.remove('video-view');
                    }
                    
                    document.querySelectorAll('.team-panel--content').forEach(panel => {
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
                        setTimeout(() => {
                            scroll.update();
                        }, 100);
                    }
                }

                // Close button handler
                const closeBtn = document.querySelector('.team-panel--header .close');
                if (closeBtn) {
                    closeBtn.addEventListener('click', closeTeamPanel);
                }

                // Overlay click handler
                const overlay = document.querySelector('.team-panel--overlay');
                if (overlay) {
                    overlay.addEventListener('click', closeTeamPanel);
                }

                // Team carousel mouse event handlers
                const teamCarousel = document.querySelector('.team-carousel');
                if (teamCarousel) {
                    teamCarousel.addEventListener('mouseenter', function() {
                        if (scroll && !document.querySelector('.panel-container.active')) {
                            scroll.update();
                        }
                    });
                    
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