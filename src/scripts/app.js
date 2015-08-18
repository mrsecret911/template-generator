var model = {
  containerTemplateBlockList: [],
  containerTemplateHeader: "",
  containerTemplateFooter: "",
  newTeplateBlock: "",
  newTemplateHeader: "",
  newTemplateFooter: "",
  buildWrapContent: "",
  newFontName: "",
  newLineHeight: "",
  newFontLinkTag: "",
  styleTemplate: {},
  styleInRow: ""
};

var controller = {
  init: function () {
    this.localStorageTemplates();
    this.localStorageList();
    this.localStorage();
    this.getModel();
    this.sortadTmplList();
    this.sendRequestJSON("scripts/json/fonts.json", this.initSettingsFontsView);
    this.pageSaver();
    settingsLineHeightView.init();
    settingsTabletView.init();
    settingsMobileView.init();
  },
  getAllblocks: function (model) {
    var blocks = [];
    model.blocks.forEach(function (block) {
      blocks.push({
        id: block.id,
        imgSrc: block.imgSrc,
        subscription: block.subscription,
        events: block.events
      });
    });
    return blocks;
  },
  getAllFooters: function (model) {
    var footers = [];
    model.footers.forEach(function (footer) {
      footers.push({
        id: footer.id,
        imgSrc: footer.imgSrc,
        subscription: footer.subscription,
        events: footer.events
      });
    });
    return footers;
  },
  getAllHeaders: function (model) {
    var headers = [];
    model.headers.forEach(function (header) {
      headers.push({
        id: header.id,
        imgSrc: header.imgSrc,
        subscription: header.subscription,
        events: header.events
      });
    });
    return headers;
  },
  localStorageTemplates: function () {
    var localLinkGet = JSON.parse(localStorage.getItem("link"));
    $("head").append(localLinkGet);
    model.newFontLinkTag = localLinkGet;
    model.styleTemplate = JSON.parse(localStorage.getItem("styleTemplate"));
    this.setStyleInRow();
    model.newFontName = JSON.parse(localStorage.getItem("newFontName"));

    model.newLineHeight = JSON.parse(localStorage.getItem("newLineHeight"));

    this.$container = $("#build_wrap");
    var localTemplate = JSON.parse(localStorage.getItem("template"));
    this.$container.html(localTemplate);
  },
  localStorageList: function () {
    this.$container = $(".tmplsBlocksInMenu");
    var localList = JSON.parse(localStorage.getItem("listItem"));
    var localListHeader = JSON.parse(localStorage.getItem("listHeader"));
    var localListFooter = JSON.parse(localStorage.getItem("listFooter"));
    this.$container.html(localList);
    $(".tmplsHeaderInMenu").html(localListHeader);
    $(".tmplsFooterInMenu").html(localListFooter);
  },
  localStorage: function () {
    var newContainerTemplateBlockList = [];
    $.each($(".tmplsBlocksInMenu").find('li'), function (index, el) {
      var tmplId = $(el).find(".tmpl_id").html();
      newContainerTemplateBlockList.push("#" + tmplId);
    });
    model.containerTemplateBlockList = newContainerTemplateBlockList;
    localStorage.setItem('blockListModel', JSON.stringify(model.containerTemplateBlockList));
  },
  getModel: function () {
    $.ajax({
      type: "GET",
      url: "scripts/model.json",
      async: true,
      dataType: "json",
      success: function (data) {

        blocksView.init();
        blocksView.render(data);

        footersView.init();
        footersView.render(data);

        headersView.init();
        headersView.render(data);

        tmplsOnPageBlockView.init();
        tmplsOnPageHeaderView.init();
        tmplsOnPageFooterView.init();
        tmplsBlocksInMenuView.init();
        tmplsHeaderInMenuView.init();
        tmplsFooterInMenuView.init();
      },
      error: function () {
        console.log("error");
      }
    });
  },
  getTemplate: function (id, type) {

    $.ajax({
      type: "GET",
      url: "scripts/template/tmpl.html",
      async: true,
      success: function (data) {
        var $templates = $(data);
        if (id) {
          switch (type) {
            case "block":
              model.containerTemplateBlockList.push(id);
              controller.setNewTemplateBlock($templates, id);
              tmplsBlocksInMenuView.render();
              tmplsOnPageBlockView.render();
              break;
            case "header":
              model.containerTemplateHeader = id;
              controller.setNewTemplateHeader($templates, id);
              tmplsHeaderInMenuView.render();
              tmplsOnPageHeaderView.render();
              break;
            case "footer":
              model.containerTemplateFooter = id;
              controller.setNewTemplateFooter($templates, id);
              tmplsFooterInMenuView.render();
              tmplsOnPageFooterView.render();
              break;
          }
          controller.makeStyleChange(model.newFontName, model.newLineHeight);
        }
      },
      error: function () {
        console.log("error");
      }
    });
  },
  pageSaver: function () {
    $(window).bind('beforeunload', function () {
      var currentStatus = $("#build_wrap").html();
      if ($("#build_wrap").find(".iframe_device").length > 0) {
        currentStatus = model.buildWrapContent;
      }
      localStorage.setItem('template', JSON.stringify(currentStatus));
      var localGet = JSON.parse(localStorage.getItem("template"));
      localStorage.setItem('link', JSON.stringify(model.newFontLinkTag));
      localStorage.setItem('newFontName', JSON.stringify(model.newFontName));
      localStorage.setItem('newLineHeight', JSON.stringify(model.newLineHeight));
      localStorage.setItem('styleTemplate', JSON.stringify(model.styleTemplate));
      $("#build_wrap").html(localGet);

      controller.localStorageList();
    });
  },
  sortadTmplList: function () {
    $(".tmplsBlocksInMenu").sortable({
      start: function (event, ui) {
        ui.item.startPos = ui.item.index();
      },
      stop: function (event, ui) {
        var start = ui.item.startPos;
        var end = ui.item.index();
        var $divs = $("#build_wrap > section");
        if (start !== end) {
          var block = $divs.eq(start).clone();
          $divs.eq(start).remove();
          if (end) {
            $("#build_wrap > section").eq(end - 1).after(block);
          } else {
            $("#build_wrap > section").eq(0).before(block);
          }
        }
        controller.addEvents();
        var newContainerTemplateBlockList = [];
        $.each($(".tmplsBlocksInMenu")
                .find('li'), function (index, el) {
          var tmplId = $(el).find(".tmpl_id").html();
          newContainerTemplateBlockList.push("#" + tmplId);
        });
        model.containerTemplateBlockList = newContainerTemplateBlockList;
        localStorage.setItem('listItem', JSON.stringify($(".tmplsBlocksInMenu").html()));
      },
    });
    $(".tmplsBlocksInMenu").disableSelection();
  },
  initSettingsFontsView: function (data) {
    settingsFontsView.init();
    settingsFontsView.render(data);
  },
  sendRequestJSON: function (url, fun) {
    $.ajax({
      type: "GET",
      url: url,
      async: true,
      dataType: "json",
      success: function (data) {
        fun(data);
      },
      error: function () {
        console.log("error");
      }
    });
  },
  sendRequest: function (url, fun, id, type) {
    $.ajax({
      type: "GET",
      url: url,
      async: true,
      success: function (data) {
        fun(data, id, type);
      },
      error: function () {
        console.log("error");
      }
    });
  },
  getBlocksFromPage: function () {
    var $content = $("#build_wrap").clone();
    if ($content.find("header").length > 0) {
      $content.find("header").remove();
    }
    if ($content.find("footer").length > 0) {
      $content.find("footer").remove();
    }
    return $content.html();
  },
  getHeaderFromPage: function () {
    var $content = $("#build_wrap");
    var header = "";
    if ($content.find("header").length > 0) {
      header = "<header>" + $content.find("header").html() + "</header>";
    }
    return header;
  },
  getFooterFromPage: function () {
    var $content = $("#build_wrap");
    var footer = "";
    if ($content.find("footer").length > 0) {
      footer = "<footer>" + $content.find("footer").html() + "</footer>";
    }
    return footer;
  },
  setNewTemplateBlock: function (tmpls, id) {
    model.newTeplateBlock = tmpls.filter(id).html();
  },
  setNewTemplateHeader: function (tmpls, id) {
    model.newTemplateHeader = tmpls.filter(id).html();
  },
  setNewTemplateFooter: function (tmpls, id) {
    model.newTemplateFooter = tmpls.filter(id).html();
  },
  deleteBlockOnPage: function (num) {
    $("#build_wrap > section").eq(num).remove();
  },
  deleteHeaderOrFooterOnPage: function (name) {
    $("#build_wrap").find(name).remove();
  },
  makeStyleChange: function (font, lineHeight) {
    font = font || "";
    lineHeight = lineHeight || "";
    if (font.length) {
      $("#build_wrap > section, header, footer").css('font-family', font);
    } else if (lineHeight.length) {
      $("#build_wrap p").css("line-height", lineHeight + "px");
    }
  },
  turnOnModeView: function () {
    var $clickOffSetEl = $(".settings_text-font,.settings_text-line-height");
    $clickOffSetEl.css("pointer-events", "none");
    var $clickOffEl = $(".main_nav a:not([href$='#build_settings'])");
    $.each($clickOffEl, function (index, el) {
      $(el).on("click.delete", function () {
        $("#cmn-toggle1").prop('checked', false);
        $("#build_wrap").html(model.buildWrapContent);
        $("body").removeClass("backgroundStyle");
        $clickOffEl.off("click.delete");
        $clickOffSetEl.css("pointer-events", "all");
      });
      var eventList = $._data($(el)[0], "events");
      eventList.click.unshift(eventList.click.pop());
    });
  },
  turnOffModeView: function () {
    var $clickOffSetEl = $(".settings_text-font,.settings_text-line-height");
    $clickOffSetEl.css("pointer-events", "all");
    var $clickOffEl = $(".main_nav a:not([href$='#build_settings'])");
    $.each($clickOffEl, function (index, el) {
      $(el).off("click.delete");
    });
  },
  addContentsToIframe: function () {
    var headContent = $("head").html();
    var $frameFromPage = $("iframe");
    setTimeout(function () {
      $frameFromPage.contents().find('head').html(headContent);
      $frameFromPage.contents().find('body').html(model.buildWrapContent);
      $frameFromPage.contents().find('body').css("pointer-events", "none");
      var contenteditableList = $frameFromPage.contents().find("[contenteditable=true]");
      $.each(contenteditableList, function (index, el) {
        $(el).removeAttr("contenteditable");
      });
    }, 400);
    $("body").addClass("backgroundStyle");
  },
  setStyle: function (data, id, type) {
    var styleForTmpl = $(data).filter(id).html();
    var $styleForTmpl = $(styleForTmpl).filter("style");
    if ($styleForTmpl.length > 0) {
      if (type === "header") {
        model.styleTemplate["header"] = $styleForTmpl.html();
      }
      if (type === "footer") {
        model.styleTemplate["footer"] = $styleForTmpl.html();
      }
      if (type === "block") {
        model.styleTemplate[id] = $styleForTmpl.html();
      }
      controller.setStyleInRow();
    }
  },
  setStyleInRow: function () {
    var styleArr = [];
    for (var tmpl in model.styleTemplate) {
      if (model.styleTemplate.hasOwnProperty(tmpl)) {
        styleArr.push(model.styleTemplate[tmpl]);
      }
    }
    model.styleInRow = styleArr.join(" ");
  },
  addEvents: function () {
    $(".drag_and_drop").dragAndDrop({
      draggable: ".draggable"
    });
    $(".block-over").on("click", function (e) {
      var event = $.Event("contextmenu");
      event.pageX = e.pageX;
      event.pageY = e.pageY;
      $(e.target).trigger(event);
      return false;
    });
    /*bootstrap slider*/
    $(".carousel-control").on("click", function () {
      console.log(1111);
      var btn = $(this);
      var carousel = $(this).closest(".carousel");
      if (btn.hasClass("left")) {
        carousel.carousel('prev');
      }
      else {
        carousel.carousel('next');
      }
      return false;
    });
    /*end of bootstrap slider*/

    /*new user block*/
    var buildWrapContent = $("#build_wrap").html();
    var subNav = $(".sub_nav");
    var welcomBlock = $(".welcome");
    if (!buildWrapContent) {
      welcomBlock.addClass("new_user");
    }
    $(".welcome_bth").click(function () {
      subNav.addClass("hover");
      setTimeout(function () {
        $(".add_block_btn").trigger("click");
        subNav.removeClass("hover");
      }, 300);
    });
    /*end of new user block*/

    /*timer Block logic*/
    var end = new Date('01/01/2016 00:0');

    if (localStorage.getItem("blockTimer") !== null) {
      end = new Date(JSON.parse(localStorage.getItem("blockTimer")));
    }

    var modal = $(".timer_modal");
    var btn = modal.find(".add_time")
    btn.on("click", function () {
      var day = modal.find("#day").val();
      var month = modal.find("#month").val();
      var year = modal.find("#year").val();
      end = new Date('"' + month + '/' + day + '/' + year + '"');
      localStorage.setItem('blockTimer', JSON.stringify(end));
      $(".timer_modal").modal("hide");
    });
    var container = $(".timer-block").find("#timer");
    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;

    function showRemaining() {
      var now = new Date();
      var distance = end - now;
      if (distance < 0) {
        clearInterval(timer);
        container.text('EXPIRED!');
        return;
      }
      var days = Math.floor(distance / _day);
      var hours = Math.floor((distance % _day) / _hour);
      var minutes = Math.floor((distance % _hour) / _minute);
      var seconds = Math.floor((distance % _minute) / _second);
      container.text(days + ' DAYS ' + hours + ":" + minutes + ":" + seconds);
    }
    setInterval(showRemaining, 1000);
    /*End of timer block logic*/
  }
};

