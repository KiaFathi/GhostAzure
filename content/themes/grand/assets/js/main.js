$(document).ready(function(){
    // Target your .container, .wrapper, .post, etc.
    $(".col-md-4").fitVids();

$(".col-md-8").fitVids();

  });








$(function(){

    var $container = $('.row');
    $container.imagesLoaded( function() {
        $container.masonry();
    });
    
    
});
