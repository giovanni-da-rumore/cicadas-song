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




};
