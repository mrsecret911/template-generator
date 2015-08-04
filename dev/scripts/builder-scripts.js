(function ($) {
  /*nav*/
  var navWrap = $("#nav_wrap");

  $("#navTab a").tab("show");

  $("#nav_wrap").find(".add_btn").click(function () {
    navWrap.addClass("template_open");
    navWrap.find(".template").removeClass("open");
    navWrap.find($(this).attr("data-open")).addClass("open");
  });
  $("#nav_wrap").find(".template_close").click(function () {
    navWrap.removeClass("template_open");
  });
  /*end of nav*/

})(jQuery);



