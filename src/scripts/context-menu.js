(function ($) {
  /*** modal functions*/
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

  //.img_modal
  var imageModal = $(".img_modal");
  var addImgBtn = imageModal.find(".add_img");
  var addImgInput = imageModal.find(".image_src");
  var imageList = imageModal.find(".image_list");
  addImgBtn.on("click", function () {
    var img = $('<img src="' + addImgInput.val() + '" alt>');
    var removeBtn = $("<i class='remove'>");
    removeBtn.click(function () {
      $(this).closest("li").remove();
    });
    imageList.append($("<li>").append(img).append(removeBtn));
    addImgInput.val("");
  });
  //end of .img_modal
  /*** end of  modal functions*/



  /*** event functions*/
  var eventFunctions = {
    cloneFn: function (element, eventLink) {
      var element = element;
      var eventLink = $(eventLink);
      eventLink.on("click", function () {
        element.after(element.clone());
      });
    },
    cloneFnLink: function (element, eventLink) {
      if (element.parent().prop("tagName") === "LI") {
        element = element.parent();
      }
      var eventLink = $(eventLink);
      eventLink.on("click", function () {
        element.after(element.clone());
      });
    },
    deleteFn: function (element, eventLink) {
      var element = element;
      var eventLink = $(eventLink);
      eventLink = $(eventLink);
      if (element.prop("tagName") === "IFRAME") {
        element = element.parent().children();
      }
      if (element.parent().prop("tagName") === "LI") {
        element = element.parent();
      }
      eventLink.on("click", function (e) {
        e.preventDefault()
        element.remove();
      });
    },
    changeIconFn: function (element, eventLink) {
      var element = element;
      var eventLink = $(eventLink);
      eventLink.on("click", function () {
        $(".icon_modal").modal("show");
        $(".icon_modal").find("i.fa").dblclick(function () {
          element.attr("class", $(this).attr("class"));
          $(".icon_modal").modal("hide");
        });
      });
    },
    changeImgFn: function (element, eventLink) {
      var element = element;
      var eventLink = $(eventLink);
      var img = imageList.find("img");
      eventLink.on("click", function () {
        img.unbind("dblclick");
        var addEvent = function () {
          element.attr("src", $(this).attr("src"));
          $(".img_modal").modal("hide");
        };
        img.dblclick(addEvent);
        addImgBtn.on("click", function () {
          imageList.find("li").last().find("img").dblclick(addEvent);
        });
        $(".img_modal").modal("show");
      });
    },
    changeParallaxImgFn: function (element, eventLink) {
      var element = element;
      var eventLink = $(eventLink);
      var img = imageList.find("img");

      eventLink.on("click", function () {
        img.unbind("dblclick");
        var addEvent = function () {
          element.attr("data-mdparallax", $(this).attr("src"));
          $(".img_modal").modal("hide");
          location.reload();
        };
        img.dblclick(addEvent);
        addImgBtn.on("click", function () {
          imageList.find("li").last().find("img").dblclick(addEvent);
        });
        $(".img_modal").modal("show");
        addImgInput.click();
        return false;
      });
    },
    changeVideoFn: function (element, eventLink) {
      var element = element;
      var eventLink = $(eventLink);
      var imageModal = $(".video_modal");
      var addVideoBtn = imageModal.find(".add_video");
      var addImgInput = imageModal.find(".video_src");
      eventLink.on("click", function (e) {
        e.preventDefault()
        addVideoBtn.on("click", function () {
          var url = addImgInput.val() || element.attr("src");
          element.attr("src", url);
          $(".video_modal").modal("hide");
        });
        $(".video_modal").modal("show");
      });
    },
    expandVideoFn: function (element, eventLink) {
      var $eventLink = $(eventLink);
      $eventLink.on("click", function (e) {
        var classEl = element.parent().prop("class");
        var classElWidth = +classEl.substr(-1);
        if (classElWidth < 8) {
          var classElSib = element.parent().siblings().prop("class");
          var newClassEl = classEl.substring(0, classEl.length - 1) + (classElWidth + 1);
          var newClassElSib = classElSib.substring(0, classEl.length - 1) + (+classElSib.substr(-1) - 1);
          element.parent().prop("class", newClassEl);
          element.parent().siblings().prop("class", newClassElSib);
        }
        return false;
      });
    },
    shrinkVideoFn: function (element, eventLink) {
      var $eventLink = $(eventLink);
      $eventLink.on("click", function (e) {
        var classEl = element.parent().prop("class");
        var classElWidth = +classEl.substr(-1);
        if (classElWidth > 3) {
          var classElSib = element.parent().siblings().prop("class");
          var newClassEl = classEl.substring(0, classEl.length - 1) + (classElWidth - 1);
          var newClassElSib = classElSib.substring(0, classEl.length - 1) + (+classElSib.substr(-1) + 1);
          element.parent().prop("class", newClassEl);
          element.parent().siblings().prop("class", newClassElSib);
        }
        return false;
      });
    },
    changeMapFn: function (element, eventLink) {
      var element = element;
      var eventLink = $(eventLink);
      var mapModal = $(".map_modal");
      var addMapBtn = mapModal.find(".add_map");
      var addMapInput = mapModal.find(".map_src");
      eventLink.on("click", function (e) {
        e.preventDefault()
        addMapBtn.on("click", function () {
          var url = addMapInput.val() || element.attr("src");
          element.attr("src", url);
          $(".map_modal").modal("hide");
        });
        $(".map_modal").modal("show");
      });
    },
    changeLinkFn: function (element, eventLink) {
      var element = element;
      var eventLink = $(eventLink);
      var linkModal = $(".link_modal");
      var addlinkBtn = linkModal.find(".add_link");
      var addLinkInput = linkModal.find(".link_src");
      var addNameInput = linkModal.find(".name_src");
      eventLink.on("click", function () {
        addlinkBtn.one("click", function () {

          var inputValLink = addLinkInput.val() || element.attr("href");
          var inputValName = addNameInput.val() || element.html();
          element.attr("href", inputValLink);
          element.html(inputValName);
          $(".link_modal").modal("hide");
          addLinkInput.val("");
          addNameInput.val("");
        });
        $(".link_modal").modal("show");
      });
    },
    changeBackgroundFnHeader: function (element, eventLink) {
      element = element;
      eventLink = $(eventLink);
      var backModal = $(".background_modalHeader");
      var addBackBtnSelect = backModal.find(".add_backgroundSelect");
      var addBackBtn = backModal.find(".add_background");
      var addBackInputSelect = backModal.find(".background_value");
      var addBackInput = backModal.find("#ownColor");
      eventLink.on("click", function () {
        addBackBtnSelect.on("click", function () {
          var inputVal = addBackInputSelect.val();
          $(".navigationMenu").attr("style", "background-color: " + inputVal + ";");
          $(".background_modalHeader").modal("hide");
        });
        addBackBtn.on("click", function () {
          var inputVal = addBackInput.val();
          $(".navigationMenu").attr("style", "background-color: " + inputVal + ";");
          $(".background_modalHeader").modal("hide");
        });
        $(".background_modalHeader").modal("show");
      });
    },
    changeBackgroundFnFooter: function (element, eventLink) {
      element = element;
      eventLink = $(eventLink);
      var backModal = $(".background_modalFooter");
      var addBackBtnSelect = backModal.find(".add_backgroundSelect");
      var addBackBtn = backModal.find(".add_background");
      var addBackInputSelect = backModal.find(".background_value");
      var addBackInput = backModal.find("#ownColor");
      eventLink.on("click", function () {
        addBackBtnSelect.on("click", function () {
          var inputVal = addBackInputSelect.val();
          $(".footers").attr("style", "background-color: " + inputVal + ";");
          $(".background_modalFooter").modal("hide");
        });
        addBackBtn.on("click", function () {
          var inputVal = addBackInput.val();
          $(".footers").attr("style", "background-color: " + inputVal + ";");
          $(".background_modalFooter").modal("hide");
        });
        $(".background_modalFooter").modal("show");
          addBackInput.click();
          return false;
      });
    },
    changeTimer: function (element, eventLink) {
      element = element;
      eventLink = $(eventLink);
      eventLink.one("click", function () {
        $(".timer_modal").modal("show");
        return false;
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

    if (element) {
      if (editParameters[element]) {
        if (element === "video" || element === "map") {
          target = target.siblings("iframe");
        }
        contextList.html("");
        contextTitle.text(editParameters[element]["header"]);
        editParameters[element].list.forEach(function (el) {
          var eventLink = $('<a  href="#">');
          eventLink.text(el["text"]);
          eventLink.wrap("<li>");
          contextList.append(eventLink);
          eventFunctions[el["event"]](target, eventLink);
        });

        contextMenu.css({"left": positionX, "top": positionY}).addClass("open");

        return false;
      }
    }
  });

  $("body").on("click", function (e) {
    contextMenu.removeClass("open");
  });
  /*end of Context Menu*/
})(jQuery);