var blocksView = {
  init: function () {
    this.$container = $(".block_template");
    this.handleClicks();
  },
  render: function (data) {
    var list = '';
    controller.getAllblocks(data).forEach(function (block) {
      list += '<li data-type="block" data-id="#' + block.id + '"><img src="' + block.imgSrc + '" alt><span class="subscription">' +
              block.subscription + '</span></li>';
    });
    this.$container.html(list);
    controller.addEvents();
  },
  handleClicks: function () {
    this.$container.on("click", "li", function (e) {
      var element = $(e.target);
      controller.getTemplate(element.attr("data-id"), element.attr("data-type"));
      controller.sendRequest("scripts/template/style.html", controller.setStyle, element.attr("data-id"), element.attr("data-type"));
    });
  },
};

var footersView = {
  init: function () {
    this.$container = $(".footer_template");
    this.handleClicks();
  },
  render: function (data) {
    var list = '';
    controller.getAllFooters(data).forEach(function (footer) {
      list += '<li data-type="footer" data-id="#' + footer.id + '"><img src="' + footer.imgSrc + '" alt><span class="subscription">' +
              footer.subscription + '</span></li>';
    });
    this.$container.html(list);
  },
  handleClicks: function () {
    this.$container.on("click", "li", function (e) {
      var element = $(e.target);
      controller.getTemplate(element.attr("data-id"), element.attr("data-type"));
      controller.sendRequest("scripts/template/style.html", controller.setStyle, element.attr("data-id"), element.attr("data-type"));
    });
  }
};

