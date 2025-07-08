jQuery(document).ready(function ($) {
  setTimeout(function () {
    $(document).off('click', '.product-option');
    $(document).off('click', '.region-option');
    $(document).off('click', '.company-option');
    $(document).off('click', '.experience-option');

    $(
      '.product-option, .region-option, .company-option, .experience-option'
    ).off('click');

    initializeClickHandlers();
  }, 100);

  function findCheckboxInCard($card) {
    let $checkbox = $card.find('input[type="checkbox"]').first();

    if (!$checkbox.length) {
      $checkbox = $card
        .find('.wpcf7-form-control-wrap input[type="checkbox"]')
        .first();
    }

    if (!$checkbox.length) {
      $checkbox = $card.find('.wpcf7-list-item input[type="checkbox"]').first();
    }

    return $checkbox;
  }

  function reinitializeFormStates() {
    $(
      '.company-option, .experience-option, .product-option, .region-option'
    ).removeClass('selected');

    $('.company-option').each(function () {
      const $option = $(this);
      const $checkbox = findCheckboxInCard($option);
      if ($checkbox.length && $checkbox.prop('checked')) {
        $option.addClass('selected');
      }
    });

    $('.experience-option').each(function () {
      const $option = $(this);
      const $radio = $option.find('input[type="radio"]').first();
      if ($radio.length && $radio.prop('checked')) {
        $option.addClass('selected');
      }
    });

    $('.product-option').each(function () {
      const $option = $(this);
      const $checkbox = findCheckboxInCard($option);
      if ($checkbox.length && $checkbox.prop('checked')) {
        $option.addClass('selected');
      }
    });

    $('.region-option').each(function () {
      const $option = $(this);
      const $checkbox = findCheckboxInCard($option);
      if ($checkbox.length && $checkbox.prop('checked')) {
        $option.addClass('selected');
      }
    });

    const $otherCheckbox = $('.other-option')
      .find('input[type="checkbox"]')
      .first();
    $('#company-other-text').toggle($otherCheckbox.prop('checked'));
  }

  function initializeClickHandlers() {
    $(document).on('click.wizard', '.company-option', function (e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      const $this = $(this);
      const $input = findCheckboxInCard($this);

      if ($input && $input.length) {
        $('.company-option').each(function () {
          const $cb = findCheckboxInCard($(this));
          if ($cb.length) {
            $cb.prop('checked', false);
          }
          $(this).removeClass('selected');
        });

        $this.addClass('selected');
        $input.prop('checked', true).trigger('change');

        if ($this.hasClass('other-option')) {
          $('#company-other-text').show().focus();
        } else {
          $('#company-other-text').val('').hide();
        }
      }
    });

    $(document).on('click.wizard', '.experience-option', function (e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      const $this = $(this);
      const $radio = $this.find('input[type="radio"]').first();

      if ($radio && $radio.length) {
        $('.experience-option').removeClass('selected');
        $this.addClass('selected');
        $radio.prop('checked', true).trigger('change');
      }
    });

    $(document).on('click.wizard', '.product-option', function (e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      const $card = $(this);
      const $checkbox = findCheckboxInCard($card);

      if ($checkbox && $checkbox.length) {
        const currentState = $checkbox.prop('checked');
        const newState = !currentState;

        $checkbox.prop('checked', newState);

        if (newState) {
          $card.addClass('selected');
        } else {
          $card.removeClass('selected');
        }

        $checkbox.trigger('change');
      } else {
        console.error('Product checkbox not found in:', $card[0]);
      }
    });

    $(document).on('click.wizard', '.region-option', function (e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      const $card = $(this);
      const $checkbox = findCheckboxInCard($card);

      if ($checkbox && $checkbox.length) {
        const currentState = $checkbox.prop('checked');
        const newState = !currentState;

        $checkbox.prop('checked', newState);

        if (newState) {
          $card.addClass('selected');
        } else {
          $card.removeClass('selected');
        }

        $checkbox.trigger('change');
      } else {
        console.error('Region checkbox not found in:', $card[0]);
      }
    });

    $(document).on(
      'click.wizard',
      '.product-option input[type="checkbox"], .region-option input[type="checkbox"]',
      function (e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    );
  }

  $(document).on('click', '.btn-continue', function (e) {
    e.preventDefault();
    const $step1 = $('.step-1');
    let valid = true;
    $step1.find('.wizard-error').remove();

    let hasCompany = false;
    $('.company-option').each(function () {
      const $cb = findCheckboxInCard($(this));
      if ($cb.length && $cb.prop('checked')) {
        hasCompany = true;
      }
    });

    if (!hasCompany) {
      valid = false;
      $('.company-classification').after(
        '<div class="wizard-error">Please select your company type.</div>'
      );
    }

    const $otherOption = $('.other-option');
    const $otherCheckbox = findCheckboxInCard($otherOption);
    if (
      $otherCheckbox.length &&
      $otherCheckbox.prop('checked') &&
      !$('#company-other-text').val().trim()
    ) {
      valid = false;
      $('#company-other-text').after(
        '<div class="wizard-error">Please specify your option.</div>'
      );
    }

    if ($('input[name="experience"]:checked').length === 0) {
      valid = false;
      $('.experience-options').after(
        '<div class="wizard-error">Please select your experience level.</div>'
      );
    }

    let hasProducts = false;
    $('.product-option').each(function () {
      const $cb = findCheckboxInCard($(this));
      if ($cb.length && $cb.prop('checked')) {
        hasProducts = true;
      }
    });

    if (!hasProducts) {
      valid = false;
      $('.product-options').after(
        '<div class="wizard-error">Please choose at least one product.</div>'
      );
    }

    let hasRegions = false;
    $('.region-option').each(function () {
      const $cb = findCheckboxInCard($(this));
      if ($cb.length && $cb.prop('checked')) {
        hasRegions = true;
      }
    });

    if (!hasRegions) {
      valid = false;
      $('.region-options').after(
        '<div class="wizard-error">Please choose at least one region.</div>'
      );
    }

    if ($('#budget-amount').val() === '0') {
      valid = false;
      $('.budget-wrapper').after(
        '<div class="wizard-error">Please choose your budget.</div>'
      );
    }

    if (!valid) {
      $('html,body').animate(
        { scrollTop: $('.wizard-error:first').offset().top - 120 },
        400
      );
      return;
    }

    $step1.hide();
    $('.step-2').fadeIn(200, function () {
      initPhoneInput();
    });
    updateProgressBar(1);
  });

  function initBudgetSlider() {
    const $budgetSliderEl = $('#budget-slider');
    if ($budgetSliderEl.length && typeof noUiSlider !== 'undefined') {
      if ($budgetSliderEl[0].noUiSlider) {
        $budgetSliderEl[0].noUiSlider.destroy();
      }

      noUiSlider.create($budgetSliderEl[0], {
        start: [0],
        connect: [true, false],
        step: 1,
        range: { min: 0, max: 5 },
      });

      const $budgetHiddenInput = $('#budget-amount');
      const $pipsContainer = $('.slider-pips-values');
      const positionToValue = [0, 1000, 5000, 10000, 20000, 25000];

      function updateSliderVisuals(sliderPosition) {
        var position = Math.round(sliderPosition[0]);
        var realValue = positionToValue[position];
        $budgetHiddenInput.val(realValue);

        $pipsContainer.find('span[data-value]').each(function () {
          var $pip = $(this);
          var pipDataValue = $pip.data('value');
          $pip.removeClass('active-pip filled-pip');
          if (pipDataValue !== 'more' && realValue >= parseInt(pipDataValue)) {
            $pip.addClass('filled-pip');
          }
          if (
            (pipDataValue === 'more' && realValue === 25000) ||
            String(realValue) === String(pipDataValue)
          ) {
            $pip.addClass('active-pip');
          }
        });
        $('.budget-wrapper .wizard-error').remove();
      }

      $pipsContainer.find('span[data-value]').each(function () {
        if ($(this).find('.pip-dot').length === 0) {
          $(this).prepend('<span class="pip-dot"></span>');
        }
      });

      $(document).off('click', '.slider-pips-values span[data-value]');
      $(document).on(
        'click',
        '.slider-pips-values span[data-value]',
        function () {
          var clickedValue = $(this).data('value');
          var targetValue =
            clickedValue === 'more' ? 25000 : parseInt(clickedValue);
          var sliderPosition = positionToValue.indexOf(targetValue);
          if (sliderPosition !== -1) {
            $budgetSliderEl[0].noUiSlider.set(sliderPosition);
          }
        }
      );

      $budgetSliderEl[0].noUiSlider.on('update', function (values) {
        updateSliderVisuals(values);
      });

      updateSliderVisuals([0]);
    }
  }

  function initPhoneInput() {
    const $phone = $('#phone');
    if (!$phone.length) return;

    if ($phone.data('iti-instance')) {
      return;
    }

    if (typeof window.intlTelInput === 'undefined') {
      console.error('intlTelInput JS library is not loaded!');
      return;
    }

    const iti = window.intlTelInput($phone[0], {
      initialCountry: 'us',
      preferredCountries: ['us', 'gb', 'ca', 'au'],
      separateDialCode: true,
      nationalMode: false,
      utilsScript:
        'https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.1/build/js/utils.js',
      autoPlaceholder: 'polite',
    });

    $phone.data('iti-instance', iti);

    setTimeout(() => {
      fetch('https://ipapi.co/json/')
        .then((response) => response.json())
        .then((data) => {
          if (data && data.country_code) {
            iti.setCountry(data.country_code.toLowerCase());
          }
        })
        .catch((error) => {
          console.log('Could not detect country:', error);
        });
    }, 100);

    $phone.on('countrychange', function () {
      const countryData = iti.getSelectedCountryData();
      $('#country-phone_code').val(countryData.iso2);
    });
  }

  function validateStep2Fields() {
    let isValid = true;
    const $name = $('#contact-name');
    const nameValue = $name.val().trim();
    const $nameField = $name.closest('.form-field');

    $nameField.find('.field-error').remove();
    $nameField.removeClass('has-error valid');

    if (!nameValue) {
      $nameField.addClass('has-error');
      $nameField.append(
        '<span class="field-error">Contact name is required</span>'
      );
      isValid = false;
    } else if (nameValue.length < 2) {
      $nameField.addClass('has-error');
      $nameField.append(
        '<span class="field-error">Name must be at least 2 characters</span>'
      );
      isValid = false;
    } else if (!/^[a-zA-Zа-яА-ЯёЁ\s\-'\.]+$/.test(nameValue)) {
      $nameField.addClass('has-error');
      $nameField.append(
        '<span class="field-error">Name can only contain letters, spaces, hyphens and apostrophes</span>'
      );
      isValid = false;
    } else {
      markFieldAsValid($nameField);
    }

    const $phone = $('#phone');
    const phoneValue = $phone.val().trim();
    const $phoneField = $phone.closest('.form-field');

    $phoneField.find('.field-error').remove();
    $phoneField.removeClass('has-error valid');

    if (!phoneValue) {
      $phoneField.addClass('has-error');
      $phoneField.append(
        '<span class="field-error">Phone number is required</span>'
      );
      isValid = false;
    } else if (phoneValue.length < 6) {
      $phoneField.addClass('has-error');
      $phoneField.append(
        '<span class="field-error">Phone number is too short</span>'
      );
      isValid = false;
    } else {
      markFieldAsValid($phoneField);
    }

    const $email = $('#email');
    const emailValue = $email.val().trim();
    const $emailField = $email.closest('.form-field');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    $emailField.find('.field-error').remove();
    $emailField.removeClass('has-error valid');

    if (!emailValue) {
      $emailField.addClass('has-error');
      $emailField.append('<span class="field-error">Email is required</span>');
      isValid = false;
    } else if (!emailRegex.test(emailValue)) {
      $emailField.addClass('has-error');
      $emailField.append(
        '<span class="field-error">Please enter a valid email address</span>'
      );
      isValid = false;
    } else {
      markFieldAsValid($emailField);
    }

    const $website = $('#website');
    const websiteValue = $website.val().trim();
    const $websiteField = $website.closest('.form-field');

    $websiteField.find('.field-error').remove();
    $websiteField.removeClass('has-error valid');

    if (websiteValue) {
      let urlToValidate = websiteValue;
      if (!/^https?:\/\//i.test(urlToValidate)) {
        urlToValidate = 'http://' + urlToValidate;
      }

      try {
        new URL(urlToValidate);
        if (
          !/^https?:\/\/([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i.test(
            urlToValidate
          )
        ) {
          throw new Error('Invalid format');
        }
        markFieldAsValid($websiteField);
      } catch (e) {
        $websiteField.addClass('has-error');
        $websiteField.append(
          '<span class="field-error">Please enter a valid website URL</span>'
        );
        isValid = false;
      }
    }

    return isValid;
  }

  $(document).on('blur', '#contact-name', function () {
    const $this = $(this);
    const value = $this.val().trim();
    const $field = $this.closest('.form-field');

    $field.find('.field-error').remove();
    $field.removeClass('has-error');

    if (!value) {
      $field.addClass('has-error');
      $field.append(
        '<span class="field-error">Contact name is required</span>'
      );
    } else if (value.length < 2) {
      $field.addClass('has-error');
      $field.append(
        '<span class="field-error">Name must be at least 2 characters</span>'
      );
    } else if (!/^[a-zA-Zа-яА-ЯёЁ\s\-'\.]+$/.test(value)) {
      $field.addClass('has-error');
      $field.append(
        '<span class="field-error">Name can only contain letters, spaces, hyphens and apostrophes</span>'
      );
    }
  });

  $(document).on('blur', '#phone', function () {
    const $this = $(this);
    const value = $this.val().trim();
    const $field = $this.closest('.form-field');

    $field.find('.field-error').remove();
    $field.removeClass('has-error');

    if (!value) {
      $field.addClass('has-error');
      $field.append(
        '<span class="field-error">Phone number is required</span>'
      );
    } else if (value.length < 6) {
      $field.addClass('has-error');
      $field.append(
        '<span class="field-error">Phone number is too short</span>'
      );
    }
  });

  $(document).on('blur', '#email', function () {
    const $this = $(this);
    const value = $this.val().trim();
    const $field = $this.closest('.form-field');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    $field.find('.field-error').remove();
    $field.removeClass('has-error');

    if (!value) {
      $field.addClass('has-error');
      $field.append('<span class="field-error">Email is required</span>');
    } else if (!emailRegex.test(value)) {
      $field.addClass('has-error');
      $field.append(
        '<span class="field-error">Please enter a valid email address</span>'
      );
    }
  });

  $(document).on('blur', '#website', function () {
    const $this = $(this);
    const value = $this.val().trim();
    const $field = $this.closest('.form-field');

    $field.find('.field-error').remove();
    $field.removeClass('has-error');

    if (value) {
      let urlToValidate = value;
      if (!/^https?:\/\//i.test(urlToValidate)) {
        urlToValidate = 'http://' + urlToValidate;
      }

      try {
        new URL(urlToValidate);
        if (
          !/^https?:\/\/([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i.test(
            urlToValidate
          )
        ) {
          throw new Error('Invalid format');
        }
      } catch (e) {
        $field.addClass('has-error');
        $field.append(
          '<span class="field-error">Please enter a valid website URL</span>'
        );
      }
    }
  });

  $(document).on(
    'input',
    '#contact-name, #phone, #email, #website',
    function () {
      const $field = $(this).closest('.form-field');
      if ($field.hasClass('has-error')) {
        $field.removeClass('has-error');
        $field.find('.field-error').remove();
      }
    }
  );

  function markFieldAsValid($field) {
    $field.removeClass('has-error').addClass('valid');
  }

  $(document).on('blur', '#contact-name', function () {
    const $this = $(this);
    const value = $this.val().trim();
    const $field = $this.closest('.form-field');

    $field.find('.field-error').remove();
    $field.removeClass('has-error valid');

    if (!value) {
      $field.addClass('has-error');
      $field.append(
        '<span class="field-error">Contact name is required</span>'
      );
    } else if (value.length < 2) {
      $field.addClass('has-error');
      $field.append(
        '<span class="field-error">Name must be at least 2 characters</span>'
      );
    } else if (!/^[a-zA-Zа-яА-ЯёЁ\s\-'\.]+$/.test(value)) {
      $field.addClass('has-error');
      $field.append(
        '<span class="field-error">Name can only contain letters, spaces, hyphens and apostrophes</span>'
      );
    } else {
      markFieldAsValid($field);
    }
  });

  $(document).on('blur', '#phone', function () {
    const $this = $(this);
    const value = $this.val().trim();
    const $field = $this.closest('.form-field');

    $field.find('.field-error').remove();
    $field.removeClass('has-error valid');

    if (!value) {
      $field.addClass('has-error');
      $field.append(
        '<span class="field-error">Phone number is required</span>'
      );
    } else if (value.length < 6) {
      $field.addClass('has-error');
      $field.append(
        '<span class="field-error">Phone number is too short</span>'
      );
    } else {
      markFieldAsValid($field);
    }
  });

  $(document).on('blur', '#email', function () {
    const $this = $(this);
    const value = $this.val().trim();
    const $field = $this.closest('.form-field');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    $field.find('.field-error').remove();
    $field.removeClass('has-error valid');

    if (!value) {
      $field.addClass('has-error');
      $field.append('<span class="field-error">Email is required</span>');
    } else if (!emailRegex.test(value)) {
      $field.addClass('has-error');
      $field.append(
        '<span class="field-error">Please enter a valid email address</span>'
      );
    } else {
      markFieldAsValid($field);
    }
  });

  $(document).on('blur', '#website', function () {
    const $this = $(this);
    const value = $this.val().trim();
    const $field = $this.closest('.form-field');

    $field.find('.field-error').remove();
    $field.removeClass('has-error valid');

    if (value) {
      let urlToValidate = value;
      if (!/^https?:\/\//i.test(urlToValidate)) {
        urlToValidate = 'http://' + urlToValidate;
      }

      try {
        new URL(urlToValidate);
        if (
          !/^https?:\/\/([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i.test(
            urlToValidate
          )
        ) {
          throw new Error('Invalid format');
        }
        markFieldAsValid($field);
      } catch (e) {
        $field.addClass('has-error');
        $field.append(
          '<span class="field-error">Please enter a valid website URL</span>'
        );
      }
    } else {
      $field.removeClass('has-error valid');
    }
  });

  $(document).on(
    'input',
    '#contact-name, #phone, #email, #website',
    function () {
      const $field = $(this).closest('.form-field');
      if ($field.hasClass('has-error') || $field.hasClass('valid')) {
        $field.removeClass('has-error valid');
        $field.find('.field-error').remove();
      }
    }
  );

  $(document).on('input blur', '#your-comment', function () {
    const $this = $(this);
    const value = $this.val().trim();

    if (value.length > 0) {
      $this.addClass('valid');
    } else {
      $this.removeClass('valid');
    }
  });

  const BTN_SELECTOR = '.cf7-submit';
  let originalButtonText = 'Start Now';
  let loadingTimeout = null;

  function restoreSubmitButton() {
    const $btn = $(BTN_SELECTOR);
    if ($btn.length) {
      if ($btn.is('input')) {
        $btn.val(originalButtonText);
      } else {
        $btn.text(originalButtonText);
      }
      $btn.prop('disabled', false).removeClass('btn-loading');
    }

    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
      loadingTimeout = null;
    }
  }

  $(document).on('submit', '.wpcf7-form', function (e) {
    if ($('.step-2').is(':visible')) {
      $('.step-2 .wpcf7-not-valid-tip').remove();
      $('.step-2 .wpcf7-response-output').hide();

      if (!validateStep2Fields()) {
        e.preventDefault();

        const $firstError = $('.form-field.has-error:first');
        if ($firstError.length) {
          $('html, body').animate(
            {
              scrollTop: $firstError.offset().top - 100,
            },
            400
          );
        }

        return false;
      }
    }

    const $btn = $(BTN_SELECTOR);

    if ($btn.length) {
      if ($btn.is('input')) {
        originalButtonText = $btn.val() || 'Start Now';
        $btn.val('Loading…');
      } else {
        originalButtonText = $btn.text() || 'Start Now';
        $btn.text('Loading…');
      }

      $btn.prop('disabled', true).addClass('btn-loading');

      loadingTimeout = setTimeout(function () {
        console.warn('Form submission timeout - restoring button');
        restoreSubmitButton();
      }, 10000);
    }
  });

  $(document).on('click', '.btn-prev', function () {
    $('.step-2').hide();
    $('.step-1').fadeIn(200);
    updateProgressBar(0);
  });

  function updateProgressBar(i) {
    $('.wizard-step').removeClass('active').eq(i).addClass('active');
  }

  function showSuccessMessage() {
    restoreSubmitButton();
    $('.step-1, .step-2').hide();
    $('.wizard-progress').hide();
    $('.wpcf7-response-output').hide();
    $('.success-message').show();
    $('html, body').animate({ scrollTop: 0 }, 300);
  }

  $(document).on('wpcf7:mailsent', function (event) {
    showSuccessMessage();
  });

  $(document).on('wpcf7:invalid wpcf7:spam wpcf7:mailfailed', function (event) {
    restoreSubmitButton();
  });

  $(document).on('click', '.close-success-btn', function () {
    $('.success-message').hide();

    const cf7Form = document.querySelector('.wpcf7-form');
    if (cf7Form) {
      cf7Form.reset();
    }

    $('.wpcf7-form').removeClass('sent invalid');
    $('.wpcf7-response-output').hide();
    $('.step-2').hide();
    $('.step-1').show();
    updateProgressBar(0);
    $('.wizard-progress').show();
    reinitializeFormStates();
    initBudgetSlider();
    $('#company-other-text').hide();
    restoreSubmitButton();
  });

  const observer = new MutationObserver(function (mutations) {
    let needsReinit = false;

    mutations.forEach(function (mutation) {
      if (
        mutation.type === 'childList' &&
        ($(mutation.target).find('input[type="checkbox"]').length > 0 ||
          $(mutation.target).find('input[type="radio"]').length > 0)
      ) {
        needsReinit = true;
      }
    });

    if (needsReinit) {
      setTimeout(() => {
        reinitializeFormStates();
      }, 100);
    }
  });

  const cf7Form = document.querySelector('.wpcf7-form');
  if (cf7Form) {
    observer.observe(cf7Form, {
      childList: true,
      subtree: true,
    });
  }

  setTimeout(() => {
    reinitializeFormStates();
    initBudgetSlider();
  }, 100);

  if ($('.step-2:visible').length) {
    initPhoneInput();
    updateProgressBar(1);
  } else {
    updateProgressBar(0);
  }

  $('.success-message').hide();
});
