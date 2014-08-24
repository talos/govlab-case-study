/*globals Firebase, $*/
/*jshint browser:true*/
;(function () {
  "use strict";
  var db = new Firebase('https://annotator.firebaseio.com/');
  var annotations = [];
  var annotatable = 'p, div, img';

  function Annotatable(el) {
    this.$el = $(el);
    this.$el.addClass('ann-annotatable');
    this.$el.on('click', this.toggle
  }

  Annotatable.prototype.update = function (data) {
    //TODO
    window.console.log(data);
  };

  function CommentInput() {
    this.$el = $('<div />').addClass('comment-input').append($('<input />'));
  }

  function Comment(text) {
    this.$el = $('<div />').addClass('comment').text(text);
  }

  Comment.prototype.remove = function () {
    this.$el.remove();
  };

  // Initialize Annotations
  $(annotatable).each(function (i, el) {
    annotations.push(new Annotatable(el));
  });

})();

// TODO: inject requirement scripts (firebase & github)
