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
    var prevAnnotation = null
    // sort(function (a, b) {
    //   return a.get('start_index') - b.get('start_index');
    // });
    var newText = this.get('body');
    var textSlices = [];



    annotations.each(function (annotation) {
      console.log(annotation.get("start_index"))
      console.log(annotation.get("end_index"))
      debugger;
      prevAnnotation = annotation;
    }.bind(this));
  },



  getTextSlice: function (annotation, prevAnnotation) {
    var id = annotation.escape('id');
    var frontWrapper = '<a href="/' + id + '" id="' + id +'">'
    var text = this.get('body');

    if (prevAnnotation) {
      var newText = text.slice(prevAnnotation.escape('end_index'),
      annotation.escape("end_index"));
      var diff = annotation.get('start_index') - prevAnnotation.get('end_index');

    } else {
      var newText = text.slice(0, annotation.escape('end_index'));
      var diff = annotation.get('start_index');
    }
    var padding = newText.slice(0, diff);
    var anText = newText.slice(diff);
    var result =  padding + frontWrapper + anText + "</a>"

    return result;
  }






});
