import Lenis from 'lenis';

// Add your JavaScript code here
class FidatoPluginJS {

    constructor() {
        this.init();
    }

    init() {

        // ----------------------
        // OPTIMIZED LENIS with Hash Scrolling Integration
        // ----------------------

        // Prevent initial browser hash jump
        (function preventInitialHashJump() {
            if (window.location.hash) {
                window.pendingHash = window.location.hash
                history.replaceState(null, null, window.location.pathname + window.location.search)
            }
        })()

        // Throttle function to limit execution frequency
        function throttle(func, delay) {
            let lastCall = 0
            let scheduled = false
            
            return function(...args) {
                const now = Date.now()
                
                if (now - lastCall >= delay) {
                    lastCall = now
                    func.apply(this, args)
                } else if (!scheduled) {
                    scheduled = true
                    setTimeout(() => {
                        scheduled = false
                        lastCall = Date.now()
                        func.apply(this, args)
                    }, delay - (now - lastCall))
                }
            }
        }

        // Use Intersection Observer for visibility detection instead of scroll calculations
        let observer = null
        function setupIntersectionObserver() {
            // Clean up existing observer
            if (observer) {
                observer.disconnect()
            }

            const options = {
                rootMargin: '50px 0px',
                threshold: [0, 0.1]
            }

            observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const className = entry.target.dataset.scrollClass
                    if (className) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add(className)
                        } else if (entry.target.hasAttribute('data-scroll-repeat')) {
                            entry.target.classList.remove(className)
                        }
                    }
                })
            }, options)

            // Observe elements with scroll-class
            document.querySelectorAll('[data-scroll-class]').forEach(el => {
                observer.observe(el)
            })
        }

        // Add animation to all dividers
        const dividers = document.querySelectorAll('.elementor-widget-divider')
        dividers.forEach(divider => {
            divider.setAttribute('data-scroll', '')
            divider.setAttribute('data-scroll-repeat', '')
            divider.setAttribute('data-scroll-class', 'loco-in-view')
        })

        // Add scroll tracking to elements with IDs
        document.querySelectorAll('[id]').forEach(element => {
            element.setAttribute('data-scroll', '')
            element.setAttribute('data-scroll-id', element.id)
        })

        // Initialize Lenis (no manual RAF loop needed with autoRaf)
        const lenis = new Lenis({
            autoRaf: true,
            lerp: 0.15,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
            allowNestedScroll: true,


        })

        // Setup Intersection Observer for class toggling
        setupIntersectionObserver()

        // Parallax handling with caching and throttling
        let parallaxCache = new Map()
        let rafId = null

        function cacheParallaxElements() {
            // Clear previous cache
            parallaxCache.clear()
            
            document.querySelectorAll('[data-scroll-speed]').forEach(el => {
                const rect = el.getBoundingClientRect()
                const scrollTop = window.scrollY || document.documentElement.scrollTop
                const speed = parseFloat(el.dataset.scrollSpeed) || 0
                
                parallaxCache.set(el, {
                    initialOffset: rect.top + scrollTop,
                    height: rect.height,
                    speed: speed
                })
            })
        }

        // Throttled parallax update (16ms = ~60fps)
        const updateParallax = throttle((scrollY) => {
            // Cancel any pending animation frame
            if (rafId) {
                cancelAnimationFrame(rafId)
            }
            
            rafId = requestAnimationFrame(() => {
                const windowHeight = window.innerHeight
                const viewportCenter = windowHeight / 2 + scrollY

                parallaxCache.forEach((data, el) => {
                    const elCenter = data.initialOffset + data.height / 2
                    const distanceFromCenter = elCenter - viewportCenter
                    
                    // Only update if element is near viewport
                    if (Math.abs(distanceFromCenter) < windowHeight * 1.5) {
                        let y = distanceFromCenter * data.speed / 10
                        y = Math.round(y * 100) / 100
                        
                        // Use will-change for better performance
                        if (!el.style.willChange) {
                            el.style.willChange = 'transform'
                        }
                        el.style.transform = `translate3d(0, ${y}px, 0)`
                    }
                })
                
                rafId = null
            })
        }, 32)

        // Cache elements initially
        cacheParallaxElements()

        // Debounced resize handler
        let resizeTimeout
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout)
            resizeTimeout = setTimeout(() => {
                cacheParallaxElements()
                setupIntersectionObserver()
            }, 250)
        }, { passive: true })

        // Only attach scroll listener if parallax elements exist
        if (parallaxCache.size > 0) {
            lenis.on('scroll', (e) => {
                updateParallax(e.scroll)
            })
        }

        // ----------------------
        // Hash Scrolling Integration
        // ----------------------

        // Handle anchor link clicks (delegated for performance)
        document.addEventListener('click', (e) => {
            const anchor = e.target.closest('a[href^="#"]')
            if (!anchor) return
            
            e.preventDefault()
            const targetId = anchor.getAttribute('href')
            if (targetId === '#') return
            
            const targetEl = document.querySelector(targetId)
            if (targetEl) {
                lenis.scrollTo(targetEl, {
                    offset: -100,
                    duration: 1.2,
                    easing: (t) => 1 - Math.pow(1 - t, 3),
                    onComplete: () => {
                        history.replaceState(null, null, targetId)
                    }
                })
            }
        }, { passive: false })

        // Handle pending hash after page loads
        function handlePendingHash() {
            if (window.pendingHash) {
                const targetEl = document.querySelector(window.pendingHash)
                if (targetEl) {
                    // Use requestIdleCallback for non-critical initial scroll
                    const scrollToHash = () => {
                        lenis.scrollTo(targetEl, {
                            offset: -100,
                            duration: 1.2,
                            easing: (t) => 1 - Math.pow(1 - t, 3),
                            onComplete: () => {
                                history.replaceState(null, null, 
                                    window.location.pathname + 
                                    window.location.search + 
                                    window.pendingHash)
                                delete window.pendingHash
                            }
                        })
                    }
                    
                    if ('requestIdleCallback' in window) {
                        requestIdleCallback(scrollToHash, { timeout: 500 })
                    } else {
                        setTimeout(scrollToHash, 200)
                    }
                }
            }
        }

        // Initialize hash handling when everything is loaded
        window.addEventListener('load', handlePendingHash, { once: true })

        // Cleanup on page unload to prevent memory leaks
        window.addEventListener('beforeunload', () => {
            if (observer) {
                observer.disconnect()
            }
            if (lenis) {
                lenis.destroy()
            }
            parallaxCache.clear()
        })



        // Wait until DOM is ready
        document.addEventListener("DOMContentLoaded", () => {
            console.log("DOM loaded");


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

            const teamCarousel = document.querySelector('.team-carousel');
        
            if (teamCarousel) {
                const observer = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            // Initialize Swiper once visible
                            
                            initTeamSwiper();
                            observer.unobserve(entry.target); // stop observing once initialized
                        }
                    });
                }, {
                    threshold: 0.2 // adjust: 0.2 = 20% visible before init
                });
        
                observer.observe(teamCarousel);
            }
        
            function initTeamSwiper() {
                var teamSwiper = new Swiper('.teamSwiper', {
                    slidesPerView: 1.5,
                    loop: true,
                    speed: 750,
                    centeredSlides: true,
                    spaceBetween: 32,
                    mousewheel: false,
                    allowTouchMove: true,
                    initialSlide: 0,
                    autoplay: {
                        delay: 3500,
                        disableOnInteraction: false,
                    },
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
                            allowTouchMove: true,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 100,
                            centeredSlides: false,
                            //allowTouchMove: false
                        }
                    },
                    // loopAdditionalSlides: 12,
                    // loopedSlides: 12,
                });
        
                // Button navigation
                const nextBtn = document.querySelector('.team-swiper-button-next');
                const prevBtn = document.querySelector('.team-swiper-button-prev');
        
                if (nextBtn) {
                    nextBtn.addEventListener('click', () => teamSwiper.slideNext());
                }
                if (prevBtn) {
                    prevBtn.addEventListener('click', () => teamSwiper.slidePrev());
                }
        
                // Team panel handlers
                document.querySelectorAll('.team-carousel .swiper-slide .link').forEach(link => {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();

                        lenis.stop();
                        
                        const linkHref = this.getAttribute('href').toString();
                        const targetPanel = document.querySelector(linkHref);
                        const teamPanelOverlay = document.querySelector('.panel-container');
                        
                        if (targetPanel) {
                            targetPanel.classList.add('active');
                        }

                        if (teamPanelOverlay) {
                            teamPanelOverlay.classList.add('active');
                            teamPanelOverlay.style.top = scrollTop + 'px';
                        }

                        // enable scroll within the panel content
                        const panelContent = document.querySelector('.team-panel--content.active .team-panel--body');
                        if (panelContent) {
                            panelContent.style.overflowY = 'auto';
                        }
                    

                        

                        

                    });
                });

                document.querySelectorAll('.team-carousel .swiper-slide .video-icon').forEach(link => {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();

                        lenis.stop();
                        
                        const linkHref = this.getAttribute('href').toString();
                        const targetPanel = document.querySelector(linkHref);
                        const teamPanelOverlay = document.querySelector('.panel-container');
                        
                        if (targetPanel) {
                            targetPanel.classList.add('active');
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
                    });

                    lenis.start();

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
            }





        });
    }
}

new FidatoPluginJS();