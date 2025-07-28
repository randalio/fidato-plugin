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

            // Initialize scroll as null
            let scroll = null;
            let scrollTop = 0;

            // Function to initialize Locomotive Scroll
            function initScroll() {
                // Only initialize if not already initialized
                if (scroll === null) {
                    const scrollContainer = document.querySelector('[data-scroll-container]');
                    
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
                            class: 'loco-in-view',
                            lerp: 0.05,
                            scrollingClass: 'has-scroll-scrolling',
                            draggingClass: 'has-scroll-dragging'
                        });
                        
                        // Track scroll position
                        scroll.on('scroll', (obj) => {
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

            // Initialize scroll immediately when DOM is ready
            initScroll();
            
            // Then set up the hash links
            setupHashLinks();
            
            // Update the scroll instance
            if (scroll) {
                scroll.update();
            }

            // Handle scrolling to hash ONLY when user explicitly requests it
            let isInitialLoad = true;

            window.addEventListener('load', () => {
                console.log('Window loaded, updating scroll...');
                
                // Update scroll on complete page load
                if (scroll) {
                    scroll.update();
                } else {
                    console.warn('Scroll not initialized, attempting to initialize...');
                    initScroll();
                }
                
                // Get hash from URL
                const hash = window.location.hash.substring(1);
                
                // IMPORTANT: Only scroll to hash if this isn't the initial page load
                if (!isInitialLoad && hash) {
                    setTimeout(() => {
                        scrollToHash(hash);
                    }, 200);
                }
                
                isInitialLoad = false;
            });

            // Apply fix every 2 seconds instead of every second (less resource intensive)
            setInterval(() => {
                if (scroll) {
                    fixTopCutoff();
                }
            }, 2000);

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