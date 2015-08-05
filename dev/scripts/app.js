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
  }
};

var blocksView = {
  init: function() {
    this.$container = $(".block_template");
  },
  render: function(data) {
    var list = '';
    controller.getAllblocks(data).forEach(function(block) {
      list += '<img src="' + block.imgSrc + '" alt><span class="subscription">' + block.subscription + '</span>';
    });
    this.$container.html(list);
  }
};

var footersView = {
  init: function() {
    this.$container = $(".footer_template");
  },
  render: function(data) {
    var list = '';
    controller.getAllFooters(data).forEach(function(footer) {
      list += '<img src="' + footer.imgSrc + '" alt><span class="subscription">' + footer.subscription + '</span>';
    });
    this.$container.html(list);
  }
};

var headersView = {
  init: function() {
    this.$container = $(".header_template");
  },
  render: function(data) {
    var list = '';
    controller.getAllHeaders(data).forEach(function(header) {
      list += '<img src="' + header.imgSrc + '" alt><span class="subscription">' + header.subscription + '</span>';
    });
    this.$container.html(list);
  }
};

controller.init();