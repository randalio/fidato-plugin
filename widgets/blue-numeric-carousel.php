<?php
class Elementor_Blue_Numeric_Carousel extends \Elementor\Widget_Base {

    public function get_name() { return 'blue_numeric_carousel'; }
    public function get_title() { return 'Fidato Blue Numeric Slider'; }
    public function get_icon() { return 'eicon-device-mobile'; }
    public function get_categories() { return ['general']; }


    protected function _register_controls() {
        $this->start_controls_section('content_section', [
            'label' => __('Content', 'fidato-wealth'),
            'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
        ]);


        // Define parent repeater for slides
        $repeater = new \Elementor\Repeater();

        $repeater->add_control('icon_image', [
            'label' => __('Icon Image', 'fidato-wealth'),
            'type' => \Elementor\Controls_Manager::MEDIA,
            'media_type' => 'image',
        ]);
        
        $repeater->add_control('title', [
            'label' => __('Title', 'fidato-wealth'),
            'type' => \Elementor\Controls_Manager::TEXT,

        ]);

        $repeater->add_control('content', [
            'label' => __('Content', 'fidato-wealth'),
            'type' => \Elementor\Controls_Manager::TEXTAREA,

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
        <div class="blue-numeric-carousel">
            <div class="blueNumericSwiper">
                <div class="swiper-wrapper">
                    <?php foreach ($settings['slides'] as $i => $slide): $ii = $i + 1; ?>
                        <div class="swiper-slide">
                            <div class="slide-inner">
                               

                                <div class="swiper-slide--header">

                                    <div class="swiper-slide--header-decoration">

                                    <span class="counter">0<?php echo $ii;?></span>


                                    <?php 
                                    // Add error checking before using the image
                                    if (!empty($slide['icon_image']['id'])) {
                                        echo wp_get_attachment_image($slide['icon_image']['id'], 'medium');
                                    } else {
                                        // Show a placeholder or nothing
                                        echo '<div class="no-image"></div>';
                                    }
                                    ?>


                                    </div>

                                    <h3 class="name"><?php echo $slide['title'];?></h3>
                                    <p><?php echo $slide['content'];?></p>
                                </div>

                                <div class="swiper-slide--footer">
                                    <hr/>
                                    <a class="link" href="#<?php echo $slug; ?>">
                                        <span>Learn More</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="14" viewBox="0 0 21 14" fill="none">
                                            <path d="M-2.62268e-07 7L20 7M20 7L13.5714 1M20 7L13.5714 13" stroke="#113452"/>
                                        </svg>
                                    </a>
                                </div>

                               

                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>

                <div class="swiper-navigation">
                    <!-- Navigation Buttons -->
                    <div class="swiper-button-next blue-numeric-swiper-button-prev">
                        <svg xmlns="http://www.w3.org/2000/svg" width="88" height="88" viewBox="0 0 88 88" fill="none">
                            <g filter="url(#filter0_d_40_63)">
                                <circle cx="39" cy="38" r="25" transform="rotate(-180 39 38)" fill="#113452"/>
                                <path d="M54 38L24 38M24 38L33.6429 47M24 38L33.6429 29" stroke="white"/>
                            </g>
                            <defs>
                                <filter id="filter0_d_40_63" x="0" y="0" width="88" height="88" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feMorphology radius="6" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_40_63"/>
                                <feOffset dx="5" dy="6"/>
                                <feGaussianBlur stdDeviation="6.5"/>
                                <feComposite in2="hardAlpha" operator="out"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_40_63"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_40_63" result="shape"/>
                                </filter>
                            </defs>
                        </svg>
                    </div>
                    <div class="swiper-button-next blue-numeric-swiper-button-next">
                        <svg xmlns="http://www.w3.org/2000/svg" width="88" height="88" viewBox="0 0 88 88" fill="none">
                            <g filter="url(#filter0_d_40_70)">
                                <circle cx="39" cy="38" r="25" fill="#113452"/>
                                <path d="M24 38L54 38M54 38L44.3571 29M54 38L44.3571 47" stroke="white"/>
                            </g>
                            <defs>
                                <filter id="filter0_d_40_70" x="0" y="0" width="88" height="88" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feMorphology radius="6" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_40_70"/>
                                <feOffset dx="5" dy="6"/>
                                <feGaussianBlur stdDeviation="6.5"/>
                                <feComposite in2="hardAlpha" operator="out"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_40_70"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_40_70" result="shape"/>
                                </filter>
                            </defs>
                        </svg>
                    </div>
            </div>

            </div>
        </div>
            
        <?php
    }
}