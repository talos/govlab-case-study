/*globals Firebase, $*/
/*jshint browser:true*/
;(function () {
  "use strict";
  //var db = new Firebase('https://annotator.firebaseio.com/');
  var annotations = [];
  var annotatable = 'p, div, img';

  function Annotatable(el) {
    var self = this;
    var $el = this.$el = $(el);
    $el.addClass('ann-annotatable');
    var commentList = this.commentList = new CommentList(this);
    $el.append(commentList.$el);
    $el.on('click', function () { self.commentList.toggle(); return false; });
  }

  function CommentList(annotatable) {
    this.annotatable = annotatable;
    var $el = this.$el = $('<div />').addClass('ann-comment-list');
    this.comments = [];
    var input = this.input = new CommentInput(this);
    $el.append(input.$el);
  }

  CommentList.prototype.toggle = function () {
    this.$el.toggle();
  };

  CommentList.prototype.addComment = function (text) {
    var comment = new Comment(this, text);
    this.comments.push(comment);
    this.$el.append(comment.$el);
  };

  function CommentInput(commentList) {
    var self = this;
    this.commentList = commentList;
    var $input = this.$input = $('<textarea />');
    this.$el = $('<div />').addClass('ann-comment-input')
                           .append($input);

    // Prevent annotatable from closing
    $input.on('click', function () { return false; });
    $input.on('blur', function () { self.submit(); });
    $input.focus();
  }

  CommentInput.prototype.submit = function () {
    var text = this.$input.val();
    if (text !== '') {
      this.commentList.addComment(text);
      this.$input.val('');
    }
  };

  function Comment(commentList, text) {
    this.commentList = commentList;
    this.$el = $('<div />').addClass('ann-comment')
                           .text(text);
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