var headersView = {
  init: function () {
    this.$container = $(".header_template");
    this.handleClicks();
  },
  render: function (data) {
    var list = '';
    controller.getAllHeaders(data).forEach(function (header) {
      list += '<li data-type="header" data-id="#' + header.id + '"><img src="' + header.imgSrc + '" alt><span class="subscription">' +
              header.subscription + '</span></li>';
    });
    this.$container.html(list);

  },
  handleClicks: function () {
    this.$container.on("click", "li", function (e) {
      var element = $(e.target);
      controller.getTemplate(element.attr("data-id"), element.attr("data-type"));
      controller.sendRequest("scripts/template/style.html", controller.setStyle, element.attr("data-id"), element.attr("data-type"));
    });
  }
};

var tmplsOnPageBlockView = {
  init: function () {
    this.$container = $("#build_wrap");
  },
  render: function () {
    var list = "";
    $(".welcome").hide();
    list += controller.getHeaderFromPage();
    list += controller.getBlocksFromPage() + model.newTeplateBlock;
    list += controller.getFooterFromPage();
    this.$container.html(list);
    controller.addEvents();
  },
};

var tmplsOnPageHeaderView = {
  init: function () {
    this.$container = $("#build_wrap");
  },
  render: function () {
    var list = "";
    $(".welcome").hide();
    list += model.newTemplateHeader;
    list += controller.getBlocksFromPage();
    list += controller.getFooterFromPage();
    this.$container.html(list);
    controller.addEvents();
  },
};

