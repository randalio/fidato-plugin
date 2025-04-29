<?php
/**
 * Plugin Name: Fidato Wealth
 * Description: Plugin with Webpack build system
 * Version: 1.0.22
 * Author: Randal Pope
 */

if (!defined('ABSPATH')) {
    exit;
}




/* Team Slider */
function register_team_carousel_elementor_widget( $widgets_manager ) {
    require_once( __DIR__ . '/widgets/team-carousel.php' );
    $widgets_manager->register( new \Elementor_Team_Carousel() );
}
add_action( 'elementor/widgets/register', 'register_team_carousel_elementor_widget' );


/* Overflow Photo Slider */
function register_overflow_carousel_elementor_widget( $widgets_manager ) {
    require_once( __DIR__ . '/widgets/overflow-carousel.php' );
    $widgets_manager->register( new \Elementor_Overflow_Carousel() );
}
add_action( 'elementor/widgets/register', 'register_overflow_carousel_elementor_widget' );


/* Overflow Blue Numeric Slider */
function register_blue_numeric_carousel_elementor_widget( $widgets_manager ) {
    require_once( __DIR__ . '/widgets/blue-numeric-carousel.php' );
    $widgets_manager->register( new \Elementor_Blue_Numeric_Carousel() );
}
add_action( 'elementor/widgets/register', 'register_blue_numeric_carousel_elementor_widget' );


/* Learning Center Resources Slider */
function register_learning_center_carousel_elementor_widget( $widgets_manager ) {
    require_once( __DIR__ . '/widgets/learning-center-carousel.php' );
    $widgets_manager->register( new \Elementor_Learning_Center_Carousel() );
}
add_action( 'elementor/widgets/register', 'register_learning_center_carousel_elementor_widget' );


//Resource Card
require_once( __DIR__ . '/template-functions/resource-card.php' );


// add wrapper to gform buttons
function add_button_wrapper_with_class( $button, $form ) {
    // Return without changes for the admin back-end.
    if ( is_admin() ){
        return $button;
    }
    return '<span class="gform_submit_button">'.$button . '
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="14" viewBox="0 0 21 14" fill="none">
            <path d="M-2.62268e-07 7L20 7M20 7L13.5714 1M20 7L13.5714 13" stroke="#E5684C"/>
        </svg>
    </span>';
}
add_filter( 'gform_submit_button', 'add_button_wrapper_with_class', 10, 2 );

/**
 * Change the Gravity Forms required legend message
 */
add_filter('gform_required_legend', 'custom_required_legend', 10, 2);
function custom_required_legend($legend, $form) {
    // Change this text to whatever message you want
    return '<span class="gfield_required gfield_required_asterisk">*</span> All fields are required.';
}


add_action('wp_footer', function () {
    ?>
    <script>
      jQuery(document).ready(function($) {
        $('.gform_wrapper').each(function() {
          var $formWrapper = $(this);
          var $legend = $formWrapper.find('.gform_required_legend');
  
          if ($legend.length) {
            $formWrapper.find('.gform-footer').append($legend);
          }
        });
      });
    </script>
    <?php
  });




