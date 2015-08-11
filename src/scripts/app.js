var model = {
  containerTemplateBlockList: [],
  containerTemplateHeaderList: "",
  containerTemplateFooterList: "",
};

var controller = {

  init: function() {
    this.localStorageTemplates();
    this.localStorageList();
    this.localStorage();
    this.getModel();
    this.sortadTmplList()
    this.sendRequestJSON("scripts/json/fonts.json", this.initSettingsFontsView);
    this.pageSaver();
  },
  getAllblocks: function(model) {
    var blocks = [];
    model.blocks.forEach(function(block) {
      blocks.push({
        id: block.id,
        imgSrc: block.imgSrc,
        subscription: block.subscription
      });
    });
    return blocks;
  },
  getAllFooters: function(model) {
    var footers = [];
    model.footers.forEach(function(footer) {
      footers.push({
        id: footer.id,
        imgSrc: footer.imgSrc,
        subscription: footer.subscription
      });
    });
    return footers;
  },
  getAllHeaders: function(model) {
    var headers = [];
    model.headers.forEach(function(header) {
      headers.push({
        id: header.id,
        imgSrc: header.imgSrc,
        subscription: header.subscription
      });
    });
    return headers;
  },
  localStorageTemplates: function() {
    this.$container = $("#build_wrap");
    var localTemplate = JSON.parse(localStorage.getItem("template"));
    this.$container.html(localTemplate);
    $("#undefined").remove();
  },
  localStorageList: function() {
    this.$container = $(".tmplsBlocksInMenu");
    var localList = JSON.parse(localStorage.getItem("listItem"));
    var localListHeader = JSON.parse(localStorage.getItem("listHeader"));
    var localListFooter = JSON.parse(localStorage.getItem("listFooter"));
    this.$container.html(localList);
    $(".tmplsHeaderInMenu").html(localListHeader);
    $(".tmplsFooterInMenu").html(localListFooter);
  },
  localStorage: function() {
    var newContainerTemplateBlockList = [];
      $.each($(".tmplsBlocksInMenu").parent().find('li'), function(index, el) {
        var tmplId = $(el).find(".tmpl_id").html();
        newContainerTemplateBlockList.push("#" + tmplId);
      });
    model.containerTemplateBlockList = newContainerTemplateBlockList;
    localStorage.setItem('blockListModel',JSON.stringify(model.containerTemplateBlockList));
  },
  getModel: function() {
    $.ajax({
      type: "GET",
      url: "scripts/model.json",
      async: true,
      dataType: "json",
      success: function(data) {
        
        blocksView.init();
        blocksView.render(data);

        footersView.init();
        footersView.render(data);

        headersView.init();
        headersView.render(data);

        tmplsOnPageView.init();
        tmplsBlocksInMenuView.init();
        tmplsHeaderInMenuView.init();
        tmplsFooterInMenuView.init();
      },
      error: function() {
        console.log("error");
      }
    });
  },
  getTemplate: function(id) {
    $.ajax({
      type: "GET",
      url: "scripts/template/tmpl.html",
      async: true,
      success: function(data) {
        var $templates = $(data);
        if (id) {
          var tmplsType = id.substr(1,1);
          switch (tmplsType) {
            case "b":
              model.containerTemplateBlockList.push(id);
              tmplsBlocksInMenuView.render();
              break;
            case "h":
              model.containerTemplateHeaderList = id;
              tmplsHeaderInMenuView.render();
              break;
            case "f": 
              model.containerTemplateFooterList = id;
              tmplsFooterInMenuView.render();
              break;
          }
        }
              tmplsOnPageView.render($templates);
        
      },
      error: function() {
        console.log("error");
      }
    });
  },
  pageSaver: function() {
    $(window).bind('beforeunload', function(){
      var currentStatus = $("#build_wrap").html();
      var localSet = localStorage.setItem('template', JSON.stringify(currentStatus));
      var localGet = JSON.parse(localStorage.getItem("template"));
      var realStatus = $("#build_wrap").html(localGet);
      controller.localStorageList();
    });
  },
  templateFromPage: function(tmplId) {
    var currentStatus = $("#build_wrap").html();
    var localSet = localStorage.setItem('template', JSON.stringify(currentStatus));
    var localGet = JSON.parse(localStorage.getItem("template"));
    var realStatus = $("#build_wrap").html(localGet);
    controller.localStorageList();

    var list = ""; 
      list += model.containerTemplateHeaderList;
        for(var i=0; i <= tmplId.length; i++){
          list += '<div id="' + tmplId[i]  + '">' +  $('div[id=' + tmplId[i] + ']').html() + '</div>';
        }
      list+=model.containerTemplateFooterList;

    localStorage.setItem('blockListModel',JSON.stringify(model.containerTemplateBlockList));
    localStorage.setItem('template',JSON.stringify(list));

    $("#build_wrap").html(list);
    tmplsBlocksInMenuView.render();
    $("#undefined").remove();
  },
   sortadTmplList: function() {
    $(".tmplsBlocksInMenu").sortable({
      stop: function() {
        var newContainerTemplateBlockList = [];
        $.each($(".tmplsBlocksInMenu")
          .find('li'), function(index, el) {
          var tmplId = $(el).find(".tmpl_id").html();
          newContainerTemplateBlockList.push("#" + tmplId);
        });
        model.containerTemplateBlockList = newContainerTemplateBlockList;
        model.containerTemplateHeaderList = JSON.parse(localStorage.getItem("blockListModelHeader"));
        model.containerTemplateFooterList = JSON.parse(localStorage.getItem("blockListModelFooter"));
        localStorage.setItem('blockListModel', JSON.stringify( model.containerTemplateBlockList ));

        controller.templateFromPage(model.containerTemplateBlockList);
      }
    });
    $(".tmplsBlocksInMenu").disableSelection();
  },
  initSettingsFontsView: function (data) {
    settingsFontsView.init();
    settingsFontsView.render(data);
  },
  sendRequestJSON: function(url, fun){
    $.ajax({
      type: "GET",
      url: url,
      async: true,
      dataType: "json",
      success: function(data) {
        fun(data);
      },
      error: function() {
        console.log("error");
      }
    })
  },
  sendRequest: function(url, fun){
  $.ajax({
    type: "GET",
    url: url,
    async: true,
    success: function(data) {
      fun(data);
    },
    error: function() {
      console.log("error");
    }
  })
}
};

