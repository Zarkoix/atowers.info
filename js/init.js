(function($) {
    $(document).ready(function(){
        $('.scrollspy').scrollSpy()
      })

		$('.button-collapse').sideNav();
		$('.parallax').parallax();
		$('.toc-wrapper').pushpin({
      offset: $('nav').height()
		});
})(jQuery); // end of jQuery name space
