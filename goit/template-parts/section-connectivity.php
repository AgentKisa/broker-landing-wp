<?php
if ( ! defined( 'ABSPATH' ) ) exit;


$p_content     = get_field('connectivity_paragraph');
$title         = get_field('connectivity_title');
$logos         = get_field('connectivity_logos');
$left_content  = get_field('connectivity_left');
$right_content = get_field('connectivity_right');

if ( $title || $logos || $left_content || $right_content ): ?>
<section class="connectivity-section" id="connectivity">
  <div class="container">
    <?php if ( $p_content ): ?>
      <p class="connectivity-paragraph"><?php echo esc_html($p_content); ?></p>
    <?php endif; ?> 
    <?php if ( $title ): ?>
      <h2 class="connectivity-title"><?php echo esc_html($title); ?></h2>
    <?php endif; ?>

    <?php if ( $logos ): ?>
      <div class="connectivity-logos">
        <?php foreach ( $logos as $logo ): ?>
          <div class="connectivity-logo">
            <img src="<?php echo esc_url($logo['url']); ?>"
                 alt="<?php echo esc_attr($logo['alt']); ?>" />
          </div>
        <?php endforeach; ?>
      </div>
    <?php endif; ?>

    <div class="connectivity-content">
      <?php if ( $left_content ): ?>
         <div class="connectivity-col left-col">
      <?php echo wp_kses_post($left_content); ?>
    </div>
     <?php endif; ?>
      <?php if ( $right_content ): ?>
    <div class="connectivity-col right-col">
      <?php echo wp_kses_post($right_content); ?>
    </div>
      <?php endif; ?>
</div>

  </div>
</section>
<?php endif; ?>
