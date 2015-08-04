var model = {
  blocks: [
    {
      "id": "column-3",
      "imgSrc": "img/blocks/column-3.jpg",
      "subscription": "blocks-3"
    },
    {
      "id": "column-3",
      "imgSrc": "img/blocks/column-4.jpg",
      "subscription": "blocks-4"
    }
  ],
  headers: [
    {
      "id": "column-3",
      "imgSrc": "img/blocks/column-3.jpg",
      "subscription": "header-1"
    },
    {
      "id": "header-1",
      "imgSrc": "img/blocks/column-4.jpg",
      "subscription": "header-2"
    }
  ],
  footers: [
    {
      "id": "footer-1",
      "imgSrc": "img/blocks/column-3.jpg",
      "subscription": "footer-1"
    },
    {
      "id": "footer-2",
      "imgSrc": "img/blocks/column-4.jpg",
      "subscription": "footer-2"
    }
  ]
};

var controller = {
  init: function () {
    blocksView.init();
    blocksView.render();
    
    footersView.init();
    footersView.render();
    
    headersView.init();
    headersView.render();
  },
  getAllblocks: function () {
    var blocks = [];
    model.blocks.forEach(function (block) {
      blocks.push({
        id: block.id,
        imgSrc: block.imgSrc,
        subscription: block.subscription
      });
    });
    return blocks;
  },
  getAllFooters: function () {
    var footers = [];
    model.footers.forEach(function (footer) {
      footers.push({
        id: footer.id,
        imgSrc: footer.imgSrc,
        subscription: footer.subscription
      });
    });
    return footers;
  },
  getAllHeaders: function () {
    var headers = [];
    model.headers.forEach(function (header) {
      headers.push({
        id: header.id,
        imgSrc: header.imgSrc,
        subscription: header.subscription
      });
    });
    return headers;
  }
};

var blocksView = {
  init: function () {
    this.$container = $(".block_template");
  },
  render: function () {
    var list = '';
    controller.getAllblocks().forEach(function (block) {
      list += '<img src="' + block.imgSrc + '" alt><span class="subscription">' + block.subscription + '</span>';
    });
    this.$container.html(list);
  }
};

var footersView = {
  init: function () {
    this.$container = $(".footer_template");
  },
  render: function () {
    var list = '';
    controller.getAllFooters().forEach(function (footer) {
      list += '<img src="' + footer.imgSrc + '" alt><span class="subscription">' + footer.subscription + '</span>';
    });
    this.$container.html(list);
  }
};

var headersView = {
  init: function () {
    this.$container = $(".header_template");
  },
  render: function () {
    var list = '';
    controller.getAllHeaders().forEach(function (header) {
      list += '<img src="' + header.imgSrc + '" alt><span class="subscription">' + header.subscription + '</span>';
    });
    this.$container.html(list);
  }
};

controller.init();



