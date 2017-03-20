jQuery(document).ready(function() {

  // quick button
  var topBtn = jQuery('#quick-link');
  topBtn.hide();
  jQuery('.scroll-content').scroll(function () {
    if (jQuery(this).scrollTop() > 100) {
      topBtn.fadeIn();
    } else {
      topBtn.fadeOut();
    }
  });

  jQuery(window).scroll(function () {
    if (jQuery(this).scrollTop() > 100) {
      topBtn.fadeIn();
    } else {
      topBtn.fadeOut();
    }
  });

  jQuery('#page-top').click(function () {
    jQuery('.scroll-content,body,html').animate({
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
    if(menuBtn.css('display') == "block") {
      toggleMenu.hide('fast');
    }
    toggleMenu.click(function(e) {
      e.stopPropagation();
    });
  });

  //TOC-area
  var markBtn = jQuery("#bookmark");
  markBtn.click(function () {
    jQuery("article").toggleClass("home post", "fast", "easeOutSine");
    jQuery("#toc-area").toggle("50");
  });
});
