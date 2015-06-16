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
		"click .next-page": "nextPage",
		"click .prev-page": "prevPage"
	},

	template: JST["static_pages/search_results"],

	render: function () {
		this.$el.html(this.template({pageInfo: this.collection.searchIngo}));
		return this;
	},


	renderResults: function () {

		this.$el.html(this.template({pageInfo: this.collection.searchInfo}));
		this.renderSearchInfo();
		var view;
		this.collection.each(function (result) {
			if (result instanceof Cicadas.Models.User) {
				this.$el.find(".search-results-users")
				.append('<li><a href="#/users/' + result.get('id') + '">' + result.escape('username') + "</a></li>" )
			} else if (result instanceof Cicadas.Models.Author) {
				this.$el.find(".search-results-artists")
				.append('<li><a href="#/authors/' + result.get('id') + '">' + result.escape('name') + "</a></li>" )
			}
			else if (result instanceof Cicadas.Models.Text) {
				view = new Cicadas.Views.TextListItem({ model: result });
				this.$el.find('.search-results-texts').append(view.render().$el);
			}

		}.bind(this));
	},

	nextPage: function () {
		this.collection.searchInfo.page++
		this.collection.fetch({
			data: this.collection.searchInfo
		});
	},

	prevPage: function () {
		this.collection.searchInfo.page--
		this.collection.fetch({
			data: this.collection.searchInfo
		});
	},

	renderSearchInfo: function () {
		this.$el.find(".page").html(this.collection.searchInfo.page);
		this.$el.find(".pages").html(this.collection.searchInfo.totalPages);
	},

});
