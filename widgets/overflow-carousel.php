<?php
class Elementor_Overflow_Carousel extends \Elementor\Widget_Base {

    public function get_name() { return 'overflow_carousel'; }
    public function get_title() { return 'Fidato Overflow Slider'; }
    public function get_icon() { return 'eicon-device-mobile'; }
    public function get_categories() { return ['general']; }


    protected function _register_controls() {
        $this->start_controls_section('content_section', [
            'label' => __('Content', 'fidato-wealth'),
            'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
        ]);


        // Define parent repeater for slides
        $repeater = new \Elementor\Repeater();

        $repeater->add_control('image', [
            'label' => __('Image', 'fidato-wealth'),
            'type' => \Elementor\Controls_Manager::MEDIA,
            'media_type' => 'image',
        ]);
        
        $repeater->add_control('title', [
            'label' => __('Title', 'fidato-wealth'),
            'type' => \Elementor\Controls_Manager::TEXT,

        ]);
        $repeater->add_control('link', [
            'label' => __('URL Link', 'fidato-wealth'),
            'type' => \Elementor\Controls_Manager::URL,

        ]);


        // Main repeater control for slides
        $this->add_control('slides', [
            'label' => __('Slides', 'fidato-wealth'),
            'type' => \Elementor\Controls_Manager::REPEATER,
            'fields' => $repeater->get_controls(),
            'title_field' => '{{{ name }}}',
        ]);

        $this->end_controls_section();
    }



    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <div class="overflow-carousel">
            <div class="overflowSwiper">
                <div class="swiper-wrapper">
                    <?php foreach ($settings['slides'] as $slide): ?>
                        <div class="swiper-slide">
                            <div class="slide-inner">
                                <?php 
                                // Add error checking before using the image
                                if (!empty($slide['image']['id'])) {
                                    echo wp_get_attachment_image($slide['image']['id'], 'large');
                                } else {
                                    // Show a placeholder or nothing
                                    echo '<div class="no-image"></div>';
                                }
                                ?>

    
                                <h3 class="name blue-grade">
                                    <span><?php echo $slide['title'];?></span>
                                </h3>
                                <hr/>

                                <a class="link" href="#<?php echo $slug; ?>">
                                    <span>Learn More</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="14" viewBox="0 0 21 14" fill="none">
                                        <path d="M-2.62268e-07 7L20 7M20 7L13.5714 1M20 7L13.5714 13" stroke="#113452"/>
                                    </svg>
                                </a>

                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>

                <div class="swiper-navigation">
                    <!-- Navigation Buttons -->
                    <div class="swiper-button-prev overflow-swiper-button-prev">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                        <circle cx="25" cy="25" r="25" transform="rotate(-180 25 25)" fill="#113452"/>
                        <path d="M40 25L10 25M10 25L19.6429 34M10 25L19.6429 16" stroke="white"/>
                        </svg>
                    </div>
                    <div class="swiper-button-next overflow-swiper-button-next">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                        <circle cx="25" cy="25" r="25" fill="#113452"/>
                        <path d="M10 25L40 25M40 25L30.3571 16M40 25L30.3571 34" stroke="white"/>
                        </svg>
                    </div>
            </div>

            </div>
        </div>
            
        <?php
    }
}