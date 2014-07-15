
(function ($) {
    "use strict";

    	function featured() {
	        $(".post").each(function() {
	        	var thisel = $(this);
				if(thisel.find(".post-excerpt > p:first-child").has("img").length){

					if(thisel.find(".post-title").has("a").length){
						thisel.prepend("<div class='post-photo'><a href='"+thisel.find(".post-title a").attr("href")+"'></a></div>");
						thisel.find(".post-excerpt > p:first-child").has("img").find("img").prependTo(thisel.find(".post-photo a"));
					}else{
						thisel.prepend("<div class='post-photo'></div>");
						thisel.find(".post-excerpt > p:first-child").has("img").find("img").prependTo(thisel.find(".post-photo"));
					}
					thisel.addClass("hasphoto");

				}else
				if(thisel.find(".post-excerpt").has("iframe[src^='http://www.youtube.com']").length){
					thisel.prepend("<div class='post-video'></div>");
					thisel.find(".post-excerpt").has("iframe").find("iframe:first-child").prependTo(thisel.find(".post-video"));
				}else
				if(thisel.find(".post-excerpt").has("iframe[src^='https://w.soundcloud.com']").length){
					thisel.prepend("<div class='post-audio'></div>");
					thisel.find(".post-excerpt").has("iframe").find("iframe:first-child").prependTo(thisel.find(".post-audio"));
				}else
				if(thisel.find(".post-excerpt").has("iframe[src^='//player.vimeo.com']").length){
					thisel.prepend("<div class='post-video'></div>");
					thisel.find(".post-excerpt").has("iframe").find("iframe:first-child").prependTo(thisel.find(".post-video"));
				}
			if (window.mansoryDone == 1) {
				$('.article-block.js-masonry').masonry('layout');
			}
	        });
		}

    $(document).ready(function(){
		featured();
		var total_images = $("body img").length;
		var images_loaded = 0;

		$("body").find('img').each(function() {
			var fakeSrc = $(this).attr('src');
			$("<img/>").attr("src", fakeSrc).load(function() {
				images_loaded++;
				if (images_loaded >= total_images) {
					
					$('.article-block').masonry({
						itemSelector: '.post',
						transitionDuration: 0,
					});

					window.mansoryDone = 1;

					setTimeout(function(){

						$(".article-block .post").each(function() {
						var thisel = $(this);
						if(parseInt(thisel.css("left")) <= 0){
							thisel.removeClass("post-right").addClass("post-left");
						}else{
							thisel.removeClass("post-left").addClass("post-right");
						}
					});

					}, 500);

				}
			});

		});



    });


	var pattern = jQuery(".pagination span").html().split(" of ");
	$('.article-block.js-masonry').infinitescroll({
	    navSelector: ".pagination",
	    nextSelector: ".pagination a",
	    itemSelector: ".post",
	    debug: false,
	    dataType: 'html',
		maxPage: parseInt(pattern[1]),
	}, function(newElements, data, url){
		// $(window).unbind('.infscr');
		featured();
		if (window.mansoryDone == 1) {
			$('.article-block.js-masonry').masonry('reloadItems').masonry('layout');

			setTimeout(function(){
				$('.article-block.js-masonry').masonry('layout');
				$(".article-block .post").each(function() {
					var thisel = $(this);
					if(parseInt(thisel.css("left")) <= 0){
						thisel.removeClass("post-right").addClass("post-left");
					}else{
						thisel.removeClass("post-left").addClass("post-right");
					}
				});

			}, 500);
		}
	});



}(jQuery));
