Cicadas.Models.Text = Backbone.Model.extend({

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

});
