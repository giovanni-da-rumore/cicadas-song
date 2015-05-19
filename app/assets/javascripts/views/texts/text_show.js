Cicadas.Views.TextShow = Backbone.CompositeView.extend({


  events: {
    "mousedown .text-show-main": "render",
    "click .description-edit": "editDescription",
    "mouseup .text-show-body": "makeAnnotation",
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
    // var normalText = window.getSelection();
    // && text.match(/[a-zA-Z\d]/)
    var container = event.currentTarget;
    var selected = rangy.getSelection();
    var range = selected.getRangeAt(0);
    var text = selected.text();

    if (text.length > 0) {
      var textRange = range.toCharacterRange(container);
      var classApplier = rangy.modules.ClassApplier;
      var highlightApplier = rangy.createClassApplier("high-yellow",
      { elementTagName: "a", elementProperties: href="#"});

      highlightApplier.applyToSelection();
      var anForm = new Cicadas.Views.AnnotationForm({
        model: new Cicadas.Models.Annotation(),
        text: this.model,
        range: textRange});

      this.$el.find('.text-show-right-sidebar').html(anForm.render().$el);
    }
  },



});
