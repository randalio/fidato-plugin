// Function to fetch posts from REST API
function fetchPostsFromRestApi(postType, $controlElement) {
    // Show loading indicator
    $controlElement.prop('disabled', true);
    
    // Fetch posts from custom REST API endpoint
    $.ajax({
        url: fidatoWealthData.restUrl.replace('wp/v2/', 'fidato-wealth/v1/post-options/') + postType,
        method: 'GET',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('X-WP-Nonce', fidatoWealthData.nonce);
        }
    }).done(function(response) {
        // Create options object
        var options = {};
        
        // Process posts
        $.each(response, function(index, item) {
            options[item.id] = item.title;
        });
        
        // Update the select2 control
        updateSelect2Options($controlElement, options);
    }).fail(function(response) {
        console.error('Error fetching posts:', response);
    }).always(function() {
        // Enable the control again
        $controlElement.prop('disabled', false);
    });
}