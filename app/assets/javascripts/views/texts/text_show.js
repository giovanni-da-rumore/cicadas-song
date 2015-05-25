Cicadas.Views.TextShow = Backbone.CompositeView.extend({


//Reminder!! fix up text edit form: font 17px, get rid of border and whatnot, just add didfferent background to section

  events: {
    "click .text-show-body .annotation": "showAnnotation",
    "click .description-edit": "editDescription",
    "click .edit-text": "renderEdit",
    "click .text-edit-save": "saveEdit",
    "click .cancel": "refresh",
    "mouseup .text-show-body": "clickHandler",
    "keyup .edit-textarea": "adjustTextArea",
    // "click .annotation": "showAnnotation",
  },


  template: JST['texts/show'],

  initialize: function () {
    this.collection = new Cicadas.Collections.Texts();
    this.listenTo(this.model, "sync", this.render);
    this.inAnnotation = false;
    this.editingText = false;
    this.model.fetch();
    this.textId = this.model.escape('id');
  },

  render: function () {
    var descriptionView = this.renderDescription();
    if (this.model.annotations().length > 0)
      var body = this.model.addAnnotationsToBody();
    else {
      var body = this.model.escape('body');
    }
    body = Cicadas.TextParser.spaceParse(body);
    this.$el.html(this.template({text: this.model, body: body }));
    this.$el.find('.text-show-right-sidebar').html(descriptionView.render().$el);
    return this;
  },

  refresh: function (event) {
    if (event) { event.preventDefault(); }
    this.inAnnotation = false;
    this.editingText = false;
    this.render();

  },


  renderEdit: function (event) {
    event.preventDefault();
    this.editingText = true;
    var $body = this.$el.find('.text-show-body');
    this.$el.find('.text-show-nav').html(JST["texts/nav"]);
    $body.html('<textarea class="edit-textarea" name="text[body]">' + this.model.get('body')+ "</textarea>");
    this.$el.find('.edit-textarea').trigger("keyup");
  },

  saveEdit: function (event) {
    event.preventDefault();
    var prevModel = this.model;
    var that = this;
    var attrs = this.$el.find(".edit-textarea").serializeJSON();
    this.model.save(attrs, {
      success: function () {
        that.editingText = false;
        that.render();
      }
    });
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
    this.$el.find('.text-show-right-sidebar').html(view.$el);
    view.render();
  },




  makeAnnotation: function (event) {
    this.inAnnotation = true;
    var container = event.currentTarget;
    var selected = rangy.getSelection();
    var range = selected.getRangeAt(0);
    var textRange = range.toCharacterRange(container, {includeSpaceBeforeBr: true});
    var highlightApplier = rangy.createClassApplier("high-yellow",
    { elementTagName: "a", elementProperties: href="#"});

    highlightApplier.applyToSelection();
    var anForm = new Cicadas.Views.AnnotationForm({
      view: this,
      model: new Cicadas.Models.Annotation(),
      text: this.model,
      range: textRange});
    this.$el.find('.text-show-right-sidebar').html(anForm.render().$el);

  },


  clickHandler: function (event) {
    var text = window.getSelection().toString();
    if (text.length > 1 && text.match(/\S/)) {
      if (!this.editingText && !this.inAnnotation) {
        this.makeAnnotation(event);
      }
    } else {

      if ($(event.target).is('.annotation')) {
        this.showAnnotation(event);
      } else {
        this.exitAnnotation(event);
      }
    }
  },

  showAnnotation: function (event) {
    event.preventDefault();
    this.$el.find(".text-show-body .active").removeClass('active');
    $(event.currentTarget).addClass("active");
    this.inAnnotation = true;
    var id = event.currentTarget.id;

    if (id.length > 0) {
      var annotation = this.model.annotations().get(id);
      var anView = new Cicadas.Views.AnnotationShow({model: annotation});
      this.$el.find('.text-show-right-sidebar').html(anView.render().$el);
    }

  },

  exitAnnotation: function (event) {
    event.preventDefault();
    if (this.inAnnotation) {
      this.$el.find(".text-show-body .active").removeClass('active');
      this.inAnnotation = false
      this.render();
    }
  },

  renderSideBar: function (view) {
    var $sidebar = this.$el.find('.text-show-right-sidebar')
    $sidebar.remove();
    $sidebar.html(view.render().$el);
  },

  adjustTextArea: function (event) {
		event.preventDefault();
		Cicadas.TextParser.adjustTextAreaLarge(event);
	},


});
