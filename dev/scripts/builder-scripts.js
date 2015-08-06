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
  
  /*download*/
  $("#download_page").on("click", function (){
    var zip = new JSZip();
    var bootstrapCssSrc = '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">';
    var jquerySrc = '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">';
    var bootstrapJsSrc = '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>';
    var title = $("#page_title").val();
    var header = '<!DOCTYPE html><html><head><title>' + title + '</title><meta charset="utf-8">' + bootstrapCssSrc   + '<link rel="stylesheet" href="styles/style.css"></head><body>';
    var body = $("#build_wrap").html();
    var footer = jquerySrc + bootstrapJsSrc + '</body></html>';
    var styles = "";
    
    zip.file("public/index.html", header + body + header);
    zip.file("public/css/styles.html", styles);
    
    var content = zip.generate({
        type: "blob"
    });
    saveAs(content, title + ".zip");
  });
  /*end of download*/

})(jQuery);