var tmplsOnPageFooterView = {
  init: function () {
    this.$container = $("#build_wrap");
  },
  render: function () {
    var list = "";
    $(".welcome").hide();
    list += controller.getHeaderFromPage();
    list += controller.getBlocksFromPage();
    list += model.newTemplateFooter;
    this.$container.html(list);
    controller.addEvents();
  }
};

var tmplsBlocksInMenuView = {
  init: function () {
    this.$container = $(".tmplsBlocksInMenu");
    this.handleClicks();
  },
  render: function () {
    var list = "";
    model.containerTemplateBlockList.forEach(function (tmplId) {
      list += '<li class="ui-state-default"><span class="tmpl_id">' + tmplId.substr(1) + '</span> <span class="tmpl_delete">x</span></li>';
    });
    this.$container.html(list);

    localStorage.setItem('listItem', JSON.stringify(list));
    var localGet = JSON.parse(localStorage.getItem("listItem"));

    list += localGet;
  },
  handleClicks: function () {
    this.$container.on("click", ".tmpl_delete", function (e) {
      var currentSpan = $(e.target);
      var currentLi = currentSpan.parent();
      var currentIndex = currentLi.index();
      var tmplId = model.containerTemplateBlockList[currentIndex];
      model.containerTemplateBlockList.splice(currentIndex, 1);
      if (model.styleTemplate[tmplId] && $.inArray(tmplId, model.containerTemplateBlockList) === -1) {
        model.styleTemplate[tmplId] = null;
        controller.setStyleInRow();
      }
      tmplsBlocksInMenuView.render();
      controller.deleteBlockOnPage(currentIndex);
      localStorage.setItem('listItem', JSON.stringify($(".tmplsBlocksInMenu").html()));
    });
  }
};

