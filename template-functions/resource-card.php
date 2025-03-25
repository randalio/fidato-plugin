
<?php 
function output_resource_card( $id = '', $posttype = 'post', $button = 'Read More', $display = 'grid'){

    if($id == ''){
        return;
    }

    $this_post = get_post( $id );

    // print_r( $this_post );

    if( $posttype == 'podcasts'){
        $date = get_field('episode_number', $id);
    }elseif( $posttype == 'videos'){
        $date = '';
        $youtube_url = get_field('youtube_url', $id);

        $video_id = explode("?v=", $youtube_url);
        $video_id = $video_id[1];

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

    $inner_content = '';
    if( $posttype != 'videos'){
        $inner_content .= '    <span class="post-date">'.$date.'</span>';
        $inner_content .= '    <h3>'.$title.'</h3>';
        $inner_content .= '    <p class="post-excerpt">'.$excerpt.'</p>';
        $inner_content .= '    <a href="'.$url.'" class="button">';
        $inner_content .= '        <span class="elementor-button-text">'.$button.'</span>';
        $inner_content .= '        <i aria-hidden="true" class="icon icon-right-arrow"></i>';
        $inner_content .= '    </a>';
    }else{

        $inner_content .= '<img src="https://img.youtube.com/vi/'.$video_id.'/hqdefault.jpg ">';
        //$inner_content .=  $youtube_url;
    }

    
    // Output
    $output =  '<div class="fidato--resource-card '.$posttype.' '.$display.'">';
    $output .= $inner_content;
    $output .= '</div>';

    return $output;

}