var blocksView = {
  init: function() {
    this.$container = $(".block_template");
    this.handleClicks();
  },
  render: function(data) {
    var list = '';
    controller.getAllblocks(data).forEach(function(block) {
      list += '<li><img src="' + block.imgSrc + '" alt><span class="subscription">' +
        block.subscription + '</span><span class="hide">' + block.id + '</span></li>';
    });
    this.$container.html(list);
  },
  handleClicks: function() {
    this.$container.on("click", "li", function(e) {
      var templateId = "#" + $(e.target).find(".hide").html();
      controller.getTemplate(templateId);
    });
  }
};

var footersView = {
  init: function() {
    this.$container = $(".footer_template");
    this.handleClicks();
  },
  render: function(data) {
    var list = '';
    controller.getAllFooters(data).forEach(function(footer) {
      list += '<li><img src="' + footer.imgSrc + '" alt><span class="subscription">' +
        footer.subscription + '</span><span class="hide">' + footer.id + '</span></li>';
    });
    this.$container.html(list);
  },
  handleClicks: function() {
    this.$container.on("click", "li", function(e) {
      var templateId = "#" + $(e.target).find(".hide").html();
      controller.getTemplate(templateId);
    });
  }
};

var headersView = {
  init: function() {
    this.$container = $(".header_template");
    this.handleClicks();
  },
  render: function(data) {
    var list = '';
    controller.getAllHeaders(data).forEach(function(header) {
      list += '<li><img src="' + header.imgSrc + '" alt><span class="subscription">' +
        header.subscription + '</span><span class="hide">' + header.id + '</span></li>';
    });
    this.$container.html(list);
  },
  handleClicks: function() {
    this.$container.on("click", "li", function(e) {
      var templateId = "#" + $(e.target).find(".hide").html();
      controller.getTemplate(templateId);
    });
  }
};

