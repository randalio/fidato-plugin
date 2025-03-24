
<?php 
function output_resource_card( $id = '', $posttype = 'post', $button = 'Read More'){

    if($id == ''){
        return;
    }

    $this_post = get_post( $id );

    // print_r( $this_post );

    if( $posttype == 'podcasts'){
        $date = get_field('episode_number', $id);
    }elseif( $posttype == 'video'){
        $date = '';
    }else{
        // Format Date
        $date_create = date_create($this_post->post_date);
        $date = date_format($date_create,"F d, Y");
    }
   

    // Post Title and URL
    $title = $this_post->post_title;
    $url = get_the_permalink($id);

    //Excerpt
    $text = strip_shortcodes( $this_post->post_content );
    $text = apply_filters( 'the_content', $text );
    $text = str_replace(']]>', ']]&gt;', $text);
    $excerpt_length = apply_filters( 'excerpt_length', 15 );
    $excerpt_more = apply_filters( 'excerpt_more', '&hellip;' );
    $text = wp_trim_words( $text, $excerpt_length, $excerpt_more );
    $excerpt = $text;

    
    // Output
    $output =  '<div class="fidato--resource-card">';
    $output .= '    <span class="post-date">'.$date.'</span>';
    $output .= '    <h3>'.$title.'</h3>';
    $output .= '    <p class="post-excerpt">'.$excerpt.'</p>';
    $output .= '    <a href="'.$url.'" class="button">';
    $output .= '        <span class="elementor-button-text">'.$button.'</span>';
    $output .= '        <i aria-hidden="true" class="icon icon-right-arrow"></i>';
    $output .= '    </a>';
    $output .= '</div>';

    return $output;

}