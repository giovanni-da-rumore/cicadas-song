Cicadas.Views.SearchResults = Backbone.View.extend({

	initialize: function (options) {
		this.collection = new Cicadas.Collections.SearchResults();
		this.listenToOnce(this.collection, "sync", this.renderResults);
		this.query = options.query;
		this.collection.searchInfo.query = this.query;
		this.collection.searchInfo.page = 1;

		this.collection.fetch({
			data: this.collection.searchInfo,
			success: function () {
				this.renderResults();
			}.bind(this)
		})
	},

	events: {
		"click .next-page": "nextPage"
	},

	template: JST["static_pages/search_results"],

	render: function () {
		this.$el.html(this.template());
		return this;
	},


	renderResults: function () {
		this.renderSearchInfo();
		var $container = this.$("#search-results");
		$container.empty();

		var view;
		this.collection.each(function (result) {
			if (result instanceof Cicadas.Models.User) {
				// view = new Cicadas.Views.UserListItem({ model: result });
			} else if (result instanceof Cicadas.Models.Author) {
				// view = new Cicadas.Views.AuthorListItem({ model: result });
			} else if (result instanceof Cicadas.Models.Text) {
				view = new Cicadas.Views.TextListItem({ model: result });
			}

			$container.append(view.render().$el);
		});
	},

	nextPage: function () {
		this.collection.searchInfo.page++
		this.collection.fetch({
			data: this.collection.searchInfo
		});
	},

	renderSearchInfo: function () {
		this.$("#pages").html(this.collection.searchInfo.totalPages);
	}

});
