Cicadas.Views.TextShow = Backbone.CompositeView.extend({


  events: {

    "click .description-edit": "editDescription",

  },


  template: JST['texts/show'],

  initialize: function () {
    this.collection = new Cicadas.Collections.Texts();
    this.listenTo(this.model, "sync", this.render);
    this.model.fetch();
  },

  render: function () {
    var descriptionView = this.renderDescription();
    this.$el.html(this.template({text: this.model}));
    this.$el.find('.show-description').html(descriptionView.render().$el);
    return this;
  },



  renderDescription: function () {
    var view
    var description = this.model.textDescription();
    if (description.get('id')) {
      view = new Cicadas.Views.DescriptionShow({model: description});
    }
    else {
      view = new Cicadas.Views.DescriptionForm({model: description,
        textId: this.model.escape('id')});
    }
    return view;
  },


  editDescription: function () {
    var view = new Cicadas.Views.DescriptionForm({model: this.model.textDescription(),
    textId: this.model.escape('id')}
    );
    this.$el.find('.show-description').html(view.render().$el);

  }





  // renderDescription: function () {
  //   var view = new Cicadas.Views.DescriptionShow({model: this.model.textDescription()})
  //   this.addSubview('.show-description', view);
  // }
  //
  //
  // renderDescriptionForm: function () {
  //   var view = new Cicadas.Views.DescriptionForm()
  //   this.addSubview(".show-description-form", view)
  // }


});
