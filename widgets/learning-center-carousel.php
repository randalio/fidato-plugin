<?php
class Elementor_Learning_Center_Carousel extends \Elementor\Widget_Base {

    public function get_name() { return 'learning_center_carousel'; }
    public function get_title() { return 'Fidato Learning Center Resource Slider'; }
    public function get_icon() { return 'eicon-device-mobile'; }
    public function get_categories() { return ['general']; }


    // Function to get team members for the dropdown
    private function get_post_type_options() {
        $post_types = get_post_types( array(), 'objects' );
        
        $options = ['' => esc_html__('-- Select Post Type --', 'your-text-domain')];
        
        foreach ($post_types as $slug => $post_type) {
            $options[$slug] = $post_type->labels->name;
        }
        
        return $options;
    }
    

    protected function _register_controls() {
        $this->start_controls_section('content_section', [
            'label' => __('Content', 'fidato-wealth'),
            'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
        ]);

        $this->add_control('display_style', [
            'label' => esc_html__('Display Style', 'fidato-wealth'),
            'type' => \Elementor\Controls_Manager::SELECT,
            'options' => [
                'featured' => 'Featured',
                'grid' => 'Grid'
            ],
            'default' => 'grid',
            'label_block' => true,
        ]);

        $this->add_control('resource_type', [
            'label' => esc_html__('Select Post Type', 'fidato-wealth'),
            'type' => \Elementor\Controls_Manager::SELECT2,
            'options' => $this->get_post_type_options(),
            'default' => '',
            'label_block' => true,
        ]);

        $this->add_control(
			'list',
			[
				'label' => esc_html__( 'Choose Posts', 'textdomain' ),
				'type' => \Elementor\Controls_Manager::SELECT2,
				'label_block' => true,
				'multiple' => true,
				// 'options' => [
				// 	'title'  => esc_html__( 'Title', 'textdomain' ),
				// 	'description' => esc_html__( 'Description', 'textdomain' ),
				// 	'button' => esc_html__( 'Button', 'textdomain' ),
				// ],
				'default' => [ 'title', 'description' ],
                'condition' => [
                    'display_style' => 'featured',
                ],
			]
		);

        $this->add_control('rows', [
            'label' => __('Rows', 'fidato-wealth'),
            'type' => \Elementor\Controls_Manager::NUMBER,
            'condition' => [
                'display_style' => 'grid',
            ],
            'default' => 1,
            'max' => 4,
        ]);

        $this->add_control('button', [
            'label' => __('Button Text', 'fidato-wealth'),
            'type' => \Elementor\Controls_Manager::TEXT,
            'default' => 'Read More',
        ]);

        $this->end_controls_section();
    }



    protected function render() {
        $settings = $this->get_settings_for_display();

        $args = array(
            'posts_per_page' => -1, //$settings['rows'] * 2,
            'post_type' => $settings['resource_type'],
            'fields' => 'ids',
        );

        if( $settings['display_style'] == 'featured' ){
            $args['category_name'] = 'featured';
        }

        $posts_per_slide = $settings['rows'] * 2;

        $resources = get_posts( $args );


        $groupSize = $posts_per_slide;
        // Initialize counter
        $counter = 0;
        $totalResources = count($resources);

        ?>
        <div class="learning-center-carousel <?php echo  $settings['resource_type'].' '. $settings['display_style'];?>">
            <div class="learningCenterSwiper swiper">
                <div class="swiper-wrapper">

                    <?php
                    foreach ($resources as $index => $resource) {
                        // Open a new div at the start of each group
                        if ($counter % ($groupSize ?: 1) == 0) {
                            echo '<div class="swiper-slide"><div class="slide-inner">';
                        }

                        echo output_resource_card( $resource, $settings['resource_type'], $settings['button'], $settings['display_style'] );
                        
                        // Close the div at the end of each group or at the end of all resources
                        if ((($counter % ($groupSize ?: 1)) == (($groupSize ?: 1) - 1)) || ($index == $totalResources - 1)) {
                            echo '</div></div>';
                        }

                        $counter++;
                    }
                ?>
                </div>

                <div class="swiper-navigation">
                    <!-- Navigation Buttons -->
                    <div class="swiper-button-prev learning-center-swiper-button-prev">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                        <circle cx="25" cy="25" r="25" transform="rotate(-180 25 25)" fill="#113452"/>
                        <path d="M40 25L10 25M10 25L19.6429 34M10 25L19.6429 16" stroke="white"/>
                        </svg>
                    </div>
                    <div class="swiper-button-next learning-center-swiper-button-next">
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