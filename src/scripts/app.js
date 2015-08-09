var model = {
  containerTemplateBlockList: [],
  containerTemplateHeaderList: "",
  containerTemplateFooterList: ""
};

var controller = {

  init: function() {
    this.localStorageTemplates();
    this.localStorageList();
    this.localStorage();
    this.sendRequest();
    this.sortadTmplList();
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
  localStorage: function() {
    var newContainerTemplateBlockList = [];
      $.each($(".tmplsBlocksInMenu").parent().find('li'), function(index, el) {
        var tmplId = $(el).find(".tmpl_id").html();
        newContainerTemplateBlockList.push("#" + tmplId);
      });
    model.containerTemplateBlockList = newContainerTemplateBlockList;
  },
  localStorageTemplates: function() {
    this.$container = $("#build_wrap");
    var localTemplate = JSON.parse(localStorage.getItem("template"));
    this.$container.html(localTemplate);
  },
  localStorageList: function() {
    this.$container = $(".tmplsBlocksInMenu");
    var localList = JSON.parse(localStorage.getItem("listItem"));
    this.$container.html(localList);
  },
  sendRequest: function() {
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
          console.log(tmplsType)
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
  sortadTmplList: function() {
    $(".tmplsBlocksInMenu").sortable({
      stop: function() {
        var newContainerTemplateBlockList = [];
        $.each($(".tmplsBlocksInMenu").find('li'), function(index, el) {
          var tmplId = $(el).find(".tmpl_id").html();
          newContainerTemplateBlockList.push("#" + tmplId);
        });
        model.containerTemplateBlockList = newContainerTemplateBlockList;
        controller.getTemplate();
      }
    });
    $(".tmplsBlocksInMenu").disableSelection();
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
      list += template;
    });
    list += model.containerTemplateFooterList;
    this.$container.html(list);

    var localSet = localStorage.setItem('template', JSON.stringify(list));
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
      controller.getTemplate();
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
  },
  handleClicks: function() {
    this.$container.on("click", ".tmpl_delete", function(e) {
      model.containerTemplateFooterList = "";
      tmplsFooterInMenuView.render();
      controller.getTemplate();
    });
  }
};


controller.init();