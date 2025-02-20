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

            //wait until images, links, fonts, stylesheets, and js is loaded
            window.addEventListener("load", function(e){    
                console.log("window loaded");

                const scroll = new LocomotiveScroll({
                    el: document.querySelector('[data-scroll-container]'),
                    smooth: true,
                    multiplier: 0.8,
                    class: 'loco-in-view'
                });

            }, false);
        
            
        });
    }
}

new FidatoPluginJS();