# Annotator

Paragraph-level live annnotations.

### How to use

At the top of the page you want to have live annotations, add the following
CSS link:

```
<link href="annotator.css" rel="stylesheet" type="text/css">
```

At the bottom of the page you want to use annotations on, add the following
`<script />` tags:

```
<script src="https://cdn.firebase.com/js/client/1.0.21/firebase.js"></script>
<script src="annotator.js"></script>
```

### What does it do?

As a user rolls over paragraphs, a link becomes visible to show the commenting
system.  They can then enter a comment.

Immediately after entering a comment, all other users of the document should
see the comment appear.

As comments are entered, a little notification above any paragraph with
comments becomes visible.

### TODO

* Linebreaks and styling for comments (it uses textarea!)  But XSS is bad...
* Timestamps (right now, comments are stored as plaintext in a list, without
  metadata)
* Inject jQuery and Firebase into the webpage, instead of expecting it's
  already there (jQuery) or separately adding it (Firebase)
* Export of all comments for admin/utility purposes
