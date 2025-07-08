<?php
/**
 * The footer for our theme
 * @package goit
 */
?>
</div>

    <?php if ( ! defined( 'ABSPATH' ) ) exit; ?>
<footer class="site-footer">
  <div class="footer-contact">
    <div class="container">
     <div class="footer-contact__inner">
      <p class="footer-contact__text">If you have any questions please contact us</p>
      <div class="footer-contact__btns">
        <a href="/forms" class="footer-contact__btn">Get in touch</a>
        <a href="mailto:request@b2binplay.net" class="footer-contact__email">request@b2binplay.net</a>
      </div>
    </div>
      <ul class="footer-social-list">
   <li class="footer-social-item">
    <a href="#" class="footer-social-link" target="_blank" rel="noopener">
      <svg class="footer-social-icon" width="30" height="30">
        <use xlink:href="#icon-youtube"></use>
      </svg>
    </a>
   </li>
   <li class="footer-social-item">
    <a href="#" class="footer-social-link" target="_blank" rel="noopener">
      <svg class="footer-social-icon" width="30" height="30">
        <use xlink:href="#icon-wechat"></use>
      </svg>
    </a>
   </li>
   <li class="footer-social-item">
    <a href="#" class="footer-social-link" target="_blank" rel="noopener">
      <svg class="footer-social-icon" width="30" height="30">
        <use xlink:href="#icon-galca"></use>
      </svg>
    </a>
   </li>
   <li class="footer-social-item">
    <a href="#" class="footer-social-link" target="_blank" rel="noopener">
      <svg class="footer-social-icon" width="30" height="30">
        <use xlink:href="#icon-link"></use>
      </svg>
    </a>
   </li>
   <li class="footer-social-item">
    <a href="#" class="footer-social-link" target="_blank" rel="noopener">
      <svg class="footer-social-icon" width="30" height="30">
        <use xlink:href="#icon-telegram"></use>
      </svg>
    </a>
   </li>
   <li class="footer-social-item">
    <a href="#" class="footer-social-link" target="_blank" rel="noopener">
      <svg class="footer-social-icon" width="30" height="30">
        <use xlink:href="#icon-Twitter"></use>
      </svg>
    </a>
   </li>
   <li class="footer-social-item">
    <a href="#" class="footer-social-link" target="_blank" rel="noopener">
      <svg class="footer-social-icon" width="30" height="30">
        <use xlink:href="#icon-Facebook"></use>
      </svg>
    </a>
   </li>
  <li class="footer-social-item">
    <a href="#" class="footer-social-link" target="_blank" rel="noopener">
      <svg class="footer-social-icon" width="30" height="30">
        <use xlink:href="#icon-insta"></use>
      </svg>
    </a>
  </li>
  <li class="footer-social-item">
    <a href="#" class="footer-social-link" target="_blank" rel="noopener">
      <svg class="footer-social-icon" width="30" height="30">
        <use xlink:href="#icon-tik-tok"></use>
      </svg>
    </a>
  </li>
  <li class="footer-social-item">
    <a href="#" class="footer-social-link" target="_blank" rel="noopener">
      <svg class="footer-social-icon" width="30" height="30">
        <use xlink:href="#icon-glaz"></use>
      </svg>
    </a>
  </li>
  </ul>

    </div>
  </div>

  <div class="footer-main">
    <div class="container footer-main__inner">
    <div class="footer-main__branding">
	<?php
	$footer_logo_id = get_theme_mod( 'footer_logo' );

	if ( $footer_logo_id ) {

		echo wp_get_attachment_image(
			$footer_logo_id,
			'medium',          
			false,
			array(
				'class' => 'footer-logo',
				'alt'   => esc_attr( get_bloginfo( 'name' ) ),
			)
		);

	} else {
		echo '<a href="' . esc_url( home_url( '/' ) ) . '" class="footer-logo-link">' . esc_html( get_bloginfo( 'name' ) ) . '</a>';
	}
	?>
  </div>

      <nav class="footer-nav">
        <a href="#features">Features</a>
        <a href="#benefits">Benefits</a>
      </nav>

      
    </div>

    <div class="container footer-main__bottom">
      <div class="footer-main__policies">
        <a href="/cookie-policy">Cookie Policy</a>
        <a href="/privacy-policy">Privacy Policy</a>
      </div>
      <p class="footer-main__copyright">
        &copy; <?php echo date( 'Y' ); ?> <?php bloginfo( 'name' ); ?>. All rights reserved. Leading Prime of Prime Multi‑Asset Liquidity & Advanced White Label Solutions Provider.
      </p>
    </div>
  </div>
</footer>



<?php wp_footer(); ?>

<?php
echo file_get_contents(get_template_directory() . '/assets/sprite.svg');
?>



</body>
</html>
