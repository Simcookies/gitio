jQuery(document).ready(function() {
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
});
