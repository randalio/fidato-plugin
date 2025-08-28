import Lenis from 'lenis';

// Add your JavaScript code here
class FidatoPluginJS {

    constructor() {
        this.init();
    }

    init() {
        // Wait until DOM is ready
        document.addEventListener("DOMContentLoaded", () => {
            console.log("DOM loaded");

            // ----------------------
            // LENIS with Hash Scrolling Integration
            // ----------------------

            // STEP 1: Prevent initial browser hash jump
            (function preventInitialHashJump() {
                if (window.location.hash) {
                    // Store hash and clear it temporarily
                    window.pendingHash = window.location.hash
                    history.replaceState(null, null, window.location.pathname + window.location.search)
                }
            })()

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

            // Initialize Lenis
            const lenis = new Lenis({
                autoRaf: true,
                lerp: 0.15,
            })

            // Cached elements
            let classElements = []
            let parallaxItems = []

            function cacheElements() {
                const scrollTop = window.scrollY || document.documentElement.scrollTop

                // Elements that toggle class when in view
                classElements = [...document.querySelectorAll('[data-scroll-class]')]

                // Elements that use parallax
                parallaxItems = [...document.querySelectorAll('[data-scroll-speed]')].map(el => {
                const rect = el.getBoundingClientRect()
                const elCenter = rect.top + scrollTop + rect.height / 2
                const speed = parseFloat(el.dataset.scrollSpeed) || 0
                return { el, elCenter, speed }
                })
            }

            // Re-cache when layout changes
            window.addEventListener('resize', cacheElements)
            window.addEventListener('load', cacheElements)
            cacheElements()

            function updateEffects(scrollY) {
                const windowHeight = window.innerHeight
                const viewportCenter = windowHeight / 2 + scrollY

                // Toggle classes
                classElements.forEach((el) => {
                const rect = el.getBoundingClientRect()
                const inView = rect.top < windowHeight && rect.bottom > 0
                const className = el.dataset.scrollClass
                inView ? el.classList.add(className) : el.classList.remove(className)
                })

                // Apply parallax
                parallaxItems.forEach(({ el, elCenter, speed }) => {
                const distanceFromCenter = elCenter - viewportCenter
                let y = distanceFromCenter * speed / 10

                // Clamp to 2 decimals for smoother paints
                y = Math.round(y * 100) / 100

                el.style.transform = `translate3d(0, ${y}px, 0)`
                })
            }

            // Lenis scroll listener
            lenis.on('scroll', (e) => {
                updateEffects(e.scroll)
            })

            // Initial run
            updateEffects(window.scrollY)

            // ----------------------
            // Hash Scrolling Integration
            // ----------------------

            // Handle anchor link clicks
            document.addEventListener('click', (e) => {
                const anchor = e.target.closest('a[href^="#"]')
                if (anchor) {
                    e.preventDefault()
                    const targetId = anchor.getAttribute('href')
                    const targetEl = document.querySelector(targetId)
                    
                    if (targetEl) {
                        lenis.scrollTo(targetEl, {
                            offset: -100, // 100px offset above target
                            duration: 1.2,
                            easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic
                            onComplete: () => {
                                // Update URL after scroll completes
                                history.replaceState(null, null, targetId)
                            }
                        })
                    }
                }
            })

            // Handle pending hash after page loads
            function handlePendingHash() {
                if (window.pendingHash && lenis) {
                    const targetEl = document.querySelector(window.pendingHash)
                    if (targetEl) {
                        setTimeout(() => {
                            lenis.scrollTo(targetEl, {
                                offset: -100, // 100px offset above target
                                duration: 1.2,
                                easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic
                                onComplete: () => {
                                    // Restore hash to URL
                                    history.replaceState(null, null, window.location.pathname + window.location.search + window.pendingHash)
                                    delete window.pendingHash
                                }
                            })
                        }, 200) // Delay to ensure Lenis and animations are ready
                    }
                }
            }

            // Initialize hash handling when everything is loaded
            window.addEventListener('load', handlePendingHash)

            // RAF loop (keeping your existing setup)
            function raf(time) {
                lenis.raf(time)
                requestAnimationFrame(raf)
            }
            requestAnimationFrame(raf)
  
  
  
  


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
                        // slideChangeTransitionEnd: function() {
                        //     if (scroll) {
                        //         scroll.update();
                        //     }
                        // },
                        // touchEnd: function() {
                        //     if (scroll) {
                        //         setTimeout(() => {
                        //             scroll.update();
                        //         }, 100);
                        //     }
                        // }
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
                        
                        // if (scroll) {
                        //     scroll.stop();
                        // }

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

                        // if (scroll) {
                        //     scroll.stop();
                        // }

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

                    // if (scroll) {
                    //     scroll.start();
                    //     setTimeout(() => {
                    //         scroll.update();
                    //     }, 100);
                    // }
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
                // if (teamCarousel) {
                //     teamCarousel.addEventListener('mouseenter', function() {
                //         if (scroll && !document.querySelector('.panel-container.active')) {
                //             scroll.update();
                //         }
                //     });
                    
                //     teamCarousel.addEventListener('mouseleave', function() {
                //         if (scroll && !document.querySelector('.panel-container.active')) {
                //             scroll.update();
                //         }
                //     });
                // }
            }
        });
    }
}

new FidatoPluginJS();