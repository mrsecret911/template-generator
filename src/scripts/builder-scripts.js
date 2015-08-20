(function ($) {
  /*nav*/
  $("#navTab a").tab("show");

  var navWrap = $("#nav_wrap");
  var tabplateBtn = navWrap.find(".add_btn");
  var subNav = $(".sub_nav");
  var openNavBtn = $(".open_nav_btn");

  $(".main_nav, .nav-icon").click(function () {
    navWrap.removeClass("template_open");
    tabplateBtn.removeClass("close_icon");
  });
  tabplateBtn.click(function () {
    var btn = $(this);
    if (btn.hasClass("close_icon")) {
      navWrap.removeClass("template_open");
      btn.removeClass("close_icon");
    }
    else {
      tabplateBtn.removeClass("close_icon");
      navWrap.addClass("template_open");
      btn.addClass("close_icon");
    }

    $('.template_wrap').scrollTop(0);

    navWrap.find(".template").removeClass("open");
    navWrap.find($(this).attr("data-open")).addClass("open");
  });

  $(".open_nav_btn").click(function () {
    navWrap.removeClass("template_open");
    $(this).toggleClass("active");
    $("#nav_wrap").toggleClass("show_nav");
  });
  /*end of nav*/

  /*delete page*/
  $("#delete_page").on("click", function () {
    $("#modal-save").removeClass("active");
    $("#modal-save").addClass("fade");
  });

  $("#remove").on("click", function () {
    $("#build_wrap").empty();
    localStorage.clear();
    model.containerTemplateBlockList = [];
    model.containerTemplateHeader = "";
    model.containerTemplateFooter = "";
    model.newFontName = "";
    model.newLineHeight = "";
    model.newFontLinkTag = "";
    model.styleTemplate = {};
    tmplsHeaderInMenuView.render();
    tmplsBlocksInMenuView.render();
    tmplsFooterInMenuView.render();
  });
  /*end of delete*/

  /*Save the page*/
  $("#download_page").on("click", function () {
    var $editButVideo = $(".video-over").detach();
    var $editButMap = $(".map-over").detach();
    var zip = new JSZip();
    var bootstrapCssSrc = '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">';
    var fontawesome = '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">';
    var jquerySrc = '<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>';
    var paralax = '<script src="https://rawgit.com/TarickMd/parallaxMd/master/parallaxMd.js"></script>';
    var filePar = '<script src="https://rawgit.com/TarickMd/filePar/master/fileParallax.js"></script>';
    var bootstrapJsSrc = '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>';
    var title = $("#page_title").val();
    var header = '<!DOCTYPE html><html><head><title>' + title +
            '</title><meta charset="utf-8">' + bootstrapCssSrc + fontawesome +
            '<link rel="stylesheet" href="css/style.css">' + model.newFontLinkTag + jquerySrc + paralax +
            '</head><body>';
    var body = $("#build_wrap").html();
    var scripts = '<script>$(".carousel-control").on("click",function(){var s=$(this),c=$(this).closest(".carousel");return c.carousel(s.hasClass("left")?"prev":"next"),!1}),$(".carousel-indicators").find("li").on("click",function(){var s=$(this),c=s.index();return s.closest(".carousel").carousel(c),!1});</script>';
    var footer = bootstrapJsSrc  + '</body></html>';
    var styles = model.styleInRow.replace(/[\s\n\r]+/g, ' ');
    var html = header + body + scripts + filePar + footer;
    var clearedHtml = html.replace(/\scontenteditable="true"|\sdraggable="true"|\sdrag_and_drop|\sdraggable|\sdata-hover=""|\sdata-element="[^"]*"|<div class="parallax[^>]*><\/div>/g, "");

    zip.file("public/index.html", clearedHtml);
    zip.file("public/css/style.css", styles);
    var content = zip.generate({
      type: "blob"
    });
    saveAs(content, title + ".zip");
    $(".block-video").find("iframe").parent().append($editButVideo);
    $(".block-map").find("iframe").parent().append($editButMap);
    return false;
  });
  /*end of save*/

  $('.template_wrap').perfectScrollbar();
  $('.tmplsBlocksInMenu').perfectScrollbar();

})(jQuery);