// Register Team Custom Post Type
function custom_post_type() {

    // Company Roster / Team
	$labels = array(
		'name'                  => _x( 'Members', 'Post Type General Name', 'fidato-wealth' ),
		'singular_name'         => _x( 'Member', 'Post Type Singular Name', 'fidato-wealth' ),
		'menu_name'             => __( 'Company Roster', 'fidato-wealth' ),
		'name_admin_bar'        => __( 'Company Roster', 'fidato-wealth' ),
		'archives'              => __( 'Item Archives', 'fidato-wealth' ),
		'attributes'            => __( 'Item Attributes', 'fidato-wealth' ),
		'parent_item_colon'     => __( 'Parent Member:', 'fidato-wealth' ),
		'all_items'             => __( 'All Members', 'fidato-wealth' ),
		'add_new_item'          => __( 'Add New Member', 'fidato-wealth' ),
		'add_new'               => __( 'Add New', 'fidato-wealth' ),
		'new_item'              => __( 'New Member', 'fidato-wealth' ),
		'edit_item'             => __( 'Edit Member', 'fidato-wealth' ),
		'update_item'           => __( 'Update Member', 'fidato-wealth' ),
		'view_item'             => __( 'View Member', 'fidato-wealth' ),
		'view_items'            => __( 'View Member', 'fidato-wealth' ),
		'search_items'          => __( 'Search Member', 'fidato-wealth' ),
		'not_found'             => __( 'Not found', 'fidato-wealth' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'fidato-wealth' ),
		'featured_image'        => __( 'Featured Image', 'fidato-wealth' ),
		'set_featured_image'    => __( 'Set featured image', 'fidato-wealth' ),
		'remove_featured_image' => __( 'Remove featured image', 'fidato-wealth' ),
		'use_featured_image'    => __( 'Use as featured image', 'fidato-wealth' ),
		'insert_into_item'      => __( 'Insert into member', 'fidato-wealth' ),
		'uploaded_to_this_item' => __( 'Uploaded to this member', 'fidato-wealth' ),
		'items_list'            => __( 'Members list', 'fidato-wealth' ),
		'items_list_navigation' => __( 'Members list navigation', 'fidato-wealth' ),
		'filter_items_list'     => __( 'Filter members list', 'fidato-wealth' ),
	);
	$args = array(
		'label'                 => __( 'Member', 'fidato-wealth' ),
		'description'           => __( 'Post Type Description', 'fidato-wealth' ),
		'labels'                => $labels,
		'supports'              => array( 'title', 'editor', 'excerpt' ),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 5,
		'menu_icon'             => 'dashicons-groups',
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'page',
	);
	register_post_type( 'our-team', $args );


    // Podcasts
    $labels = array(
		'name'                  => _x( 'Podcasts', 'Post Type General Name', 'fidato-wealth' ),
		'singular_name'         => _x( 'Podcast', 'Post Type Singular Name', 'fidato-wealth' ),
		'menu_name'             => __( 'Podcasts', 'fidato-wealth' ),
		'name_admin_bar'        => __( 'Podcasts', 'fidato-wealth' ),
		'archives'              => __( 'Podcast Archives', 'fidato-wealth' ),
		'attributes'            => __( 'Podcast Attributes', 'fidato-wealth' ),
		'parent_item_colon'     => __( 'Parent Podcast:', 'fidato-wealth' ),
		'all_items'             => __( 'All Podcasts', 'fidato-wealth' ),
		'add_new_item'          => __( 'Add New Podcast', 'fidato-wealth' ),
		'add_new'               => __( 'Add New', 'fidato-wealth' ),
		'new_item'              => __( 'New Podcast', 'fidato-wealth' ),
		'edit_item'             => __( 'Edit Podcast', 'fidato-wealth' ),
		'update_item'           => __( 'Update Podcast', 'fidato-wealth' ),
		'view_item'             => __( 'View Podcast', 'fidato-wealth' ),
		'view_items'            => __( 'View Podcast', 'fidato-wealth' ),
		'search_items'          => __( 'Search Podcast', 'fidato-wealth' ),
		'not_found'             => __( 'Not found', 'fidato-wealth' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'fidato-wealth' ),
		'featured_image'        => __( 'Featured Image', 'fidato-wealth' ),
		'set_featured_image'    => __( 'Set featured image', 'fidato-wealth' ),
		'remove_featured_image' => __( 'Remove featured image', 'fidato-wealth' ),
		'use_featured_image'    => __( 'Use as featured image', 'fidato-wealth' ),
		'insert_into_item'      => __( 'Insert into Podcast', 'fidato-wealth' ),
		'uploaded_to_this_item' => __( 'Uploaded to this Podcast', 'fidato-wealth' ),
		'items_list'            => __( 'Podcast list', 'fidato-wealth' ),
		'items_list_navigation' => __( 'Podcast list navigation', 'fidato-wealth' ),
		'filter_items_list'     => __( 'Filter members list', 'fidato-wealth' ),
	);
	$args = array(
		'label'                 => __( 'Podcast', 'fidato-wealth' ),
		'description'           => __( 'Post Type Description', 'fidato-wealth' ),
		'labels'                => $labels,
		'supports'              => array( 'title', 'editor', 'excerpt' ),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 20,
		'menu_icon'             => 'dashicons-controls-volumeon',
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'page',
	);
	register_post_type( 'podcasts', $args );
    register_taxonomy_for_object_type( 'category', 'podcasts' );


    // Articles
    $labels = array(
        'name'                  => _x( 'Articles', 'Post Type General Name', 'fidato-wealth' ),
        'singular_name'         => _x( 'Article', 'Post Type Singular Name', 'fidato-wealth' ),
        'menu_name'             => __( 'Articles', 'fidato-wealth' ),
        'name_admin_bar'        => __( 'Articles', 'fidato-wealth' ),
        'archives'              => __( 'Article Archives', 'fidato-wealth' ),
        'attributes'            => __( 'Article Attributes', 'fidato-wealth' ),
        'parent_item_colon'     => __( 'Parent Article:', 'fidato-wealth' ),
        'all_items'             => __( 'All Articles', 'fidato-wealth' ),
        'add_new_item'          => __( 'Add New Article', 'fidato-wealth' ),
        'add_new'               => __( 'Add New', 'fidato-wealth' ),
        'new_item'              => __( 'New Article', 'fidato-wealth' ),
        'edit_item'             => __( 'Edit Article', 'fidato-wealth' ),
        'update_item'           => __( 'Update Article', 'fidato-wealth' ),
        'view_item'             => __( 'View Article', 'fidato-wealth' ),
        'view_items'            => __( 'View Article', 'fidato-wealth' ),
        'search_items'          => __( 'Search Article', 'fidato-wealth' ),
        'not_found'             => __( 'Not found', 'fidato-wealth' ),
        'not_found_in_trash'    => __( 'Not found in Trash', 'fidato-wealth' ),
        'featured_image'        => __( 'Featured Image', 'fidato-wealth' ),
        'set_featured_image'    => __( 'Set featured image', 'fidato-wealth' ),
        'remove_featured_image' => __( 'Remove featured image', 'fidato-wealth' ),
        'use_featured_image'    => __( 'Use as featured image', 'fidato-wealth' ),
        'insert_into_item'      => __( 'Insert into Article', 'fidato-wealth' ),
        'uploaded_to_this_item' => __( 'Uploaded to this Article', 'fidato-wealth' ),
        'items_list'            => __( 'Article list', 'fidato-wealth' ),
        'items_list_navigation' => __( 'Article list navigation', 'fidato-wealth' ),
        'filter_items_list'     => __( 'Filter members list', 'fidato-wealth' ),
    );
    $args = array(
        'label'                 => __( 'Article', 'fidato-wealth' ),
        'description'           => __( 'Post Type Description', 'fidato-wealth' ),
        'labels'                => $labels,
        'supports'              => array( 'title', 'editor', 'excerpt' ),
        'hierarchical'          => false,
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 20,
        'menu_icon'             => 'dashicons-media-document',
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => true,
        'can_export'            => true,
        'has_archive'           => true,
        'exclude_from_search'   => false,
        'publicly_queryable'    => true,
        'capability_type'       => 'page',
    );
    register_post_type( 'articles', $args );
    register_taxonomy_for_object_type( 'category', 'articles' );


    // Videos
    $labels = array(
        'name'                  => _x( 'Videos', 'Post Type General Name', 'fidato-wealth' ),
        'singular_name'         => _x( 'Video', 'Post Type Singular Name', 'fidato-wealth' ),
        'menu_name'             => __( 'Videos', 'fidato-wealth' ),
        'name_admin_bar'        => __( 'Videos', 'fidato-wealth' ),
        'archives'              => __( 'Video Archives', 'fidato-wealth' ),
        'attributes'            => __( 'Video Attributes', 'fidato-wealth' ),
        'parent_item_colon'     => __( 'Parent Video:', 'fidato-wealth' ),
        'all_items'             => __( 'All Videos', 'fidato-wealth' ),
        'add_new_item'          => __( 'Add New Video', 'fidato-wealth' ),
        'add_new'               => __( 'Add New', 'fidato-wealth' ),
        'new_item'              => __( 'New Video', 'fidato-wealth' ),
        'edit_item'             => __( 'Edit Video', 'fidato-wealth' ),
        'update_item'           => __( 'Update Video', 'fidato-wealth' ),
        'view_item'             => __( 'View Video', 'fidato-wealth' ),
        'view_items'            => __( 'View Video', 'fidato-wealth' ),
        'search_items'          => __( 'Search Video', 'fidato-wealth' ),
        'not_found'             => __( 'Not found', 'fidato-wealth' ),
        'not_found_in_trash'    => __( 'Not found in Trash', 'fidato-wealth' ),
        'featured_image'        => __( 'Featured Image', 'fidato-wealth' ),
        'set_featured_image'    => __( 'Set featured image', 'fidato-wealth' ),
        'remove_featured_image' => __( 'Remove featured image', 'fidato-wealth' ),
        'use_featured_image'    => __( 'Use as featured image', 'fidato-wealth' ),
        'insert_into_item'      => __( 'Insert into Video', 'fidato-wealth' ),
        'uploaded_to_this_item' => __( 'Uploaded to this Video', 'fidato-wealth' ),
        'items_list'            => __( 'Video list', 'fidato-wealth' ),
        'items_list_navigation' => __( 'Video list navigation', 'fidato-wealth' ),
        'filter_items_list'     => __( 'Filter members list', 'fidato-wealth' ),
    );
    $args = array(
        'label'                 => __( 'Video', 'fidato-wealth' ),
        'description'           => __( 'Post Type Description', 'fidato-wealth' ),
        'labels'                => $labels,
        'supports'              => array( 'title', 'editor', 'excerpt' ),
        'hierarchical'          => false,
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 20,
        'menu_icon'             => 'dashicons-format-video',
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => true,
        'can_export'            => true,
        'has_archive'           => true,
        'exclude_from_search'   => false,
        'publicly_queryable'    => true,
        'capability_type'       => 'page',
    );
    register_post_type( 'videos', $args );
    register_taxonomy_for_object_type( 'category', 'videos' );


}
add_action( 'init', 'custom_post_type', 0 );