var tmplsOnPageView = {
  init: function() {
    this.$container = $("#build_wrap");
  },
  render: function(tmpls) {
    var list = "";
    list += model.containerTemplateHeaderList;

    model.containerTemplateBlockList.forEach(function(el) {
      var template = tmpls.find(el).html();
      list +=  '<div id="' + el + '">' + template  + '</div>';
    });
    list += model.containerTemplateFooterList;
    this.$container.html(list);

    var localSet = localStorage.setItem('template',JSON.stringify(list));
    var localGet = JSON.parse(localStorage.getItem("template"));

    list+=localGet;
  },
};

var tmplsBlocksInMenuView = {
  init: function() {
    this.$container = $(".tmplsBlocksInMenu");
    this.handleClicks();
  },
  render: function() {
    var list = "";
    model.containerTemplateBlockList.forEach(function(tmplId) {
      list += '<li class="ui-state-default"><span class="tmpl_id">'
           + tmplId.substr(1)
           + '</span> <span class="tmpl_delete">x</span></li>';
    });
    this.$container.html(list);

    var localSet = localStorage.setItem('listItem', JSON.stringify(list));
    var localGet = JSON.parse(localStorage.getItem("listItem"));

    list+=localGet;
  },
  handleClicks: function() {
    this.$container.on("click", ".tmpl_delete", function(e) {
      var currentSpan = $(e.target);
      var currentLi = currentSpan.parent();
      var currentIndex = currentLi.index();
      model.containerTemplateBlockList.splice(currentIndex, 1);
      tmplsBlocksInMenuView.render();
      controller.templateFromPage(model.containerTemplateBlockList);
    });
  }
};

var tmplsHeaderInMenuView = {
  init: function() {
    this.$container = $(".tmplsHeaderInMenu");
    this.handleClicks();
  },
  render: function() {
    var list = "";
    if (model.containerTemplateHeaderList){
      list += '<li><span class="tmpl_id">'
           + model.containerTemplateHeaderList.substr(1)
           + '</span> <span class="tmpl_delete">x</span></li>';
    }

    this.$container.html(list);

    var localSet = localStorage.setItem('listHeader', JSON.stringify(list));
    var localGet = JSON.parse(localStorage.getItem("listHeader"));

    list+=localGet;
  },
  handleClicks: function() {
    this.$container.on("click", ".tmpl_delete", function(e) {
      model.containerTemplateHeaderList = "";
      tmplsHeaderInMenuView.render();
      controller.getTemplate();
    });
  }
};

var tmplsFooterInMenuView = {
  init: function() {
    this.$container = $(".tmplsFooterInMenu");
    this.handleClicks();
  },
  render: function() {
    var list = "";
    if (model.containerTemplateFooterList){
      list += '<li><span class="tmpl_id">'
           + model.containerTemplateFooterList.substr(1)
           + '</span> <span class="tmpl_delete">x</span></li>';
    }
    this.$container.html(list);

    var localSet = localStorage.setItem('listFooter', JSON.stringify(list));
    var localGet = JSON.parse(localStorage.getItem("listFooter"));

    list+=localGet;
  },
  handleClicks: function() {
    this.$container.on("click", ".tmpl_delete", function(e) {
      model.containerTemplateFooterList = "";
      tmplsFooterInMenuView.render();
      controller.getTemplate();
    });
  }
};

var settingsFontsView = {
  init: function () {
    this.$container = $(".settings_text-font")
    this.handleClicks();
  },
  render: function (data) {
    var list = "";
    data.fonts.forEach(function (font) {
      list += '<li><img src="' + font.img + '" alt data-link="' + font.link + '" data-name="' + font.name + '"></li>'
    })
    this.$container.find("ul").html(list);
  },
  handleClicks: function(){
    this.$container.on("click", "span", function(){
      settingsFontsView.$container.find("ul"). slideToggle();
    })
    this.$container.find("ul").on("click", "img", function(e){
      var newFontLink = ($(e.target).attr("data-link"));
      var newFontName = ($(e.target).attr("data-name"));
      var newFontElHref = $(".newFont").attr("href");
      if (!newFontElHref) {
        $("head").append('<link class="newFont" rel="stylesheet" href="' + newFontLink + '">');
      } else {
        $(".newFont").attr("href", newFontLink);
      }
      $("body").css('font-family', newFontName);
    })
  }
}


controller.init();