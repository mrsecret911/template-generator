var controller = {
  init: function() {
    this.sendRequest();
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
      },
      error: function() {
        console.log("error")
      }
    });
  },
  getTemplate: function(id) {
    $.ajax({
      type: "GET",
      url: "scripts/tmpl.html",
      async: true,
      success: function(data) {
        var $templates = $(data)
        controller.setTemplate($templates, id)
      },
      error: function() {
        console.log("error")
      }
    });
  },
  setTemplate: function(data, id) {
    var template = data.find(id).html();
    $("#build_wrap").append(template);
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
      controller.getTemplate(templateId)
    })
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
      controller.getTemplate(templateId)
    })
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
      controller.getTemplate(templateId)
    })
  }
};

controller.init();