// Increase memory limit for this plugin
function fidato_increase_memory_limit() {
    if (current_user_can('administrator')) {
        ini_set('memory_limit', '256M');
    }
}
add_action('admin_init', 'fidato_increase_memory_limit');


class MyPlugin {
    private $version = '1.0.22';

    public function __construct() {
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_assets'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_frontend_assets'));

        add_action('wp_body_open', function() {
            echo '<div data-scroll>';
            echo '  <div data-scroll-container>';
        });
        add_action('wp_footer', function() {
            echo '  </div>';
            echo '</div>';
        });

    }



    public function enqueue_admin_assets($hook) {
        wp_enqueue_style(
            'fidato-admin',
            plugin_dir_url(__FILE__) . 'dist/css/main.css',
            array(),
            $this->version
        );
    }

    public function enqueue_frontend_assets() {
        wp_enqueue_style(
            'fidato-frontend',
            plugin_dir_url(__FILE__) . 'dist/css/main.css',
            array(),
            $this->version
        );

        wp_enqueue_style(
            'locomotive-scroll-css',
            plugin_dir_url(__FILE__) . 'dist/css/locomotive-scroll.min.css',
            array(),
            $this->version
        );

        wp_enqueue_script(
            'locomotive-scroll-js',
            plugin_dir_url(__FILE__) . 'dist/js/locomotive-scroll.min.js',
            array(),
            $this->version,
            true
        );

        wp_enqueue_script(
            'fidato-frontend',
            plugin_dir_url(__FILE__) . 'dist/js/main.js',
            array('jquery', 'locomotive-scroll-js'),
            $this->version,
            true
        );

        wp_enqueue_script(
            'swiper',
            'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js'
        );
        
        wp_enqueue_style(
            'swiper-styles',
            plugin_dir_url(__FILE__) . 'dist/css/swiper.css',
            array(),
            $this->version
        );


    }


}
new MyPlugin();



 

