<?php
$images = get_field('slider_images');
if( $images ): ?>
  <div class="swiper mySwiper">
    <div class="swiper-wrapper">
      <?php foreach( $images as $image ): ?>
        <div class="swiper-slide">
          <img src="<?php echo esc_url($image['url']); ?>" alt="<?php echo esc_attr($image['alt']); ?>" />
        </div>
      <?php endforeach; ?>
    </div>

    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-pagination"></div>
  </div>
<?php endif; ?>
