/*globals Firebase, $*/
/*jshint browser:true, maxstatements:20*/
;(function () {
  "use strict";
  var rootDb = new Firebase('https://annotator.firebaseio.com/').child(
      encodeURIComponent(window.location.href.replace(/[.:#]/g, '')));
  var annotatables = [];
  var annotatableClasses = 'div, p, img';

  function Annotatable(el, db) {
    var self = this;
    var $el = this.$el = $(el);
    this.db = db;
    $el.addClass('ann-annotatable');
    var $commentCount = this.$commentCount = $('<div />')
      .addClass('ann-comment-count')
      .prependTo($el);
    var commentList = this.commentList = new CommentList(this);
    $el.append(commentList.$el);
    $commentCount.on('click', function () {
      self.commentList.toggle();
      return false;
    });
    db.on('child_added', function (childSnapshot) {
      commentList.showComment(childSnapshot.val());
      $el.addClass('ann-has-comments');
      self.updateCommentCount();
    });
    self.updateCommentCount();
  }

  Annotatable.prototype.updateCommentCount = function() {
    var commentCount = this.commentList.comments.length;
    if (commentCount) {
      this.$commentCount.text(commentCount +
                              ' comments, click to show/hide and comment');
    } else {
      this.$commentCount.text('no comments yet, click to comment');
    }
  };

  function CommentList(annotatable) {
    this.annotatable = annotatable;
    this.db = annotatable.db;
    var $el = this.$el = $('<div />').addClass('ann-comment-list');
    this.comments = [];
    var input = this.input = new CommentInput(this);
    $el.append(input.$el);
  }

  CommentList.prototype.toggle = function () {
    this.$el.toggle();
  };

  CommentList.prototype.pushComment = function (text) {
    this.db.push(text);
  };

  CommentList.prototype.showComment = function (text) {
    var comment = new Comment(this, text);
    this.comments.push(comment);
    this.input.$el.after(comment.$el);
  };

  function CommentInput(commentList) {
    var self = this;
    this.commentList = commentList;
    var $input = this.$input = $('<textarea />')
      .attr('placeholder', 'Enter your comment, tab or click out to submit...');
    this.$el = $('<div />').addClass('ann-comment-input').append($input);
    $input.on('blur', function () { self.submit(); });
  }

  CommentInput.prototype.submit = function () {
    var text = this.$input.val();
    if (text !== '') {
      this.commentList.pushComment(text);
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
  $(annotatableClasses).each(function (i, el) {
    annotatables.push(new Annotatable(el, rootDb.child(i)));
  });

})();

// TODO: inject requirement scripts (firebase & github)
