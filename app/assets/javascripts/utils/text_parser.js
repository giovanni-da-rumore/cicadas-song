Cicadas.TextParser = {

  spaceParse: function (text) {
    if (text) {
      return text.replace(/\n/gm,"<br>");
    }

  },


  imageParse: function (text) {
    var words = text.split(/[\s\n]/);
    var addSpace = true
    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      if (word.slice(word.length - 4) === ".jpg" ||
        word.slice(word.length -4) === ".png") {
        word = '<img src="' + word + '" alt>';
        words[i] = word;
      } else if (word === "") {
          if (addSpace) {
          words[i] = "\n";
          addSpace = false;
        } else {
          addSpace = true;
        }
      }
    }
    return words.join(' ');
  },


  adjustTextArea: function (event) {
    event.preventDefault();
    var $textArea = $(event.currentTarget);
    var minHeight = parseInt($textArea.css("min-height").slice(0, -2)) + 10;
    while ($textArea.outerHeight() < event.currentTarget.scrollHeight +
    parseFloat($textArea.css("borderTopWidth")) + parseFloat($textArea.css("borderBottomWidth"))) {
      $textArea.height($textArea.height()+1);
    };
    if (minHeight) {
      if ($textArea.outerHeight() > minHeight + 2) {
        if (event.which == 8 || event.which == 46) {
          $textArea.height(minHeight)
          $textArea.height(event.currentTarget.scrollHeight);
        }
      }
    }
  },

  adjustTextAreaLarge: function (event) {
    event.preventDefault();
    var $textArea = $(event.currentTarget);
    var minHeight = parseInt($textArea.css("min-height").slice(0, -2)) + 10;
    while ($textArea.outerHeight() < event.currentTarget.scrollHeight +
    parseFloat($textArea.css("borderTopWidth")) + parseFloat($textArea.css("borderBottomWidth"))) {
      $textArea.height($textArea.height()+1);
    };
  },


};
