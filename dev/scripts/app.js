var model = {
  containerTemplateList: []
};

var controller = {
  init: function() {
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
        tmplsInMenuView.init();
      },
      error: function() {
        console.log("error");
      }
    });
  },
  getTemplate: function(id) {
    $.ajax({
      type: "GET",
      url: "scripts/tmpl.html",
      async: true,
      success: function(data) {
        var $templates = $(data);
        if (id) {
          model.containerTemplateList.push(id);
        }
        tmplsOnPageView.render($templates);
        tmplsInMenuView.render();
      },
      error: function() {
        console.log("error");
      }
    });
  },
  sortadTmplList: function() {
    $(".tmplsInMenu").sortable({
      stop: function() {
        var newContainerTemplateList = [];
        $.each($(e.target).parent().find('li'), function(index, el) {
          var tmplId = $(el).find(".tmpl_id").html();
          newContainerTemplateList.push(tmplId);
        });
        model.containerTemplateList = newContainerTemplateList;
        controller.getTemplate();
      }
    });
    $(".tmplsInMenu").disableSelection();
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
    var list = '';
    model.containerTemplateList.forEach(function(el) {
      var template = tmpls.find(el).html();
      list += template;
    });
    this.$container.html(list);
  }
};

var tmplsInMenuView = {
  init: function() {
    this.$container = $(".tmplsInMenu");
    this.handleClicks();
  },
  render: function() {
    var list = '';
    model.containerTemplateList.forEach(function(tmplId) {
      list += '<li class="ui-state-default"><span class="tmpl_id">' + tmplId + '</span> <span class="tmpl_delete">x</span></li>';
    });
    this.$container.html(list);
  },
  handleClicks: function() {
    this.$container.on("click", ".tmpl_delete", function(e) {
      var currentSpan = $(e.target);
      var currentLi = currentSpan.parent();
      var currentIndex = currentLi.index();
      model.containerTemplateList.splice(currentIndex, 1);
      tmplsInMenuView.render();
      controller.getTemplate();
    });
  }
};

controller.init();