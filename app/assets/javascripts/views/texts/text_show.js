Cicadas.Views.TextShow = Backbone.CompositeView.extend({


  events: {
    "mousedown .text-show-container": "render",
    "click .description-edit": "editDescription",
    "mouseup .text-show-body": "makeAnnotation",
    "click .text-show-body": "beginCLick",
  },


  template: JST['texts/show'],

  initialize: function () {
    this.collection = new Cicadas.Collections.Texts();
    this.listenTo(this.model, "sync", this.render);
    var that = this;
    this.model.fetch();
    this.textId = this.model.escape('id');
  },

  render: function () {
    var descriptionView = this.renderDescription();
    var body = Cicadas.TextParser.spaceParse(this.model.escape('body'));
    this.$el.html(this.template({text: this.model, body: body }));
    this.$el.find('.text-show-right-sidebar').html(descriptionView.render().$el);
    return this;
  },


  renderDescription: function () {
    var view
    var description = this.model.textDescription();
    if (description.get('id')) {
      view = new Cicadas.Views.DescriptionShow({model: description, content: ''});
    } else {
      view = new Cicadas.Views.DescriptionForm({model: description,
        textId: this.model.escape('id')});
    }
    return view;
  },

  editDescription: function () {
    var view = new Cicadas.Views.DescriptionForm({model: this.model.textDescription(),
    textId: this.textId}
    );
    this.$el.find('.text-show-right-sidebar').html(view.render().$el);
  },


  makeAnnotation: function (event) {
    var ctarg = event.currentTarget;
    var text = window.getSelection();
    // var text = rangy.getSelection(window);
    // var sel = rangy.getSelection();
    // var oldsel = window.getSelection().getRangeAt(0);
    // var range = sel.getRangeAt(0);
    // var rageOffsets = range.toCharacterRange(event.currentTarget);


    // var range = text.getRangeAt(0);
    if (text.toString().length > 0) {
      console.log(text.toString);
      //console.log(rangy.toCharacterRange(text, event.target))
      // debugger;
      var anForm = new Cicadas.Views.AnnotationForm({
        model: new Cicadas.Models.Annotation(),
        textId: this.textId});
      this.$el.find('.text-show-right-sidebar').html(anForm.render().$el);
    }
  },

  // beginClick: function (event) {
  //   this.$el.find("text-show-body").mousemove(function () {
  //     alert("highlighting");
  //   });
  //  }


});
