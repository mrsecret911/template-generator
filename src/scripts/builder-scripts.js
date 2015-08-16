(function ($) {
  /*nav*/
  $("#navTab a").tab("show");

  var navWrap = $("#nav_wrap");
  var tabplateBtn = navWrap.find(".add_btn");

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

  $(".nav-icon").click(function () {
    $(this).toggleClass("active");
    $("#nav_wrap").toggleClass("show_nav");
  });
  /*end of nav*/

  /*download*/
  $("#download_page").on("click", function () {
    var $editButVideo = $(".video-over").detach();
    var $editButMap = $(".map-over").detach();
    var zip = new JSZip();
    var bootstrapCssSrc = '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">';
    var jquerySrc = '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">';
    var bootstrapJsSrc = '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>';
    var title = $("#page_title").val();
    var header = '<!DOCTYPE html><html><head><title>' + title + '</title><meta charset="utf-8">' + bootstrapCssSrc + '<link rel="stylesheet" href="css/style.css">'+ model.newFontLinkTag +'</head><body>';
    var body = $("#build_wrap").html();
    var footer = jquerySrc + bootstrapJsSrc + '</body></html>';
    var styles = model.styleInRow.replace( /[\s\n\r]+/g, ' ');
    zip.file("public/index.html", header + body + header);
    zip.file("public/css/style.css", styles);

    var content = zip.generate({
      type: "blob"
    });
    saveAs(content, title + ".zip");
    $(".block-video").find("iframe").parent().append($editButVideo);
    $(".block-map").find("iframe").parent().append($editButMap);
  });
  /*end of download*/

  /*delete page*/
  $("#delete_page").on("click", function () {
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

  $("#clear").on("click", function () {
    $(".modal").removeClass("active");
    $(".modal").addClass("fade");
  });

  $("#save").on("click", function () {
    $("#download_page").click();
    model.containerTemplateBlockList = [];
    model.containerTemplateHeaderList = "";
    model.containerTemplateFooterList = "";
    tmplsHeaderInMenuView.render();
    tmplsBlocksInMenuView.render();
    tmplsFooterInMenuView.render();
    controller.getTemplate();
  });

  $("#remove").on("click", function () {
    model.containerTemplateBlockList = [];
    model.containerTemplateHeaderList = "";
    model.containerTemplateFooterList = "";
    tmplsHeaderInMenuView.render();
    tmplsBlocksInMenuView.render();
    tmplsFooterInMenuView.render();
    controller.getTemplate();
  });

  $('.template_wrap').perfectScrollbar();
  $('.tmplsBlocksInMenu').perfectScrollbar();

})(jQuery);


