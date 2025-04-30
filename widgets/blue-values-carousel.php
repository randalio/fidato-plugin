<?php
class Elementor_Blue_Values_Carousel extends \Elementor\Widget_Base {

    public function get_name() { return 'blue_values_carousel'; }
    public function get_title() { return 'Fidato Blue Values Slider'; }
    public function get_icon() { return 'eicon-device-mobile'; }
    public function get_categories() { return ['general']; }


    protected function _register_controls() {
        $this->start_controls_section('content_section', [
            'label' => __('Content', 'fidato-wealth'),
            'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
        ]);

        // Define parent repeater for slides
        $repeater = new \Elementor\Repeater();

        $repeater->add_control('title', [
            'label' => __('Title', 'fidato-wealth'),
            'type' => \Elementor\Controls_Manager::TEXT,

        ]);

        $repeater->add_control('content', [
            'label' => __('Content', 'fidato-wealth'),
            'type' => \Elementor\Controls_Manager::TEXTAREA,

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
        <div class="blue-values-carousel">
            <div class="blueValuesSwiper">
                <div class="swiper-wrapper">
                    <?php foreach ($settings['slides'] as $i => $slide): ?>
                        <div class="swiper-slide">
                            <div class="slide-inner">
                               
                                <div class="swiper-slide--header">

                                    <h3 class="name"><?php echo $slide['title'];?></h3>
                                    <p><?php echo $slide['content'];?></p>
                                </div>

                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>

                <div class="swiper-navigation">
                    <!-- Navigation Buttons -->
                    <div class="swiper-button-next blue-values-swiper-button-prev">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                            <circle cx="25" cy="25" r="25" transform="rotate(-180 25 25)" fill="#113452"/>
                            <path d="M40 25L10 25M10 25L19.6429 34M10 25L19.6429 16" stroke="white"/>
                        </svg>
                        
                    </div>
                    <div class="swiper-button-next blue-values-swiper-button-next">
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