var tmplsHeaderInMenuView = {
  init: function () {
    this.$container = $(".tmplsHeaderInMenu");
    this.handleClicks();
  },
  render: function () {
    var list = "";
    if (model.containerTemplateHeader) {
      list += '<li><span class="tmpl_id">' + model.containerTemplateHeader.substr(1) + '</span> <span class="tmpl_delete">x</span></li>';
    }

    this.$container.html(list);

    localStorage.setItem('listHeader', JSON.stringify(list));
    var localGet = JSON.parse(localStorage.getItem("listHeader"));

    list += localGet;
  },
  handleClicks: function () {
    this.$container.on("click", ".tmpl_delete", function () {
      if (model.styleTemplate["header"]) {
        model.styleTemplate["header"] = null;
      }
      model.containerTemplateHeader = "";
      tmplsHeaderInMenuView.render();
      controller.deleteHeaderOrFooterOnPage("header");
    });
  }
};

var tmplsFooterInMenuView = {
  init: function () {
    this.$container = $(".tmplsFooterInMenu");
    this.handleClicks();
  },
  render: function () {
    var list = "";
    if (model.containerTemplateFooter) {
      list += '<li><span class="tmpl_id">' + model.containerTemplateFooter.substr(1) + '</span> <span class="tmpl_delete">x</span></li>';
    }
    this.$container.html(list);

    localStorage.setItem('listFooter', JSON.stringify(list));
    var localGet = JSON.parse(localStorage.getItem("listFooter"));

    list += localGet;
  },
  handleClicks: function () {
    this.$container.on("click", ".tmpl_delete", function () {
      if (model.styleTemplate["footer"]) {
        model.styleTemplate["footer"] = null;
      }
      model.containerTemplateFooter = "";
      tmplsFooterInMenuView.render();
      controller.deleteHeaderOrFooterOnPage("footer");
    });
  }
};

