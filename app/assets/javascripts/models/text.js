Cicadas.Models.Text = Backbone.Model.extend({


  // Need polyid so search can return different models with the same id
  idAttribute: "polyId",

  initialize: function () {
    if (!this.get('polyId')) {
      this.attributes.polyId = this.get("id");
      this.id = this.get('id');
    }

  },

  urlRoot: '/api/texts',

  parse: function (response) {
    if (response.author) {
      this.author().set(response.author, { parse: true });
      delete response.author;
    }

    if (response.text_description) {
      this.textDescription().set(response.text_description, {parse: true});
      delete response.text_description;
    }

    if (response.annotations) {
      this.annotations().set(response.annotations, {parse: true});
      delete response.annotations;
    }

    return response;
  },

  author: function () {
    if (!this._author) {
      this._author = new Cicadas.Models.Author();
    }
    return this._author;
  },

  textDescription: function () {
    if (!this._description) {
      this._description = new Cicadas.Models.Description();
    }
    return this._description;
  },

  annotations: function () {
    if (!this._annotations) {
      this._annotations = new Cicadas.Collections.Annotations();
    }

    return this._annotations;
  },



  addAnnotationsToBody: function () {
    var annotations = this.annotations()
    var textSlices = this.getTextSlices(annotations);
    return textSlices.join('');
  },

  getTextSlice: function (annotation, prevAnnotation) {
    var id = annotation.escape('id');
    var frontWrapper = '<a href="/#/' + id + '" id="' + id +'" class="annotation">'
    var text = this.get('body');

    if (prevAnnotation) {
      var newText = text.slice(prevAnnotation.escape('end_index'),
      annotation.escape("end_index"));
      var diff = annotation.get('start_index') - prevAnnotation.get('end_index');

    } else {
      var newText = text.slice(0, annotation.escape('end_index'));
      var diff = annotation.get('start_index');
    }

    var frontText = newText.slice(0, diff);
    var anText = newText.slice(diff);
    var result =  _.escape(frontText) + frontWrapper + _.escape(anText) + "</a>"

    return result;
  },


  getTextSlices: function (annotations) {
    var prevAnnotation
    var endIndex = annotations.last().get("end_index");
    var text = this.get('body');
    var textSlices = [];
    annotations.each(function (annotation) {
      textSlices.push(this.getTextSlice(annotation, prevAnnotation));
      prevAnnotation = annotation;
    }.bind(this));

    textSlices.push(_.escape(text.slice(endIndex)));

    return textSlices;
  },



  makeEditSlices: function () {
    var parsedBod = this.get('body');
    for (var i = this.annotations().length - 1; i >= 0; i--) {
      var tate = this.annotations().models[i];
      var insertLeft = "(" + tate.id + ")[";
      var insertRight = "](" + tate.id + ")";
      parsedBod = parsedBod.slice(0, tate.get('end_index')) + insertRight + parsedBod.slice(tate.get('end_index'));
      parsedBod = parsedBod.slice(0, tate.get('start_index')) + insertLeft + parsedBod.slice(tate.get('start_index'));
    }
    return parsedBod;

  },


  adjustAnnotations: function (newText) {
    var index = 0;
    var annotations = this.annotations().models;
    for (var i = 0; i < newText.length; i++) {
      // only hit annotations on every other round
      // if contiguous, they will be separated by an empty string
      if (i % 2 === 1) {
        var j = Math.floor(i / 2);
        debugger;
        annotations[j].attributes.start_index = index;
        // browser adds carriage returns to \n's automatically, need to remove to match db level text
        index += newText[i].replace(/\r\n/gm, "\n").length
        index += this.adjustForSpaces(newText[i]);
        annotations[j].attributes.end_index = index;
        annotations[j].save();
        this.annotations().add(annotations[j], {merge: true});
      } else {
        index += newText[i].replace(/\r\n/gm, "\n").length;
        index += this.adjustForSpaces(newText[i]);
      }
      debugger;
    }
  },


  cleanEdit: function (newText) {
    //even if a text begins or ends with an annotation, it will
    // have an empty string
    return newText.length === (this.annotations().length * 2) + 1
  },



  adjustForSpaces: function (text) {
    var parsed = text.split('\n');
    var count = 0;
    for (var i = 0; i < parsed.length; i++) {
      if (parsed[i].length === 0) {
        count += 1;
      }
    }
    if (count > 0) {
      return count - 1;
    } else {
      return count;
    }
  },

});
