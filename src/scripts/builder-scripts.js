(function ($) {
  /*nav*/
  var navWrap = $("#nav_wrap");
  $("#nav_wrap").hide();

  $("#navTab a").tab("show");

  $("#nav_wrap").find(".add_btn").click(function () {
    $('.template_wrap').scrollTop(0);
    navWrap.addClass("template_open");
    navWrap.find(".template").removeClass("open");
    navWrap.find($(this).attr("data-open")).addClass("open");
  });
  $("#nav_wrap").find(".template_close").click(function () {
    navWrap.removeClass("template_open");
  });

  var obj = document.querySelectorAll('.nav-icon');
  for (var i = obj.length - 1; i >= 0; i--) {
    var toggle = obj[i];
    toggleSwitch(toggle);
  }

  function toggleSwitch(toggle) {
    toggle.addEventListener("click", function () {
      if (this.classList.contains("active") === true) {
        this.classList.remove("active");
        $("#nav_wrap").hide();
      }
      else {
        this.classList.add("active");
        $("#nav_wrap").show();
      }
    });
  }
  /*end of nav*/

  /*download*/
  $("#download_page").on("click", function () {
    var zip = new JSZip();
    var bootstrapCssSrc = '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">';
    var jquerySrc = '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">';
    var bootstrapJsSrc = '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>';
    var title = $("#page_title").val();
    var header = '<!DOCTYPE html><html><head><title>' + title + '</title><meta charset="utf-8">' + bootstrapCssSrc + '<link rel="stylesheet" href="styles/style.css"></head><body>';
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

  /*delete page*/
  $("#delete_page").on("click", function () {
    $("#build_wrap").empty();
    ;
  });
  /*end of delete*/

  /*Context Menu*/
  /*** load components*/
  $.ajax({
    type: "GET",
    url: "scripts/template/components.html",
    async: true,
    success: function (data) {
      var components = $(data);
      var icons = components.filter('#icon_list').html();
      $(".icon_modal").find(".modal-body").html(icons);
    },
    error: function () {
      console.log("error");
    }
  });
  /*** end of load components*/

  /*** event functions*/
  var eventFunctions = {
    changeIconFn: function (element, eventLink) {
      var element = element;
      var eventLink = $(eventLink);
      eventLink.on("click", function () {
        $(".icon_modal").modal("show");
        $(".icon_modal").find(".glyphicon").dblclick(function () {
          element.attr("class", $(this).attr("class"));
          $(".icon_modal").modal("hide");
        });
      });
    },
    cloneFn: function (element, eventLink) {
      var element = element;
      var eventLink = $(eventLink);
      eventLink.on("click", function () {
        element.after(element.clone());
      });
    },
    deleteFn: function (element, eventLink) {
      var element = element;
      var eventLink = $(eventLink);
      eventLink.on("click", function () {
        element.remove();
      });
    }
  };
  /*** end of event functions*/


  var editParameters;
  $.ajax({
    type: "GET",
    url: "scripts/json/edit-element.json",
    async: true,
    dataType: "json",
    success: function (data) {
      editParameters = data;
    },
    error: function () {
      console.log("error");
    }
  });


  var contextMenu = $("#context_menu");
  var contextTitle = $("#context_menu").find(".context_title");
  var contextList = $("#context_menu").find(".context_list");

  $("#build_wrap").on("contextmenu", function (e) {
    var positionX = e.pageX;
    var positionY = e.pageY;
    var target = $(e.target);
    var element = target.attr("data-element");

    if (editParameters[element]) {
      contextList.html("");
      contextTitle.text(editParameters[element]["header"]);
      editParameters[element].list.forEach(function (el) {
        var eventLink = $('<a  href="#">');
        eventLink.text(el["text"]);
        eventLink.wrap("<li>");
        contextList.append(eventLink);
        eventFunctions[el["event"]](target, eventLink);
      });
    }

    contextMenu.css({"left": positionX, "top": positionY})
            .addClass("open");

    return false;
  });

  $("#clear").on("click", function () {
    $(".modal").removeClass("active");
    $(".modal").addClass("fade");
  });

  $("#save").on("click", function () {
    $("#download_page").click();
    model.containerTemplateList = [];
    tmplsInMenuView.render();
    controller.getTemplate();
  });

  $("#remove").on("click", function () {
    model.containerTemplateList = [];
    tmplsInMenuView.render();
    controller.getTemplate();
  });

  $("body").on("click", function (e) {
    contextMenu.removeClass("open");
  });

  /*end of Context Menu*/

  $('.template_wrap').perfectScrollbar();
  $('.tmplsBlocksInMenu').perfectScrollbar();

})(jQuery);



