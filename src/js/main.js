// import LocomotiveScroll from 'locomotive-scroll';


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
                //console.log(dividers[i]);
            }


            //wait until images, links, fonts, stylesheets, and js is loaded
            window.addEventListener("load", function(e){    
                console.log("window loaded");

                const scroll = new LocomotiveScroll({
                    el: document.querySelector('[data-scroll-container]'),
                    smooth: true,
                    multiplier: 1,
                    class: 'loco-in-view'
                });



                // Initialize the main Swiper with the same navigation buttons
                var teamSwiper = new Swiper('.teamSwiper', {
                    slidesPerView: 1.5,
                    centeredSlides: true,
                    loop: true,
                    speed: 500,
                    spaceBetween: 72,
                    navigation: {
                        nextEl: '.team-swiper-button-next',
                        prevEl: '.team-swiper-button-prev',
                    },
                    breakpoints: {
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        }
                    }
                });
                let scrollTop = 0;
                scroll.on('scroll', (obj) => {
                    // Current vertical scroll position
                    scrollTop = obj.scroll.y;
                    //console.log('Current scroll position:', scrollTop);
                    
                    // You can also get horizontal scroll if needed
                    const scrollLeft = obj.scroll.x;
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

                        


                        // Add 'active' class to the overlay
                        scroll.stop();

                        teamPanelOverlay.classList.add('active');
                        teamPanelOverlay.style.top = scrollTop + 'px';

                    });
                });

                this.document.querySelector('.team-panel--header .close').addEventListener('click', function() {
                    const teamPanelOverlay = document.querySelector('.panel-container');

                    teamPanelOverlay.classList.remove('active');
                    document.querySelectorAll('.team-panel--content').forEach(link => {
                        link.classList.remove('active');
                    });
                    // teamPanelOverlay.style.top = '0px';
                    scroll.start();

                });

                this.document.querySelector('.team-panel--overlay').addEventListener('click', function() {
                    console.log('overlay clicked');
                    const teamPanelOverlay = document.querySelector('.panel-container');

                    teamPanelOverlay.classList.remove('active');
                    document.querySelectorAll('.team-panel--content').forEach(link => {
                        link.classList.remove('active');
                    });
                    // teamPanelOverlay.style.top = '0px';
                    scroll.start();

                });



            }, false);

  
        });
    }
}

new FidatoPluginJS();