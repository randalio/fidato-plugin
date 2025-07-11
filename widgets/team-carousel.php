<?php
class Elementor_Team_Carousel extends \Elementor\Widget_Base {

    public function get_name() { return 'team_carousel'; }
    public function get_title() { return 'Fidato Team Slider'; }
    public function get_icon() { return 'eicon-device-mobile'; }
    public function get_categories() { return ['general']; }


    // Function to get team members for the dropdown
    private function get_team_members_options() {
        $team_members = get_posts([
            'post_type' => 'our-team',
            'post_status' => 'publish',
            'numberposts' => 25,
            'orderby' => 'title',
            'order' => 'ASC',
        ]);
        
        $options = ['' => esc_html__('-- Select Team Member --', 'your-text-domain')];
        
        foreach ($team_members as $team_member) {
            $options[$team_member->ID] = $team_member->post_title;
        }
        
        return $options;
    }


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
        $repeater->add_control('team_member_id', [
            'label' => esc_html__('Select Team Member', 'fidato-wealth'),
            'type' => \Elementor\Controls_Manager::SELECT2,
            'options' => $this->get_team_members_options(),
            'default' => '',
            'label_block' => true,
        ]);
        
        $repeater->add_control('name', [
            'label' => __('Name', 'fidato-wealth'),
            'type' => \Elementor\Controls_Manager::TEXT,
            'condition' => [
                'team_member_id' => '',
            ],
        ]);
        $repeater->add_control('link', [
            'label' => __('URL Link', 'fidato-wealth'),
            'type' => \Elementor\Controls_Manager::URL,
            'condition' => [
                'team_member_id' => '',
            ],
        ]);
        $repeater->add_control('position', [
            'label' => __('Position', 'fidato-wealth'),
            'type' => \Elementor\Controls_Manager::TEXT,
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
        <div class="team-carousel">
            <div class="swiper teamSwiper">
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

                                <?php $member_id = $slide['team_member_id']; ?>
                                <?php if( !$member_id ){
                                    $name = $slide['name'];
                                    $url = $slide['link']['url'];
                                }else{
                                    $name = get_the_title($member_id);
                                    $url = get_the_permalink($member_id);
                                }
                                $slug = preg_replace("/[^A-Za-z0-9 ]/", '',strtolower(str_replace(' ', '', $name)));
                                ?>
                                <h3 class="name blue-grade"><?php echo $name;?></h3>
                                <p class="position"><?php echo $slide['position'];?></p>

                                <hr/>
                                <?php   
                                    $member = get_post( $member_id);
                                    $content = apply_filters('the_content',$member->post_content);
                                    $video =  get_field( 'team_video', $member_id); // 'https://vimeo.com/1079623899';
                                ?>

                                <div class="links-row">
                                    <?php if( $content != '' ): ?>
                                        <a class="link" href="#<?php echo $slug; ?>">
                                            <span>More Information</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="14" viewBox="0 0 21 14" fill="none">
                                                <path d="M-2.62268e-07 7L20 7M20 7L13.5714 1M20 7L13.5714 13" stroke="#113452"/>
                                            </svg>
                                        </a>
                                    <?php endif; ?>

                                    <?php if( $video != '' ): ?>
                                        <a class="video-icon" href="#<?php echo $slug; ?>">
                                            <i aria-hidden="true" class="fas fa-play-circle"></i>
                                        </a>
                                    <?php endif; ?>
                                </div>


                                    

                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>

                <div class="swiper-navigation">
                    <!-- Navigation Buttons -->
                    <div class="swiper-button-prev team-swiper-button-prev">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                            <circle cx="25" cy="25" r="25" transform="rotate(-180 25 25)" fill="#113452"/>
                            <path d="M40 25L10 25M10 25L19.6429 34M10 25L19.6429 16" stroke="white"/>
                        </svg>
                    </div>
                    <div class="swiper-button-next team-swiper-button-next">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                            <circle cx="25" cy="25" r="25" fill="#113452"/>
                            <path d="M10 25L40 25M40 25L30.3571 16M40 25L30.3571 34" stroke="white"/>
                        </svg>
                    </div>
            </div>

            </div>
        </div>


        <div class="panel-container">
            <div class="team-panel">
                <div class="team-panel--header">
                    <div class="close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                            <g filter="url(#filter0_d_254_186)">
                                <path d="M35.6065 34.6065C27.3222 26.3222 22.6776 21.6776 14.3933 13.3933" stroke="#113452"/>
                                <path d="M14.3934 34.6068C22.6776 26.3225 27.3223 21.6778 35.6066 13.3936" stroke="#113452"/>
                            </g>
                            <defs>
                                <filter id="filter0_d_254_186" x="0.0397949" y="0.0397949" width="59.9203" height="59.9204" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feMorphology radius="6" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_254_186"/>
                                <feOffset dx="5" dy="6"/>
                                <feGaussianBlur stdDeviation="6.5"/>
                                <feComposite in2="hardAlpha" operator="out"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_254_186"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_254_186" result="shape"/>
                                </filter>
                            </defs>
                        </svg>
                    </div>
                </div>

                <?php foreach ($settings['slides'] as $slide): ?>

                    <?php $member_id = $slide['team_member_id']; ?>
                    <?php if( !$member_id ){
                        $name = $slide['name'];
                        $url = $slide['link']['url'];
                    }else{
                        $name = get_the_title($member_id);
                        $url = get_the_permalink($member_id);
                    }
                    $slug = preg_replace("/[^A-Za-z0-9 ]/", '',strtolower(str_replace(' ', '', $name)));
                    ?>
                <div class="team-panel--content" id="<?php echo $slug;?>">

                        <?php $video =  get_field( 'team_video', $member_id); // 'https://vimeo.com/1079623899'; ?>

                        <?php if( $video != '' ): ?>

                            <?php
                            // convert video URL to vimeo link
                            // <div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1079623899?badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="La Perra"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>
                            $video = str_replace('vimeo.com/', 'player.vimeo.com/video/', $video);
                            $video .= '?badge=0&autopause=0&player_id=0&app_id=58479" width="1024" height="640" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share';
                            $video_embed = '<iframe src="' . $video . '" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>';

                            ?>

                        <div class="video-container">
                            <?php echo $video_embed; ?>
                        </div>
                        <?php endif; ?>

                        <div class="panel-info-content">
                            <?php 
                            // Add error checking before using the image
                            if (!empty($slide['image']['id'])) {
                                echo wp_get_attachment_image($slide['image']['id'], 'large');
                            } else {
                                // Show a placeholder or nothing
                                echo '<div class="no-image"></div>';
                            }
                            ?>

        
                            <h3 class="name"><span class="blue-grade"><?php echo $name;?></span></h3>
                            <p class="position"><?php echo $slide['position'];?></p>

                            <hr/>
                            <?php
                            $member = get_post( $member_id);
                            $content = apply_filters('the_content',$member->post_content);
                            echo $content; ?>
                            <hr/>

                            <?php if( $url == 'hide this' ): ?>
                            <a class="link" href="<?php echo $url; ?>">
                                <span>More Information</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="14" viewBox="0 0 21 14" fill="none">
                                    <path d="M-2.62268e-07 7L20 7M20 7L13.5714 1M20 7L13.5714 13" stroke="#113452"/>
                                </svg>
                            </a>
                            <?php endif; ?>
                        </div>


                    </div>
                <?php endforeach; ?>
            </div>
            <div class="team-panel--overlay"> </div>
        </div>
            



        <?php
    }
}