Cicadas.Views.TextShow = Backbone.CompositeView.extend({


  events: {
    "click .text-show-body .annotation": "showAnnotation",
    "click .description-edit": "editDescription",
    "mouseup .text-show-body": "makeAnnotation",
    // "click .annotation": "showAnnotation",
  },


  template: JST['texts/show'],

  initialize: function () {
    this.collection = new Cicadas.Collections.Texts();
    this.listenTo(this.model, "sync", this.render);
    this.inAnnotation = false;
    this.model.fetch();
    this.textId = this.model.escape('id');
  },

  render: function () {
    console.log('called!')
    var descriptionView = this.renderDescription();

    if (this.model.annotations().length > 0)
      var body = this.model.addAnnotationsToBody();
    else {
      var body = this.model.escape('body');
    }
    body = Cicadas.TextParser.spaceParse(body);
    // var body = Cicadas.TextParser.spaceParse(this.model.escape('body'));
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
    var normalText = window.getSelection().toString();
    if (normalText.length < 1) {
      this.exitAnnotation(event);
      return;
    }
    this.inAnnotation = true;
    var container = event.currentTarget;
    var selected = rangy.getSelection();
    var range = selected.getRangeAt(0);
    var text = selected.text();

    var textRange = range.toCharacterRange(container);
    var highlightApplier = rangy.createClassApplier("high-yellow",
    { elementTagName: "a", elementProperties: href="#"});

    highlightApplier.applyToSelection();
    var anForm = new Cicadas.Views.AnnotationForm({
      model: new Cicadas.Models.Annotation(),
      text: this.model,
      range: textRange});

    this.$el.find('.text-show-right-sidebar').html(anForm.render().$el);

  },

  showAnnotation: function (event) {
    event.preventDefault();
    this.inAnnotation = true;
    var id = event.currentTarget.id;
    var annotation = this.model.annotations().get(id);
    var anView = new Cicadas.Views.AnnotationShow({model: annotation});
    this.$el.find('.text-show-right-sidebar').html(anView.render().$el);

  },

  exitAnnotation: function (event) {
    event.preventDefault();
    if (this.inAnnotation) {
      this.inAnnotation = false
      this.render();
    }
  },


  renderSideBar: function (view) {
    var $sidebar = this.$el.find('.text-show-right-sidebar')
    $sidebar.remove();
    $sidebar.html(view.render().$el);
  },


});