var settingsFontsView = {
  init: function () {
    this.$container = $(".settings_text-font");
    this.handleClicks();
  },
  render: function (data) {
    var list = "";
    data.fonts.forEach(function (font) {
      list += '<li><img src="' + font.img + '" alt data-link="' + font.link + '" data-name="' + font.name + '"></li>';
    });
    this.$container.find("ul").html(list);
  },
  handleClicks: function () {
    this.$container.on("click", "span", function () {
      settingsFontsView.$container.find("ul").slideToggle();
    });
    this.$container.find("ul").on("click", "img", function (e) {
      var newFontLink = ($(e.target).attr("data-link"));
      model.newFontName = ($(e.target).attr("data-name"));
      var newFontElHref = $(".newFont").attr("href");
      model.newFontLinkTag = '<link class="newFont" rel="stylesheet" href="' + newFontLink + '">';
      if (!newFontElHref) {
        $("head").append(model.newFontLinkTag);
      } else {
        $(".newFont").attr("href", newFontLink);
      }
      controller.makeStyleChange(model.newFontName);
      localStorage.setItem('link', JSON.stringify(model.newFontLinkTag));
      localStorage.setItem('newFontName', JSON.stringify(model.newFontName));
    });
  }
};

var settingsLineHeightView = {
  init: function () {
    this.$container = $(".settings_text-line-height");
    this.setDefaultValueInput();
    this.handleClicks();
  },
  handleClicks: function () {
    this.$container.on("change", "input", function () {
      model.newLineHeight = settingsLineHeightView.$container.find("input").val();
      controller.makeStyleChange(undefined, model.newLineHeight);
    });
  },
  setDefaultValueInput: function () {
    if (oldLineHeught) {
      var oldLineHeught = $("#build_wrap p").css("line-height");
      oldLineHeught = oldLineHeught.substr(0, oldLineHeught.length - 2);
      this.$container.find("input").val(oldLineHeught);
    }
  }
};

var settingsTabletView = {
  init: function () {
    this.$container = $(".settings_tablet-view");
    this.handleClicks();
  },
  handleClicks: function () {
    this.$container.on("change", "input", function (e) {
      var $currentEl = $(e.target);
      if ($currentEl.prop('checked')) {
        if (!$("#cmn-toggle2").prop('checked')) {
          model.buildWrapContent = $("#build_wrap").html();
        }
        $("#build_wrap").empty();
        $("#cmn-toggle2").prop('checked', false);
        var pageHeight = $(window).innerHeight() - 60;
        var $frame = $('<div class="iframe-tablet"><iframe class="iframe_device" src="" style="width: inherit;height:' + pageHeight + 'px">your browser needs to be updated.</iframe></div>');
        $("#build_wrap").html($frame);
        $frame.show(function () {
          $frame.find("iframe").css("opacity", "1");
        });
        controller.addContentsToIframe();
        controller.turnOnModeView();
      } else {
        controller.turnOffModeView();
        $('#build_wrap').html(model.buildWrapContent);
        $("body").removeClass("backgroundStyle");
        controller.addEvents();
      }
    });
  },
};

var settingsMobileView = {
  init: function () {
    this.$container = $(".settings_mobile-view");
    this.handleClicks();
  },
  handleClicks: function () {
    this.$container.on("change", "input", function (e) {
      var $currentEl = $(e.target);
      if ($currentEl.prop('checked')) {
        if (!$("#cmn-toggle1").prop('checked')) {
          model.buildWrapContent = $("#build_wrap").html();
        }
        $("#build_wrap").empty();
        $("#cmn-toggle1").prop('checked', false);
        var pageHeight = $(window).innerHeight() - 60;
        var $frame = $('<div class="iframe-mobile"><iframe class="iframe_device" src="" style="width: inherit;height:' + pageHeight + 'px">your browser needs to be updated.</iframe></div>');
        $("#build_wrap").html($frame);
        $frame.show(function () {
          $frame.find("iframe").css("opacity", "1");
        });
        controller.addContentsToIframe();
        controller.turnOnModeView();
      } else {
        controller.turnOffModeView();
        $('#build_wrap').html(model.buildWrapContent);
        $("body").removeClass("backgroundStyle");
        controller.addEvents();
      }
    });
  },
};

controller.init();