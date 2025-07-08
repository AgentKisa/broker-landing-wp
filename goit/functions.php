<?php
if (!defined('ABSPATH')) exit;

if (!defined('_VERSION')) {
    define('_VERSION', '1.0.0');
}



function my_theme_include_files() {
    require get_template_directory() . '/inc/_scripts.php';
    require get_template_directory() . '/inc/_post-types.php';
}
add_action('init', 'my_theme_include_files');

add_filter( 'load_textdomain_mofile', function( $mofile, $domain ){
	if ( $domain === 'acf' && ! did_action( 'init' ) ) {
		return $mofile;
	}
	return $mofile;
}, 10, 2 );

function goit_theme_setup() {
    add_theme_support('custom-logo', array(
        'height'      => 100,
        'width'       => 200,
        'flex-height' => true,
        'flex-width'  => true,
    ));
}
add_action('after_setup_theme', 'goit_theme_setup');

function goit_register_menus() {
    register_nav_menus(array(
        'header-menu' => __('Header Menu', 'goit'),
    ));
}
add_action('init', 'goit_register_menus');

function goit_enqueue_assets() {
    // Styles
    wp_enqueue_style('goit-style', get_stylesheet_uri());
    wp_enqueue_style('goit-header', get_template_directory_uri() . '/assets/css/header.css', array(), _VERSION);
    wp_enqueue_style('slider-css', get_template_directory_uri() . '/assets/css/slider.css');
    wp_enqueue_style('sectio-css', get_template_directory_uri() . '/assets/css/section-liquidity.css');
    wp_enqueue_style('features-css', get_template_directory_uri() . '/assets/css/features.css');
    wp_enqueue_style('aggregation-css', get_template_directory_uri() . '/assets/css/aggregation-section.css');
    wp_enqueue_style('connectivity-css', get_template_directory_uri() . '/assets/css/section-connectivity.css');
    wp_enqueue_style('infrastructure-css', get_template_directory_uri() . '/assets/css/infrastructure-section.css');
    wp_enqueue_style('callback-css', get_template_directory_uri() . '/assets/css/callback-section.css');
    wp_enqueue_style('video-css', get_template_directory_uri() . '/assets/css/video-section.css');
    wp_enqueue_style('footer-css', get_template_directory_uri() . '/assets/css/footer.css');
    wp_enqueue_style('media-queries', get_template_directory_uri() . '/assets/css/section-forms.css');
    wp_enqueue_style('nouislider', 'https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/15.7.1/nouislider.min.css', array(), '15.7.1');
    wp_enqueue_style('swiper-css', 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
    wp_enqueue_style('intl-tel-input-css', 'https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.1/build/css/intlTelInput.css', array(), '25.3.1');
    wp_enqueue_script('jquery'); 
    wp_enqueue_script('swiper-js', 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js', array(), null, true);
    wp_enqueue_script('nouislider', 'https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/15.7.1/nouislider.min.js', array('jquery'), '15.7.1', true);
    wp_enqueue_script('intl-tel-input-js', 'https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.1/build/js/intlTelInput.min.js', array('jquery'), '25.3.1', true);
    wp_enqueue_script('goit-wizard-form', get_template_directory_uri() . '/assets/js/wizard-form.js', array('jquery', 'contact-form-7', 'intl-tel-input-js', 'nouislider'), '1.0', true);

    wp_add_inline_script('swiper-js', "
        document.addEventListener('DOMContentLoaded', function () {
            if (typeof Swiper !== 'undefined') {
                new Swiper('.mySwiper', {
                    loop: true,
                    pagination: { el: '.swiper-pagination', clickable: true },
                    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
                    autoplay: { delay: 5000, disableOnInteraction: false }
                });
                new Swiper('.liquiditySwiper', {
                    loop: true,
                    slidesPerView: 3,
                    spaceBetween: 30,
                    pagination: { el: '.swiper-pagination', clickable: true },
                    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
                    autoplay: { delay: 3000, disableOnInteraction: false },
                    breakpoints: {
                        320: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 }
                    }
                });
            } else {
                console.warn('Swiper is not loaded');
            }
        });
    ");
}
add_action('wp_enqueue_scripts', 'goit_enqueue_assets');

function allow_svg_uploads($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'allow_svg_uploads');

add_filter('wpcf7_autop_or_not', '__return_false');

add_filter( 'wpcf7_form_elements', function( $html ){
    return str_replace( array('class:hidden-product','class:hidden-region'), '', $html );
});


function goit_add_footer_logo_setting( $wp_customize ) {

	$wp_customize->add_section(
		'footer_branding',
		array(
			'title'       => __( 'Footer Branding', 'goit' ),
			'priority'    => 30,
		)
	);

	$wp_customize->add_setting(
		'footer_logo',
		array(
			'sanitize_callback' => 'absint',
		)
	);

	$wp_customize->add_control(
		new WP_Customize_Media_Control(
			$wp_customize,
			'footer_logo',
			array(
				'label'       => __( 'Footer Logo', 'goit' ),
				'section'     => 'footer_branding',
				'mime_type'   => 'image',
			)
		)
	);
}
add_action( 'customize_register', 'goit_add_footer_logo_setting' );