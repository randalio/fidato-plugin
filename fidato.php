<?php
/**
 * Plugin Name: Fidato Wealth
 * Description: Plugin with Webpack build system
 * Version: 1.0.4
 * Author: Randal Pope
 */

if (!defined('ABSPATH')) {
    exit;
}

function register_team_carousel_elementor_widget( $widgets_manager ) {
    require_once( __DIR__ . '/widgets/team-carousel.php' );
    $widgets_manager->register( new \Elementor_Team_Carousel() );
}
add_action( 'elementor/widgets/register', 'register_team_carousel_elementor_widget' );

// Register Team Custom Post Type
function custom_post_type() {

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

}
add_action( 'init', 'custom_post_type', 0 );

class MyPlugin {
    private $version = '1.0.4';

    public function __construct() {
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_assets'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_frontend_assets'));

        add_action('wp_body_open', function() {
            echo '<div id="data-scroll-container" data-scroll-container>';
        });
        add_action('wp_footer', function() {
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



 

