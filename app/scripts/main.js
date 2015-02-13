;
(function($) {
    $(document).ready(function() {
    	function calcContentBox() {
    		var colMainHeight = $(".col-main").height();
    		var toolBarTopHeight = $(".toolbar-top").height();
    		var marginHeight = $(".content-box").outerHeight(true) - $(".content-box").height();
    		$(".content-box").height(colMainHeight-toolBarTopHeight-marginHeight-2);
    	};

    	calcContentBox();
    	$(window).on("resize", calcContentBox);
    });
})(jQuery);
