(function ($) {
  jQuery.fn.dragAndDrop = function (options) {
    var settings = $.extend({
      draggable: false,
      dragStartClass: "drag-start",
      dragOverClass: "drag-over"
    }, options);

    var dragElements = $(this).children();
    var dragSrcEl = null;
    dragElements.each(function () {
      $(this).attr("draggable", true);
    });

    function handleDragStart(e) {
      $(this).addClass(settings.dragStartClass);
      dragSrcEl = this;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.innerHTML);
    }

    function handleDragOver(e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
      e.dataTransfer.dropEffect = 'move';
      return false;
    }

    function handleDragEnter(e) {
      $(this).addClass(settings.dragOverClass);
    }

    function handleDragLeave(e) {
      $(this).removeClass(settings.dragOverClass);
    }

    function handleDrop(e) {
      if (e.stopPropagation) {
        e.stopPropagation();
      }

      if (dragSrcEl !== this) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
      }
      return false;
    }

    function handleDragEnd(e) {
      [].forEach.call(cols, function (col) {
        $(col).removeClass(settings.dragStartClass);
        $(col).removeClass(settings.dragOverClass);
      });
    }

    var cols = settings.draggable ? $(this).find(settings.draggable) : $(this).children();

    [].forEach.call(cols, function (col) {
      col.addEventListener('dragstart', handleDragStart, false);
      col.addEventListener('dragenter', handleDragEnter, false);
      col.addEventListener('dragover', handleDragOver, false);
      col.addEventListener('dragleave', handleDragLeave, false);
      col.addEventListener('drop', handleDrop, false);
      col.addEventListener('dragend', handleDragEnd, false);
    });

    return this;
  };
})(jQuery);