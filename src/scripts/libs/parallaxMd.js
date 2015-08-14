(function($) {
  $.fn.parallaxMd = function(inputValue) {

    var options = $.extend({
      "imgHeight": "300px",
      "imgWidth": "100%",
      "speed" : "20"
    }, inputValue);

    return this.each(function() {

      var that = $(this);
      that.css({
        "min-height" :  options.imgHeight,
        "position" : "relative",
        "overflow" : "hidden"
      });

      that.wrapInner("<div class='parallaxWrap'></div>");
      that.prepend("<div class='parallaxImageWrap'></div>");

      $(".parallaxWrap").css({
        "position": "relaive",
        "z-index": "1"
      });
      $(".parallaxImageWrap").css({
        "position": "absolute",
        "z-index": "-1",
        "top": "0",
        "width": options.imgWidth,
        "background-image": "url("+that.data('mdparallax')+")",
        "background-size": "cover",
        "background-position": "top",
      });

      function parallaxFunc() {

        var thath = that.height();
        var child = that.children(".parallaxImageWrap");

        child.css({
          "height" : thath*2,
          "top" : -thath
        });

        var topScroll = $(document).scrollTop();
        var offsetTop = that.offset().top - $(window).height();
        var offsetThath = that.offset().top + thath;
        var result = topScroll-offsetTop;

        if(topScroll >= offsetTop && topScroll <= offsetThath) {
          child.css({
            "transform" : "translate3d(0px, " + result /options.speed + "%, .01px)",
            "-webkit-transform" : "translate3d(0px, " + result /options.speed + "%, .01px)",
            "-o-transform": "translate3d(0px, " + result /options.speed + "%, .01px)",
            "-ms-transform": "translate3d(0px, " + result /options.speed + "%, .01px)"
          });
        };
      };

      $(window).scroll(function() {
        parallaxFunc();
      }).load(function() {
        parallaxFunc();
      });
      $("*").resize(function() {
        parallaxFunc();
      });

    });
  };
})(jQuery);