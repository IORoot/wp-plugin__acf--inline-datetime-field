<?php


add_action( 'plugins_loaded', function() {
    do_action('register_andyp_plugin', [
        'title'     => 'ACF Inline DateTime Picker',
        'icon'      => 'calendar-multiselect',
        'color'     => '#607D8B',
        'path'      => __FILE__,
    ]);
} );