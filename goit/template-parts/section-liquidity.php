<section class="liquidity-section" id="liquidity-types">
  <div class="liquidity-section-container">
    <div class="section-header">
      <p class="section-label">Essentials</p>
      <h2 class="section-title">Direct Access To Major Tier-1 Liquidity Venues</h2>
      <p class="section-description">
      Empower your business with incomparable levels of technology, the deepest liquidity pool,
      speed of execution and professional support with full transparency and trading anonymity
      at ultra-competitive trading costs.
      </p>
    </div>

    <?php
    $images = get_field('slider_cards');
    if( $images ): ?>
      <div class="swiper liquiditySwiper">
        <div class="swiper-wrapper">
          <?php foreach( $images as $image ): ?>
            <div class="swiper-slide">
              <img src="<?php echo esc_url($image['url']); ?>" alt="<?php echo esc_attr($image['alt']); ?>" />
            </div>
          <?php endforeach; ?>
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
    <?php endif; ?>
  </div>
</section>
