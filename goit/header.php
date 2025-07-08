<?php
/**
 * The header for our theme
 * @package goit
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> dir="ltr">
<head>
    <meta charset="<?php bloginfo('charset'); ?>"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="format-detection" content="telephone=no">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">

    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <header class="header">
        <div class="container-heder">
            <div class="header__inner">
                <div class="header__logo">
                    <?php
                    if (function_exists('the_custom_logo') && has_custom_logo()) {
                        the_custom_logo();
                    } else {
                        echo '<a href="' . esc_url(home_url('/')) . '" class="logo-text">' . get_bloginfo('name') . '</a>';
                    }
                    ?>
                </div>

                 <div class="header__nav-wrap">
                <nav class="header__nav">
                    <ul class="nav__list">
                        <li class="nav__item">
                            <a href="#liquidity-types" class="nav__link">Compare liquidity types</a>
                        </li>
                        <li class="nav__item">
                            <a href="#features" class="nav__link">Features</a>
                        </li>
                    </ul>
                </nav>

                <div class="header__cta">
                  <a href="/forms" class="btn btn--primary">Get in toch</a>
                </div>
                </div>
            </div>
        </div>
    </header>