<?php
/**
 * Plugin Name: Fidato Wealth
 * Description: Plugin with Webpack build system
 * Version: 1.0.0
 * Author: Randal Pope
 */

if (!defined('ABSPATH')) {
    exit;
}

class MyPlugin {
    private $version = '1.0.0';

    public function __construct() {
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_assets'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_frontend_assets'));
        

        add_action('wp_body_open', function() {
            echo '<div data-scroll-container>';
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

        wp_enqueue_script(
            'fidato-admin',
            plugin_dir_url(__FILE__) . 'dist/js/main.js',
            array('jquery'),
            $this->version,
            true
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
    }
}

new MyPlugin();



 

