(function ($) {
  /*nav*/
  var navWrap = $("#nav_wrap");
  $( "#nav_wrap" ).hide();

  $("#navTab a").tab("show");

  $("#nav_wrap").find(".add_btn").click(function () {
    navWrap.addClass("template_open");
    navWrap.find(".template").removeClass("open");
    navWrap.find($(this).attr("data-open")).addClass("open");
  });
  $("#nav_wrap").find(".template_close").click(function () {
    navWrap.removeClass("template_open");
  });

  var obj = document.querySelectorAll('.nav-icon');
  for(var i = obj.length -1;i>=0;i--){
      var toggle = obj[i];
      toggleSwitch(toggle);
  }
  
  function toggleSwitch(toggle) {
    toggle.addEventListener("click",function() {
      if(this.classList.contains("active") === true) {
        this.classList.remove("active");
        $( "#nav_wrap" ).hide();
      }
      else {
        this.classList.add("active");
        $( "#nav_wrap" ).show();
      }
    });
  }
  /*end of nav*/

})(jQuery);



