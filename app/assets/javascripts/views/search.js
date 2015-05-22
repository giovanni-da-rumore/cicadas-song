Cicadas.Views.Search = Backbone.View.extend({

	initialize: function () {
		this.collection = new Cicadas.Collections.SearchResults();
		this.listenTo(this.collection, "sync", this.renderResults);
	},

	events: {
		"click button": "search",
		"click .next-page": "nextPage"
	},

	template: JST["static_pages/search"],

	render: function () {
		var content = this.template();
		this.$el.html(content);

		return this;
	},

	search: function (event) {
		event.preventDefault();
		var $input = this.$el.find("#query");
		this.collection.searchInfo.query = $input.val();
		this.collection.searchInfo.page = 1;
		debugger;

		var that = this;
		this.collection.fetch({
			data: this.collection.searchInfo,
			success: function () {
				console.log(that.collection.length);
				that.renderResults();
			}
		});
	},

	renderResults: function () {
		this.renderSearchInfo();
		var $container = this.$("#search-results");
		$container.empty();

		var view;
		this.collection.each(function (result) {
			if (result instanceof Cicadas.Models.User) {
				view = new Cicadas.Views.UserListItem({ model: result });
			} else if (result instanceof Cicadas.Models.Post) {
				view = new Cicadas.Views.PostListItem({ model: result });
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
