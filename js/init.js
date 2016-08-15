(function($) {
	$(function() {
    $(document).ready(function(){
        $('.scrollspy').scrollSpy();
      });

		$('.button-collapse').sideNav();
		$('.parallax').parallax();
		$('.toc-wrapper').pushpin({
      offset: $('nav').height()
		});
	}); // end of document ready
})(jQuery); // end of jQuery name space
