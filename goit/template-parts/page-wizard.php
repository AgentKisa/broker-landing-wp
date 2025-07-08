<?php
/*
  Template Name: Wizard Form
  
*/

get_header();
?>

<div class="page-content">
  <div class="form-container">
    <div class="wizard-progress">
      <div class="wizard-step active"><span class="step-number">1</span> General information</div>
      <div class="wizard-step"><span class="step-number">2</span> Contact details</div>
    </div>

    <?php echo do_shortcode('[contact-form-7 id="e871db7" title="Wizard Form"]'); ?>
  </div>

  <div class="success-message" style="display: none;">
    <div class="success-content">
      <span class="success-icon">
        <svg viewBox="0 0 24 24">
          <path d="M9.2 16.2 4.8 11.8 3.4 13.2 9.2 19 21 7.2 19.6 5.8z"/>
        </svg>
      </span>

      <h2>Success</h2>
      <p>Thank you for your request! We will contact you shortly.</p>

      <button type="button" class="close-success-btn">Great!</button>
    </div>
  </div>
</div>

<?php get_footer(); ?>