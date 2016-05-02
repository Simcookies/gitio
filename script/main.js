jQuery(document).ready(function() {

    // quick button
    var topBtn = jQuery('#quick-link');
    topBtn.hide();
    jQuery(window).scroll(function () {
	if (jQuery(this).scrollTop() > 100) {
	    topBtn.fadeIn();
	} else {
	    topBtn.fadeOut();
	}
    });
    jQuery('#page-top').click(function () {
	jQuery('body,html').animate({
	    scrollTop: 0
	}, 300);
	return false;
    });

    // menu-icon button
    var menuBtn = jQuery('#menu-icon');
    var toggleMenu = menuBtn.next('nav').children('.trigger');
    menuBtn.click(function() {
	toggleMenu.toggle('fast');
	return false;
    });

    jQuery(document).click(function() {
	toggleMenu.hide('fast');
    });

    toggleMenu.click(function(e) {
	e.stopPropagation();
    });
});
