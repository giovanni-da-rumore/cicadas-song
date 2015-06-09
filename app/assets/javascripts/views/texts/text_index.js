Cicadas.Views.TextsIndex = Backbone.View.extend({

  template: JST['texts/index'],

  mainPostlet: JST['postlets/main'],

  subPostlet: JST['postlets/secondary'],


  initialize: function () {
    this.collection = new Cicadas.Collections.Texts();
    this.collection.fetch();
    this.promoted = new Cicadas.Collections.Postlets();
    this.promoted.fetch();
    this.listenToOnce(this.promoted, "sync", this.render);
    this.listenToOnce(this.collection, "sync", this.render);
  },


  listenToAdd: function () {
    this.stopListening(this.promoted, "sync");
    this.listenTo(this.promoted, "add", this.listenToSync);
    this.render();
  },

  listenToSync: function () {
    this.stopListening(this.promoted, "add");
    this.listenTo(this.promoted, "sync", this.listenToadd);
    this.render();
  },



  render: function () {
    var textCount = 0
    this.$el.html(this.template());
    this.collection.each(function (text) {
      if (textCount > 7) {
        return
      }
      text = new Cicadas.Views.TextListItem({model: text});
      this.$el.find('.recent-texts-list').append(text.render().$el);
      textCount += 1
    }.bind(this));

    this.insertPostlets();

    return this;
  },


  insertPostlets: function () {
    var pCount = 1
    var page
    this.promoted.each(function (postlet) {
      if (pCount > 8) {
        return;
      } else if (pCount < 4 ) {
        page = this.mainPostlet({postlet: postlet});
      } else {
        page = this.subPostlet({postlet: postlet});
      }
      this.$el.find('#' + pCount).html(page);
      pCount += 1;
    }.bind(this))
    return this;
  }



});
